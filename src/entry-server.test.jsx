// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { render } from './entry-server.jsx'

// Garante que a pré-renderização funciona sem APIs do navegador (window/document).
describe('pré-renderização', () => {
  it('gera o HTML completo da página no Node', () => {
    const html = render()
    expect(html).toContain('<h1')
    expect(html).toContain('Da infraestrutura')
    expect(html).toContain('Tecnologia completa')
    expect(html).toContain('id="contato"')
    expect(html).toContain('https://wa.me/5521994291884')
    // FAQ, diagrama do hero e formulário também precisam estar no HTML estático (SEO)
    expect(html).toContain('Como solicitar um orçamento?')
    expect(html).toContain('Uma arquitetura integrada')
    expect(html).toContain('Solicite um orçamento')
  })

  it('não usa atributos style inline (bloqueados pela CSP sem unsafe-inline)', () => {
    expect(render()).not.toMatch(/\sstyle="/)
  })

  it('deixa o envio do formulário desabilitado até a hidratação', () => {
    const html = render()
    const buttons = html.match(/<button[^>]*type="submit"[^>]*>/g)
    expect(buttons).toHaveLength(2)
    buttons.forEach((b) => expect(b).toContain('disabled'))
  })
})
