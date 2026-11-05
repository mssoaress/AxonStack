import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// ── matchMedia configurável por teste ──
const mediaState = new Map()
const mediaListeners = new Map()

export function setMedia(query, matches) {
  mediaState.set(query, matches)
  for (const fn of mediaListeners.get(query) ?? []) fn({ matches, media: query })
}

const isBrowser = typeof window !== 'undefined'

if (isBrowser)
  window.matchMedia = vi.fn((query) => ({
    media: query,
    get matches() {
      return mediaState.get(query) ?? false
    },
    addEventListener: (_type, fn) => {
      if (!mediaListeners.has(query)) mediaListeners.set(query, new Set())
      mediaListeners.get(query).add(fn)
    },
    removeEventListener: (_type, fn) => mediaListeners.get(query)?.delete(fn),
  }))

// ── IntersectionObserver controlável ──
export const intersectionObservers = new Set()

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
    this.targets = new Set()
    intersectionObservers.add(this)
  }
  observe(el) {
    this.targets.add(el)
  }
  unobserve(el) {
    this.targets.delete(el)
  }
  disconnect() {
    this.targets.clear()
    intersectionObservers.delete(this)
  }
  trigger(isIntersecting) {
    this.callback(
      [...this.targets].map((target) => ({ target, isIntersecting })),
      this,
    )
  }
}
if (isBrowser) window.IntersectionObserver = MockIntersectionObserver

if (isBrowser)
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

// jsdom não implementa canvas: retorna null sem poluir o console.
if (isBrowser) HTMLCanvasElement.prototype.getContext = () => null

if (isBrowser) window.scrollTo = () => {}

afterEach(() => {
  mediaState.clear()
  if (!isBrowser) return
  cleanup()
  document.body.style.overflow = ''
  document.documentElement.className = ''
})
