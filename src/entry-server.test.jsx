// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { render } from './entry-server.jsx'

// Garante que a pré-renderização funciona sem APIs do navegador (window/document).
describe('pré-renderização', () => {
  it('gera o HTML completo da página no Node', () => {
    const html = render()
    expect(html).toContain('<h1')
    expect(html).toContain('Nossos Serviços')
    expect(html).toContain('id="cta-final"')
    expect(html).toContain('https://wa.me/5521994291884')
  })
})
