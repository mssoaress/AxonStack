# Axon Stack — React + Vite

Migração completa do projeto HTML/CSS/JS estático para React + Vite, preservando 100% da estrutura, estilos, animações e comportamento original.

## Como rodar

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## IMPORTANTE: logo

Coloque seu arquivo de logo real em:

```
public/img/logo-icone.png
```

(foi criado um arquivo vazio nesse caminho como placeholder — substitua pelo seu logo).

## Estrutura

```
src/
  App.jsx                 — monta a página inteira
  index.css               — todo o CSS original (preservado integralmente)
  hooks/
    useScrollReveal.js     — IntersectionObserver para .reveal e .diff-item
  components/
    NetCanvas.jsx          — canvas global de pontos flutuantes
    CustomCursor.jsx       — cursor customizado (desktop)
    Navbar.jsx             — navbar + hamburger + drawer mobile
    Hero.jsx               — seção hero + parallax no scroll
    HeroCanvas.jsx         — canvas de ondas de energia do hero
    ClientsStrip.jsx       — faixa de logos rolando
    Services.jsx           — seção "Nossos Serviços"
    Process.jsx            — seção "Nosso Processo"
    Diferenciais.jsx       — seção "Diferenciais"
    DiffCanvas.jsx          — canvas hexagonal animado
    CtaFinal.jsx            — seção CTA final
    Footer.jsx              — rodapé
```

Todas as animações (fadeUp, scrollPulse, scrollTrack, reveal on scroll, parallax do hero,
canvas de partículas, canvas de ondas, canvas hexagonal, cursor customizado, menu mobile)
foram portadas usando `useEffect`/`useRef`/`useState`, mantendo exatamente a mesma lógica
e timing do JS original — apenas adaptadas ao ciclo de vida do React (mount/unmount com
limpeza de listeners e `requestAnimationFrame`).
