// Gera uma versão com transparência do logo (que tem fundo preto sólido).
// Técnica "unscreen": alfa = maior canal do pixel; cor = canal / alfa. Para um desenho
// claro sobre preto, o resultado sobre fundo preto é idêntico ao original, e sobre
// qualquer outro fundo o preto some sem halo.
//
// Uso: node scripts/logo-alpha.js <entrada.png> <saida.png>
// Suporta PNG 8 bits RGB/RGBA não entrelaçado (caso do logo original).
import { readFileSync, writeFileSync } from 'node:fs'
import { crc32, deflateSync, inflateSync } from 'node:zlib'

const [input, output] = process.argv.slice(2)
if (!input || !output) {
  console.error('Uso: node scripts/logo-alpha.js <entrada.png> <saida.png>')
  process.exit(1)
}

const buf = readFileSync(input)
let pos = 8
let width, height, colorType
const idat = []
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos)
  const type = buf.toString('ascii', pos + 4, pos + 8)
  const data = buf.subarray(pos + 8, pos + 8 + len)
  if (type === 'IHDR') {
    width = data.readUInt32BE(0)
    height = data.readUInt32BE(4)
    const bitDepth = data[8]
    colorType = data[9]
    const interlace = data[12]
    if (bitDepth !== 8 || ![2, 6].includes(colorType) || interlace !== 0) {
      throw new Error('PNG não suportado (use 8 bits RGB/RGBA não entrelaçado)')
    }
  } else if (type === 'IDAT') {
    idat.push(data)
  }
  pos += 12 + len
}

const bpp = colorType === 6 ? 4 : 3
const stride = width * bpp
const raw = inflateSync(Buffer.concat(idat))
const pixels = Buffer.alloc(stride * height)

// Desfaz os filtros de linha do PNG
const paeth = (a, b, c) => {
  const p = a + b - c
  const pa = Math.abs(p - a)
  const pb = Math.abs(p - b)
  const pc = Math.abs(p - c)
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c
}
for (let y = 0; y < height; y++) {
  const filter = raw[y * (stride + 1)]
  const src = y * (stride + 1) + 1
  const dst = y * stride
  for (let x = 0; x < stride; x++) {
    const left = x >= bpp ? pixels[dst + x - bpp] : 0
    const up = y > 0 ? pixels[dst - stride + x] : 0
    const upLeft = y > 0 && x >= bpp ? pixels[dst - stride + x - bpp] : 0
    const v = raw[src + x]
    pixels[dst + x] =
      (filter === 0
        ? v
        : filter === 1
          ? v + left
          : filter === 2
            ? v + up
            : filter === 3
              ? v + ((left + up) >> 1)
              : v + paeth(left, up, upLeft)) & 0xff
  }
}

// Unscreen → RGBA
const outStride = width * 4
const out = Buffer.alloc((outStride + 1) * height)
for (let y = 0; y < height; y++) {
  out[y * (outStride + 1)] = 0
  for (let x = 0; x < width; x++) {
    const i = y * stride + x * bpp
    const r = pixels[i]
    const g = pixels[i + 1]
    const b = pixels[i + 2]
    const a = Math.max(r, g, b)
    const o = y * (outStride + 1) + 1 + x * 4
    out[o] = a ? Math.round((r * 255) / a) : 0
    out[o + 1] = a ? Math.round((g * 255) / a) : 0
    out[o + 2] = a ? Math.round((b * 255) / a) : 0
    out[o + 3] = a
  }
}

const chunk = (type, data) => {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(width, 0)
ihdr.writeUInt32BE(height, 4)
ihdr[8] = 8
ihdr[9] = 6
writeFileSync(
  output,
  Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(out, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]),
)
console.log(`✓ ${output} (${width}×${height}, RGBA)`)
