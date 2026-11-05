# Axon Stack — site institucional

Landing page da **Axon Stack** (Infraestrutura, Cloud e Software), publicada em
[axonstack.dev](https://axonstack.dev). Página única, com animações em canvas, HTML
pré-renderizado no build e hidratação com React.

## Tecnologias

| Camada      | Ferramenta                                         |
| ----------- | -------------------------------------------------- |
| UI          | React 18                                           |
| Build / dev | Vite 7 + `@vitejs/plugin-react`                    |
| Fontes      | Megrim e Inter auto-hospedadas via `@fontsource`   |
| Testes      | Vitest 4 + Testing Library + jsdom                 |
| Qualidade   | ESLint 9 (flat config, React + Hooks) e Prettier 3 |

Não há backend, roteamento nem variáveis de ambiente.

## Requisitos

- Node.js **20.19+** ou **22.12+** (exigência do Vite 7; testado com Node 24)
- npm 10+

## Instalação e uso

```bash
npm ci          # instala exatamente o que está no package-lock.json
npm run dev     # servidor de desenvolvimento (http://localhost:5173)
```

### Comandos

| Comando                | O que faz                                                  |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento com HMR                        |
| `npm run build`        | Build de produção em `dist/`, com HTML pré-renderizado     |
| `npm run preview`      | Serve `dist/` localmente (http://localhost:4173)           |
| `npm run lint`         | ESLint                                                     |
| `npm run format`       | Formata o projeto com Prettier                             |
| `npm run format:check` | Verifica a formatação sem alterar arquivos                 |
| `npm test`             | Executa os testes uma vez                                  |
| `npm run test:watch`   | Testes em modo observação                                  |
| `npm run check`        | Lint + formatação + testes + build (use antes de publicar) |
| `npm run og-image`     | Regenera `public/img/og-image.jpg` (macOS + Google Chrome) |

## Build e pré-renderização

`npm run build` executa três etapas:

1. `vite build` — bundle do cliente em `dist/`;
2. `vite build --ssr src/entry-server.jsx` — versão de servidor do app em `dist-ssr/`;
3. `node scripts/prerender.js` — renderiza o app com `renderToString` e injeta o HTML no
   marcador `<!--app-html-->` de `dist/index.html`; depois remove `dist-ssr/`.

Assim o HTML entregue já contém todo o conteúdo (bom para SEO e pré-visualizações), e o
`src/main.jsx` usa `hydrateRoot` para ativar a interatividade. No `npm run dev` o `#root`
chega vazio e o app é renderizado normalmente com `createRoot`.

> Componentes não podem acessar `window`/`document` durante a renderização — somente
> dentro de `useEffect`. O teste `src/entry-server.test.jsx` garante isso.

## Deploy

O resultado é um site estático: publique o conteúdo de `dist/` em qualquer hospedagem
estática (servindo `index.html` na raiz). `robots.txt`, `sitemap.xml` e as imagens de
`public/` são copiados para `dist/` automaticamente. A configuração da hospedagem/DNS
atual não faz parte deste repositório.

## Estrutura

```
index.html                 metadados, Open Graph, JSON-LD e marcador da pré-renderização
public/
  robots.txt, sitemap.xml
  img/
    logo-icone.png         logo exibido na navbar/rodapé (164 px, 2× para Retina)
    favicon-32.png         favicon
    apple-touch-icon.png   ícone iOS (180 px)
    logo-512.png           logo usado no JSON-LD
    og-image.jpg           imagem de compartilhamento (1200×630)
assets-source/
  logo-icone-2000.png      logo original em alta resolução (não vai para o site)
  og-image.html            fonte da imagem Open Graph
scripts/prerender.js       injeta o HTML pré-renderizado em dist/index.html
src/
  main.jsx                 entrada do cliente (hydrate/render)
  entry-server.jsx         entrada usada na pré-renderização
  App.jsx                  composição da página (skip link, <main>, seções)
  constants.js             contatos, links e dados institucionais (fonte única)
  fonts.js                 importação das fontes auto-hospedadas
  index.css                estilos globais, breakpoints e prefers-reduced-motion
  hooks/
    useCanvasAnimation.js  ciclo de vida dos canvas (DPR, pausa, reduced motion, cleanup)
    useScrollReveal.js     revelação de .reveal/.diff-item ao rolar
  components/
    Navbar.jsx             navbar + menu mobile acessível
    Hero.jsx               hero com parallax
    HeroCanvas.jsx         ondas animadas do hero
    NetCanvas.jsx          rede de partículas de fundo
    ClientsStrip.jsx       faixa com as áreas de atuação
    Services.jsx           "Nossos Serviços"
    Process.jsx            "Nosso Processo"
    Diferenciais.jsx       "Diferenciais"
    DiffCanvas.jsx         animação hexagonal
    CtaFinal.jsx           chamada final com contatos
    Footer.jsx             rodapé
    CustomCursor.jsx       cursor customizado (apenas mouse/trackpad)
    Icons.jsx              ícones de contato reutilizados
  test/setup.js            mocks de navegador para os testes
```

## Animações e acessibilidade

- **Canvas** (`useCanvasAnimation`): buffer dimensionado por `devicePixelRatio` (limitado a 2),
  um único loop de `requestAnimationFrame` por canvas, pausa fora da viewport e com a aba
  oculta, gradientes criados só no resize.
- **`prefers-reduced-motion: reduce`**: canvas desenham um quadro estático, parallax e
  animações de entrada desligados, faixa de áreas parada, cursor sem efeito de atraso.
- **Cursor customizado**: só em dispositivos com `(hover: hover) and (pointer: fine)`;
  em touch o cursor nativo permanece.
- **Menu mobile**: fecha com Esc, mantém o foco dentro do menu, devolve o foco ao botão,
  torna o restante da página `inert`, fecha ao passar para desktop.
- Foco visível (`:focus-visible`), link "Pular para o conteúdo", hierarquia H1 → H2 → H3.

## Conteúdo e dados institucionais

Contatos e links ficam em `src/constants.js`. Se algum dado mudar, atualize também:
`index.html` (metadados e JSON-LD), `public/sitemap.xml` / `public/robots.txt` (domínio)
e `assets-source/og-image.html` (regenere com `npm run og-image`).

## Material de marketing

Posts e peças de identidade visual (antes em `img/`, `src/img/` e `posts-instagram/`) não
fazem parte do site e foram retirados do versionamento. Eles continuam disponíveis
localmente em `marketing/` (ignorada pelo Git) e no histórico do repositório. Para
versioná-los, prefira um repositório separado ou Git LFS.
