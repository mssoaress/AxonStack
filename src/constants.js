// Dados institucionais compartilhados. Mantenha esta fonte única em sincronia com
// os metadados/JSON-LD de index.html, public/robots.txt e public/sitemap.xml.
import { PROJECTS } from './content/projects.js'

export const COMPANY_NAME = 'Axon Stack'
export const TAGLINE = 'Software, Infraestrutura e Cloud'

const PHONE_E164 = '+5521994291884'

// Mensagens iniciais do WhatsApp conforme a origem do clique.
export const WHATSAPP_MESSAGES = {
  quote: 'Olá! Conheci a Axon Stack pelo site e gostaria de solicitar um orçamento.',
  project: 'Olá! Conheci a Axon Stack pelo site e gostaria de conversar sobre um projeto.',
  question: 'Olá! Conheci a Axon Stack pelo site e tenho uma dúvida sobre os serviços.',
}

export const whatsappLink = (message = WHATSAPP_MESSAGES.project) =>
  `https://wa.me/${PHONE_E164.slice(1)}?text=${encodeURIComponent(message)}`

export const serviceWhatsappLink = (service) =>
  whatsappLink(`Olá! Conheci a Axon Stack pelo site e gostaria de conversar sobre ${service}.`)

export const CONTACT = {
  phoneDisplay: '(21) 99429-1884',
  phoneHref: `tel:${PHONE_E164}`,
  whatsappHref: whatsappLink(),
  email: 'contato@axonstack.dev',
  emailHref: 'mailto:contato@axonstack.dev',
  instagramHandle: '@axonstack.dev',
  instagramHref: 'https://instagram.com/axonstack.dev',
}

// Breakpoint em que a navbar passa a exibir os links (mesmo valor do CSS: lg = 1024px).
export const NAV_DESKTOP_QUERY = '(min-width: 1024px)'

// "Projetos" só entra na navegação quando houver projetos reais publicados.
export const NAV_LINKS = [
  { href: '#servicos', label: 'Soluções' },
  ...(PROJECTS.length ? [{ href: '#projetos', label: 'Projetos' }] : []),
  { href: '#sobre', label: 'Sobre' },
  { href: '#processo', label: 'Processo' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#faq', label: 'FAQ' },
]

export const CONTACT_ANCHOR = { href: '#contato', label: 'Solicitar orçamento' }
