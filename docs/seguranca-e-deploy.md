# Segurança e deploy

O site é estático (`dist/`) e está hospedado na **Vercel** (verificado pelos cabeçalhos
`server: Vercel` e pelo DNS `76.76.21.21` / `*.vercel-dns-017.com`). Este documento lista o que
já está no código e o que precisa ser configurado na hospedagem — **nada aqui foi aplicado em
produção**.

## Situação encontrada em produção (5 nov. 2026)

1. **Deploy desatualizado.** `https://www.axonstack.dev/` ainda serve a versão anterior à
   pré-renderização (o `#root` chega vazio e não há `<link rel="canonical">`). Verifique no
   painel da Vercel se os deploys do branch `main` estão falhando ou se o projeto não está
   conectado ao repositório. Configuração esperada:
   - Framework: Vite · Install: `npm ci` · Build: `npm run build` · Output: `dist`
   - Node.js: 22.x ou 24.x (o Vite 7 exige ≥ 20.19)
2. **Domínio principal invertido.** `https://axonstack.dev` responde `308 → https://www.axonstack.dev/`,
   mas o canonical, `og:url`, `sitemap.xml`, `robots.txt` e o JSON-LD usam `https://axonstack.dev/`
   (o domínio definido como principal). Para alinhar sem mudar URLs públicas, em
   **Vercel → Project → Settings → Domains**: defina `axonstack.dev` como domínio principal e
   faça `www.axonstack.dev` redirecionar (308) para ele. Se a decisão for manter o `www`, troque
   o domínio em `index.html`, `public/sitemap.xml`, `public/robots.txt` e `assets-source/og-image.html`.

## O que já está no código

| Proteção                | Onde                                       | Observação                                                                                          |
| ----------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Content-Security-Policy | `<meta>` gerada por `scripts/prerender.js` | Só recursos do próprio domínio; `<style>` embutidos liberados por hash SHA-256, sem `unsafe-inline` |
| Referrer-Policy         | `<meta name="referrer">`                   | `strict-origin-when-cross-origin`                                                                   |
| Links externos          | componentes                                | `target="_blank"` sempre com `rel="noopener noreferrer"` (coberto por teste)                        |
| Dependências            | `npm audit`                                | 0 vulnerabilidades no momento da revisão                                                            |

A CSP via `<meta>` não suporta `frame-ancestors`, `report-uri` nem `sandbox` — por isso a
proteção contra _clickjacking_ precisa vir de cabeçalho HTTP (abaixo).

> Se for adicionado algum serviço externo (analytics, chat, mapas, fontes de CDN), inclua o
> domínio dele na CSP em `scripts/prerender.js`, senão o navegador vai bloqueá-lo.
> A barra de ferramentas da Vercel em _preview deployments_ (`vercel.live`) também é bloqueada
> pela CSP; isso não afeta produção.

## Cabeçalhos recomendados na Vercel

Crie um `vercel.json` na raiz do projeto (ou aplique pelo painel) — **revise antes de publicar**:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Content-Security-Policy", "value": "frame-ancestors 'none'" },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

- **CSP em cabeçalho + meta**: o navegador aplica as duas (interseção). O cabeçalho acima só
  acrescenta `frame-ancestors`, então não conflita com a política do `<meta>`.
- **Strict-Transport-Security**: a Vercel já envia `max-age=63072000`. Só acrescente
  `includeSubDomains` se **todos** os subdomínios de `axonstack.dev` tiverem HTTPS, e `preload`
  apenas se quiser inscrever o domínio na lista de pré-carga dos navegadores (difícil de reverter).
- **Cache**: os arquivos em `/assets/` têm hash no nome, então podem ser imutáveis. O
  `index.html` deve continuar sem cache longo (padrão da Vercel).

Depois de publicar, confira com:

```bash
curl -sI https://axonstack.dev/ | grep -iE "content-security|x-frame|x-content|referrer|permissions|strict-transport"
```
