// Dados institucionais compartilhados. Mantenha esta fonte única em sincronia com
// os metadados/JSON-LD de index.html, public/robots.txt e public/sitemap.xml.

export const SITE_URL = 'https://axonstack.dev'
export const COMPANY_NAME = 'Axon Stack'
export const TAGLINE = 'Infraestrutura, Cloud e Software'

const PHONE_E164 = '+5521994291884'
const WHATSAPP_MESSAGE =
  'Olá! Vim pelo site e gostaria de saber mais sobre os serviços da Axon Stack.'

export const CONTACT = {
  phoneDisplay: '(21) 99429-1884',
  phoneHref: `tel:${PHONE_E164}`,
  whatsappHref: `https://wa.me/${PHONE_E164.slice(1)}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  email: 'contato@axonstack.dev',
  emailHref: 'mailto:contato@axonstack.dev',
  instagramHandle: '@axonstack.dev',
  instagramHref: 'https://instagram.com/axonstack.dev',
}

export const NAV_LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#processo', label: 'Processo' },
  { href: '#diferenciais', label: 'Diferenciais' },
]

export const CONTACT_ANCHOR = { href: '#cta-final', label: 'Contato' }
