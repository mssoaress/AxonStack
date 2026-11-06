import { CONTACT, whatsappLink } from '../constants.js'

const clean = (value) => (typeof value === 'string' ? value.trim() : '')

/**
 * Monta o texto do pedido de orçamento a partir dos campos do formulário.
 * Campos opcionais vazios são omitidos.
 */
export function buildQuoteMessage(fields) {
  const nome = clean(fields.nome)
  const empresa = clean(fields.empresa)
  const email = clean(fields.email)
  const whatsapp = clean(fields.whatsapp)
  const solucao = clean(fields.solucao)
  const descricao = clean(fields.descricao)

  return [
    'Olá! Conheci a Axon Stack pelo site e gostaria de solicitar um orçamento.',
    '',
    `Nome: ${nome}`,
    empresa ? `Empresa: ${empresa}` : null,
    email ? `E-mail: ${email}` : null,
    whatsapp ? `WhatsApp: ${whatsapp}` : null,
    `Solução: ${solucao}`,
    '',
    'Sobre o projeto:',
    descricao,
  ]
    .filter((line) => line !== null)
    .join('\n')
}

/** Link do canal escolhido, já com a mensagem preenchida. */
export function quoteHref(channel, fields) {
  const message = buildQuoteMessage(fields)
  if (channel === 'email') {
    const subject = `Pedido de orçamento — ${clean(fields.solucao) || 'Axon Stack'}`
    return `${CONTACT.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
  }
  return whatsappLink(message)
}
