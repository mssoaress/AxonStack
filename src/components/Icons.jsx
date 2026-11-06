// Biblioteca de ícones SVG inline (sem dependências). Todos são decorativos: o nome
// acessível vem sempre do texto ou do aria-label do elemento que os contém.

const base = { width: 15, height: 15, viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false }
const outline = { ...base, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
const line = {
  ...base,
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/* ── Contato ── */

export function WhatsAppIcon() {
  return (
    <svg {...base} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.09c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.17-1.56-1.17-2.98 0-1.42.75-2.11 1.01-2.4.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.3-.28.47-.14.16-.29.36-.42.48-.14.14-.28.29-.12.56.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.7-.82.89-1.1.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
    </svg>
  )
}

export function PhoneIcon() {
  return (
    <svg {...outline}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function MailIcon() {
  return (
    <svg {...outline}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export function InstagramIcon() {
  return (
    <svg {...outline}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

/* ── Interface ── */

export function ArrowIcon() {
  return (
    <svg {...outline} width="14" height="14" className="icon-arrow">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowUpRightIcon() {
  return (
    <svg {...outline} width="14" height="14" className="icon-arrow icon-arrow--diag">
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowUpIcon() {
  return (
    <svg {...outline} width="14" height="14">
      <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg {...outline} width="14" height="14" strokeWidth="2.25">
      <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Serviços (traço fino, 44×44 — preservados do layout anterior) ── */

const stroke = { stroke: 'currentColor', strokeWidth: 1.5 }

const SERVICE_GLYPHS = {
  software: (
    <>
      <rect x="4" y="8" width="36" height="28" rx="3" {...stroke} />
      <path
        d="M14 20l-6 2 6 2M30 20l6 2-6 2M26 16l-8 12"
        {...stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  web: (
    <>
      <path
        d="M6 8h32a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z"
        {...stroke}
      />
      <path
        d="M12 18l4 4 8-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  cloud: (
    <>
      <path d="M8 28c0-7.7 6.3-14 14-14s14 6.3 14 14" {...stroke} strokeLinecap="round" />
      <rect x="4" y="28" width="36" height="10" rx="3" {...stroke} />
      <circle cx="11" cy="33" r="1.5" fill="currentColor" />
      <circle cx="16" cy="33" r="1.5" fill="currentColor" />
      <path d="M28 33h8" {...stroke} strokeLinecap="round" />
    </>
  ),
  servers: (
    <>
      <rect x="6" y="6" width="14" height="14" rx="2" {...stroke} />
      <rect x="24" y="6" width="14" height="14" rx="2" {...stroke} />
      <rect x="6" y="24" width="14" height="14" rx="2" {...stroke} />
      <rect x="24" y="24" width="14" height="14" rx="2" {...stroke} />
      <path d="M20 13h4M20 31h4M13 20v4M31 20v4" {...stroke} strokeLinecap="round" />
    </>
  ),
  vps: (
    <>
      <rect x="4" y="10" width="36" height="24" rx="3" {...stroke} />
      <path d="M15 34l-3 6h20l-3-6" {...stroke} strokeLinejoin="round" />
      <path d="M14 18h16M14 23h10" {...stroke} strokeLinecap="round" />
    </>
  ),
  mail: (
    <>
      <path d="M6 10l16 12 16-12" {...stroke} strokeLinecap="round" />
      <rect x="4" y="8" width="36" height="28" rx="3" {...stroke} />
    </>
  ),
}

export function ServiceIcon({ name }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" focusable="false">
      {SERVICE_GLYPHS[name]}
    </svg>
  )
}

/* ── Diferenciais (24×24, traço 1,5) ── */

const FEATURE_GLYPHS = {
  // Engenharia orientada a necessidades reais: alvo
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </>
  ),
  // Arquitetura escalável: blocos que crescem
  scale: (
    <>
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z" />
      <path d="M17.5 14v7M14 17.5h7" />
    </>
  ),
  // Segurança desde a concepção: escudo
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.4 7.5 9.5 4.4-1.1 7.5-4.9 7.5-9.5V6L12 3z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  // Integração software + infraestrutura: elos
  link: (
    <>
      <path d="M10 14a4.5 4.5 0 0 0 6.4.3l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4-.3l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" />
    </>
  ),
  // Performance: raio
  bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  // Acompanhamento técnico: pulso de monitoramento
  pulse: (
    <>
      <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />
    </>
  ),
}

export function FeatureIcon({ name }) {
  return <svg {...line}>{FEATURE_GLYPHS[name]}</svg>
}
