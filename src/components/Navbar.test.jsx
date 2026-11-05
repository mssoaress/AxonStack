import { describe, expect, it } from 'vitest'
import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from './Navbar.jsx'
import { intersectionObservers, setMedia } from '../test/setup.js'

function renderWithPage() {
  return render(
    <>
      <Navbar />
      <main>
        <a href="#x">conteúdo</a>
        <section id="servicos" />
        <section id="processo" />
      </main>
      <footer>rodapé</footer>
    </>,
  )
}

const toggle = () => screen.getByRole('button', { name: /menu/i })
const drawer = () => document.getElementById('nav-drawer')

describe('Navbar — menu mobile', () => {
  it('começa fechado e acessível', () => {
    renderWithPage()
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
    expect(toggle()).toHaveAttribute('aria-controls', 'nav-drawer')
    expect(drawer()).not.toBeVisible()
  })

  it('abre, trava o scroll, isola o fundo e foca o primeiro link', async () => {
    const user = userEvent.setup()
    renderWithPage()
    await user.click(toggle())

    expect(toggle()).toHaveAttribute('aria-expanded', 'true')
    expect(toggle()).toHaveAccessibleName('Fechar menu')
    expect(drawer()).toBeVisible()
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.querySelector('main')).toHaveAttribute('inert')
    expect(document.querySelector('footer')).toHaveAttribute('inert')
    expect(document.activeElement).toBe(drawer().querySelector('a'))
  })

  it('fecha com Esc e devolve o foco ao botão', async () => {
    const user = userEvent.setup()
    renderWithPage()
    await user.click(toggle())
    await user.keyboard('{Escape}')

    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
    expect(document.activeElement).toBe(toggle())
    expect(document.body.style.overflow).toBe('')
    expect(document.querySelector('main')).not.toHaveAttribute('inert')
  })

  it('mantém o foco dentro do menu com Tab', async () => {
    const user = userEvent.setup()
    renderWithPage()
    await user.click(toggle())
    const links = [...drawer().querySelectorAll('a')]

    for (let i = 1; i < links.length; i++) {
      await user.tab()
      expect(document.activeElement).toBe(links[i])
    }
    await user.tab()
    expect(document.activeElement).toBe(toggle())
    await user.tab()
    expect(document.activeElement).toBe(links[0])
    await user.tab({ shift: true })
    expect(document.activeElement).toBe(toggle())
  })

  it('fecha ao clicar em um link', async () => {
    const user = userEvent.setup()
    renderWithPage()
    await user.click(toggle())
    await user.click(within(drawer()).getByRole('link', { name: 'Processo' }))
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
    expect(document.body.style.overflow).toBe('')
  })

  it('fecha e libera o scroll ao mudar para desktop', async () => {
    const user = userEvent.setup()
    renderWithPage()
    await user.click(toggle())
    act(() => setMedia('(min-width: 769px)', true))
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
    expect(document.body.style.overflow).toBe('')
  })

  it('libera o scroll se desmontado com o menu aberto', async () => {
    const user = userEvent.setup()
    const { unmount } = renderWithPage()
    await user.click(toggle())
    unmount()
    expect(document.body.style.overflow).toBe('')
  })
})

describe('Navbar — estados', () => {
  const setScroll = (y) => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: y })
    window.dispatchEvent(new Event('scroll'))
  }

  it('assume o estado de vidro ao rolar e volta no topo', () => {
    renderWithPage()
    const nav = document.getElementById('navbar')
    expect(nav).not.toHaveClass('scrolled')
    act(() => setScroll(200))
    expect(nav).toHaveClass('scrolled')
    act(() => setScroll(0))
    expect(nav).not.toHaveClass('scrolled')
  })

  it('marca a seção visível como atual na navegação', () => {
    renderWithPage()
    const io = [...intersectionObservers].find((o) =>
      [...o.targets].some((t) => t.id === 'processo'),
    )
    act(() =>
      io.callback([{ target: document.getElementById('processo'), isIntersecting: true }], io),
    )
    const links = screen.getAllByRole('link', { name: 'Processo' })
    links.forEach((a) => expect(a).toHaveAttribute('aria-current', 'true'))
    expect(screen.getAllByRole('link', { name: 'Serviços' })[0]).not.toHaveAttribute('aria-current')
  })
})
