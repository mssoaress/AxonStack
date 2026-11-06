// Laço único de requestAnimationFrame compartilhado por todas as animações em canvas.
// Cada canvas se inscreve só enquanto precisa animar; sem inscritos, o laço para.
const subscribers = new Set()
let rafId = 0

function tick(time) {
  rafId = 0
  for (const fn of [...subscribers]) fn(time)
  if (subscribers.size && !rafId) rafId = requestAnimationFrame(tick)
}

/** Inscreve `fn` no próximo quadro e nos seguintes. Retorna a função de cancelamento. */
export function subscribeFrame(fn) {
  subscribers.add(fn)
  if (!rafId) rafId = requestAnimationFrame(tick)
  return () => {
    subscribers.delete(fn)
    if (!subscribers.size && rafId) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
  }
}
