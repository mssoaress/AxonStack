# Axon Stack — site institucional

Site da **Axon Stack** (Software, Infraestrutura e Cloud), publicado em
[axonstack.dev](https://axonstack.dev). Página única com HTML pré-renderizado no build,
hidratação com React, animações em canvas e um design system próprio com Liquid Glass.

## Tecnologias

| Camada      | Ferramenta                                                 |
| ----------- | ---------------------------------------------------------- |
| UI          | React 18                                                   |
| Build / dev | Vite 7 + `@vitejs/plugin-react`                            |
| Fontes      | Space Grotesk (variável), Inter e Megrim via `@fontsource` |
| Testes      | Vitest 4 + Testing Library + jsdom                         |
| Qualidade   | ESLint 9 (flat config, React + Hooks) e Prettier 3         |

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
   marcador `<!--app-html-->` de `dist/index.html`, embute o CSS, faz preload da fonte do
   título (Space Grotesk, o H1 é o LCP) e gera a **Content-Security-Policy** (`<meta>`) com
   hashes dos `<style>` embutidos; depois remove `dist-ssr/`.

O `src/main.jsx` hidrata com `hydrateRoot` dentro de `startTransition`: o conteúdo já está
visível e o React ativa a interatividade em fatias, sem tarefas longas na thread principal.
No `npm run dev` o `#root` chega vazio e o app é renderizado com `createRoot`.

Regras para não quebrar a pré-renderização (cobertas por `src/entry-server.test.jsx`):

- nada de `window`/`document` durante a renderização — somente dentro de `useEffect`;
- **nada de atributo `style` inline** no JSX: a CSP não permite `unsafe-inline`. Estilos
  dinâmicos vão por classes ou por `element.style` dentro de efeitos.

## Deploy

O resultado é um site estático: publique o conteúdo de `dist/` (hoje hospedado na Vercel,
com Build `npm run build` e Output `dist`). `robots.txt`, `sitemap.xml` e as imagens de
`public/` são copiados para `dist/` automaticamente.

Cabeçalhos de segurança recomendados, pendências de domínio (`www` × raiz) e a situação do
deploy estão em [`docs/seguranca-e-deploy.md`](docs/seguranca-e-deploy.md).

## Estrutura

```
index.html                 metadados, Open Graph, JSON-LD e marcador da pré-renderização
public/                    robots.txt, sitemap.xml e img/ (logos, favicon, og-image.jpg)
assets-source/             logo original em alta e fonte da imagem Open Graph
scripts/
  prerender.js             pós-build: HTML pré-renderizado, CSS embutido, preload e CSP
  logo-alpha.js            gera o logo com transparência a partir do original (fundo preto)
docs/seguranca-e-deploy.md cabeçalhos HTTP, domínio e configuração da Vercel
src/
  main.jsx                 entrada do cliente (hidratação em transição / render)
  entry-server.jsx         entrada usada na pré-renderização
  App.jsx                  composição da página
  constants.js             contatos, links do WhatsApp, navegação (fonte única)
  fonts.js                 fontes auto-hospedadas
  index.css                manifesto: importa os estilos na ordem da cascata
  styles/
    tokens.css             design tokens (cores, tipografia, espaço, vidro, camadas, motion)
    base.css               reset, fallbacks de fonte, acessibilidade, camadas globais
    motion.css             reveal, keyframes e prefers-reduced-motion
    components.css         container, títulos, Liquid Glass, botões, badges, cards, chips
    sections/*.css         um arquivo por seção (navbar, hero, marquee, services…)
  content/                 textos editáveis: services, process, differentials, faq,
                           stack (diagrama do hero) e projects (portfólio)
  lib/
    frameLoop.js           laço único de requestAnimationFrame para todos os canvas
    quote.js               monta a mensagem do formulário de orçamento
  hooks/
    useCanvasAnimation.js  ciclo de vida dos canvas (DPR, pausa, reduced motion, low power)
    useScrollReveal.js     revelação de .reveal ao rolar
  components/
    Navbar.jsx             pílula de vidro, seção ativa, progresso e menu mobile flutuante
    Hero.jsx / HeroStack   hero editorial + diagrama isométrico da stack
    HeroCanvas.jsx         ondas animadas do hero
    NetCanvas.jsx          rede de partículas de fundo
    Marquee.jsx            faixa de especialidades
    Services.jsx           soluções (grade bento, benefícios, CTA por serviço)
    Projects.jsx           portfólio editorial (oculto enquanto não houver projetos reais)
    About.jsx              posicionamento e pilares
    Process.jsx            timeline do processo
    Diferenciais.jsx       painel com núcleo central (DiffCanvas)
    DiffCanvas.jsx         animação hexagonal do núcleo
    Faq.jsx                acordeão nativo
    Contact.jsx            CTA final + canais de contato
    QuoteForm.jsx          formulário de orçamento (WhatsApp ou e-mail, sem backend)
    Footer.jsx             rodapé
    SectionHeader.jsx      cabeçalho padrão das seções
    CustomCursor.jsx       anel de realce do cursor (apenas mouse/trackpad)
    Icons.jsx              ícones SVG inline
  test/setup.js            mocks de navegador para os testes
```

## Design system

Conceito: _Premium Digital Infrastructure — Engineered Experiences_. Tokens em
`src/styles/tokens.css`:

- **Cores**: preto profundo `--color-bg`, grafite/carvão (`--color-graphite`,
  `--color-charcoal`), branco suave `--color-white`; laranja `--color-accent` (#E85002) só
  em CTAs, estados ativos, indicadores e detalhes. Texto em três níveis com contraste AA.
- **Tipografia**: `--font-display` (Space Grotesk, títulos e interface de destaque),
  `--font-body` (Inter), `--font-mono` (rótulos técnicos) e `--font-brand` (Megrim, apenas o
  logotipo). Escala fluida `--text-*` com `clamp()`.
- **Espaço e forma**: `--space-1…10`, `--gutter`, `--section-y`, `--container*`,
  `--radius-xs…2xl`, sombras `--shadow-*`, camadas `--z-*`.
- **Movimento**: `--ease-out/in-out/spring`, `--duration-*`.
- **Breakpoints** (documentados no topo de `tokens.css`): 480 · 768 · 1024 · 1280 · 1536.

### Componentes base (`components.css`)

`.container`, `.section`, `.section-head` (+ `--split`), `.eyebrow`, `.section-title`,
`.section-lead`, `.text-gradient`, `.glass` (+ `--clear`/`--dense`), `.btn` (+ `-primary`,
`-glass`, `-ghost`, `-sm`, `-lg`, `-block`), `.text-link`, `.badge`, `.status-dot`, `.index`,
`.chip`, `.icon-tile`, `.card` (+ `--interactive`, `--spotlight`) e `.check-list`.

### Liquid Glass

`.glass` empilha reflexo especular, brilho interno, tinta translúcida, `backdrop-filter`
(blur + saturação), aro de luz mascarado (`::before`) e destaques internos. A densidade da
tinta varia por variante e estado (a navbar fica mais densa ao rolar). Usado na navbar, no
menu mobile, no formulário e nos botões secundários. **Fallback**: sem `backdrop-filter`
(`@supports`) a tinta fica sólida; sem `mask-composite`, o aro é omitido.

## Conversão

- **CTA principal** "Solicitar orçamento" (hero e navbar), **secundário** "Explorar soluções"
  e **contextual** "Conversar sobre este serviço" em cada card.
- Os links do WhatsApp levam mensagens iniciais conforme a origem (`WHATSAPP_MESSAGES` e
  `serviceWhatsappLink` em `constants.js`). O número é o mesmo de sempre.
- **Formulário de orçamento** (`QuoteForm.jsx`): não há backend, então os dados **não são
  enviados a nenhum servidor**. A mensagem é montada e aberta no WhatsApp (nova aba) ou no
  aplicativo de e-mail (`mailto:`); o envio é concluído pela própria pessoa, e o aviso exibido
  nunca diz "enviado com sucesso". Até a hidratação os botões ficam desabilitados.

## Animações e acessibilidade

- **Canvas** (`useCanvasAnimation` + `lib/frameLoop.js`): todos compartilham um único
  `requestAnimationFrame`; pausam fora da viewport e com a aba oculta; DPR limitado a 2 (1,5 em
  aparelhos modestos, com menos partículas); quadro estático com movimento reduzido ou
  economia de dados.
- **CSS**: reveal com `translate`/`opacity`, trilho do processo e progresso da navbar com
  animações ligadas à rolagem (`animation-timeline`, com fallback estático), menu com
  `@starting-style`, FAQ com `::details-content`. Tudo é desligado com
  `prefers-reduced-motion`.
- **Fontes**: fallbacks com métricas ajustadas (`size-adjust`) evitam deslocamento de layout
  na troca de fonte.
- **Cursor**: o nativo permanece sempre; o anel de realce só existe com mouse e sem movimento
  reduzido, e some sobre campos de texto.
- **Menu mobile**: fecha com Esc ou tocando fora, mantém o foco dentro do painel, devolve o
  foco ao botão, deixa o restante da página `inert` e fecha ao passar para desktop.
- Foco visível, link "Pular para o conteúdo", hierarquia H1 → H2 → H3, estados ativos que não
  dependem só de cor, alvos de toque ≥ 44 px.

## Conteúdo e dados institucionais

- Contatos e links: `src/constants.js`.
- Textos das seções: `src/content/*.js`.
- **Projetos**: adicione itens reais e autorizados em `src/content/projects.js` (o formato
  está documentado no arquivo). Com a lista vazia, a seção e o link "Projetos" não aparecem.

Se algum dado institucional mudar, atualize também `index.html` (metadados e JSON-LD),
`public/sitemap.xml` / `public/robots.txt` (domínio) e `assets-source/og-image.html`
(regenere com `npm run og-image`).

## Material de marketing

Posts e peças de identidade visual não fazem parte do site e ficam fora do versionamento,
em `marketing/` (ignorada pelo Git). Para versioná-los, prefira um repositório separado ou
Git LFS.
