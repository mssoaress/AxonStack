// Pós-processamento do build (executado por `npm run build`):
//  1. injeta o HTML pré-renderizado do React em dist/index.html;
//  2. embute o CSS (≈4 kB gzip) no HTML, eliminando a requisição bloqueante de renderização;
//  3. adiciona preload da fonte do título (Megrim), usada no maior elemento da primeira dobra;
//  4. gera a Content-Security-Policy (meta) com hashes dos <style> embutidos — sem 'unsafe-inline'.
import { createHash } from 'node:crypto'
import { readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const assetsDir = path.join(distDir, 'assets')
const ssrDir = path.join(root, 'dist-ssr')
const indexPath = path.join(distDir, 'index.html')
const PLACEHOLDER = '<!--app-html-->'

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

let html = await readFile(indexPath, 'utf8')
if (!html.includes(PLACEHOLDER)) {
  throw new Error(`Marcador ${PLACEHOLDER} não encontrado em dist/index.html`)
}

// 1. HTML do app
html = html.replace(PLACEHOLDER, render())

// 2. CSS embutido
const cssLink = html.match(/<link rel="stylesheet"[^>]*href="\/assets\/([^"]+\.css)"[^>]*>/)
if (cssLink) {
  const css = await readFile(path.join(assetsDir, cssLink[1]), 'utf8')
  html = html.replace(cssLink[0], () => `<style>${css}</style>`)
}

// 3. Preload da fonte do título
const assets = await readdir(assetsDir)
const megrim = assets.find((f) => /^megrim-latin-400-normal-.*\.woff2$/.test(f))
if (megrim) {
  html = html.replace(
    '</title>',
    `</title>\n    <link rel="preload" href="/assets/${megrim}" as="font" type="font/woff2" crossorigin />`,
  )
}

// 4. CSP. Só recursos do próprio domínio; o JSON-LD é um bloco de dados (não executa).
// frame-ancestors/HSTS e demais cabeçalhos dependem da hospedagem (ver docs/seguranca-e-deploy.md).
const styleHashes = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(
  ([, content]) => `'sha256-${createHash('sha256').update(content).digest('base64')}'`,
)
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  `style-src 'self' ${styleHashes.join(' ')}`,
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ')
html = html.replace(
  '<meta charset="UTF-8" />',
  `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`,
)

await writeFile(indexPath, html)
await rm(ssrDir, { recursive: true, force: true })

console.log(
  `✓ dist/index.html pré-renderizado (${(html.length / 1024).toFixed(1)} kB` +
    `${cssLink ? ', CSS embutido' : ''}${megrim ? ', fonte com preload' : ''}` +
    `, CSP com ${styleHashes.length} hash(es))`,
)
