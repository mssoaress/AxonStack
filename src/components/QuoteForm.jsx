import { useEffect, useState } from 'react'
import { MailIcon, WhatsAppIcon } from './Icons.jsx'
import { SERVICES } from '../content/services.js'
import { CONTACT } from '../constants.js'
import { quoteHref } from '../lib/quote.js'

const NOT_SURE = 'Ainda não sei — quero uma orientação'

// Formulário de orçamento SEM backend: os dados não são enviados a nenhum servidor.
// Ao enviar, a mensagem é montada e aberta no WhatsApp (nova aba) ou no aplicativo de
// e-mail; o envio de fato é concluído pela própria pessoa nesses aplicativos. Por isso o
// retorno exibido nunca afirma que a mensagem "foi enviada".
export default function QuoteForm() {
  // Antes da hidratação o envio fica desabilitado (sem JS o formulário não funcionaria).
  const [ready, setReady] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => setReady(true), [])

  const onSubmit = (e) => {
    e.preventDefault()
    const fields = Object.fromEntries(new FormData(e.currentTarget))
    const channel = e.nativeEvent?.submitter?.value === 'email' ? 'email' : 'whatsapp'
    const href = quoteHref(channel, fields)

    if (channel === 'email') window.open(href, '_self')
    else window.open(href, '_blank', 'noopener,noreferrer')

    setStatus({ channel, href })
  }

  return (
    <form className="quote-form" onSubmit={onSubmit} aria-labelledby="quote-title">
      <div className="quote-head">
        <h3 className="quote-title" id="quote-title">
          Solicite um orçamento
        </h3>
        <p className="quote-sub">
          Campos com <span aria-hidden="true">*</span>
          <span className="sr-only">asterisco</span> são obrigatórios.
        </p>
      </div>

      <div className="quote-grid">
        <Field label="Nome" name="nome" required autoComplete="name" maxLength={80} />
        <Field label="Empresa" name="empresa" autoComplete="organization" maxLength={80} />
        <Field label="E-mail" name="email" type="email" autoComplete="email" maxLength={120} />
        <Field
          label="WhatsApp"
          name="whatsapp"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          maxLength={20}
        />

        <div className="field field--full">
          <label htmlFor="quote-solucao">
            Tipo de solução <span aria-hidden="true">*</span>
          </label>
          <select id="quote-solucao" name="solucao" required defaultValue="">
            <option value="" disabled>
              Selecione uma opção
            </option>
            {SERVICES.map(({ title }) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
            <option value={NOT_SURE}>{NOT_SURE}</option>
          </select>
        </div>

        <div className="field field--full">
          <label htmlFor="quote-descricao">
            Descrição do projeto <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="quote-descricao"
            name="descricao"
            rows={4}
            required
            minLength={10}
            maxLength={1200}
            aria-describedby="quote-descricao-hint"
          />
          <p className="field-hint" id="quote-descricao-hint">
            Conte o objetivo, o que já existe hoje e se há algum prazo em mente.
          </p>
        </div>
      </div>

      <div className="quote-actions">
        <button
          type="submit"
          name="canal"
          value="whatsapp"
          className="btn btn-primary"
          disabled={!ready}
        >
          <WhatsAppIcon />
          Enviar pelo WhatsApp
        </button>
        <button
          type="submit"
          name="canal"
          value="email"
          className="btn btn-glass"
          disabled={!ready}
        >
          <MailIcon />
          Enviar por e-mail
        </button>
      </div>

      <p className="quote-privacy">
        Seus dados não ficam armazenados neste site: eles apenas compõem a mensagem que você
        confirma e envia pelo WhatsApp ou pelo seu e-mail.
      </p>

      <div className="quote-status" role="status" aria-live="polite">
        {status?.channel === 'whatsapp' && (
          <p>
            Sua mensagem foi preparada no WhatsApp. Para concluir, confirme o envio no aplicativo.{' '}
            <a href={status.href} target="_blank" rel="noopener noreferrer">
              Abrir o WhatsApp novamente<span className="sr-only"> (abre em nova aba)</span>
            </a>
          </p>
        )}
        {status?.channel === 'email' && (
          <p>
            Sua mensagem foi preparada no seu aplicativo de e-mail. Para concluir, envie-a por lá.
            Se nada abriu, escreva para <a href={CONTACT.emailHref}>{CONTACT.email}</a>.
          </p>
        )}
      </div>
    </form>
  )
}

function Field({ label, name, required = false, type = 'text', ...props }) {
  const id = `quote-${name}`
  return (
    <div className="field">
      <label htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input id={id} name={name} type={type} required={required} {...props} />
    </div>
  )
}
