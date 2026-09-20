import { useEffect, useRef } from 'react'

export default function CursorTrail({ color = '#f59e0b' }) {
  const canvasRef = useRef(null)
  const colorRef = useRef(color)

  useEffect(() => {
    colorRef.current = color
  }, [color])

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia?.('(pointer: coarse)').matches
    if (reduce || coarse) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf
    let last = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const blobs = []

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e
      const speed = Math.hypot(x - last.x, y - last.y)
      if (speed > 2.5 && blobs.length < 140) {
        blobs.push({
          x,
          y,
          r: 5 + Math.min(speed * 0.25, 14) + Math.random() * 6,
          life: 1,
          drift: (Math.random() - 0.5) * 0.6,
          color: colorRef.current,
        })
      }
      last = { x, y }
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let i = blobs.length - 1; i >= 0; i--) {
        const b = blobs[i]
        b.life -= 0.022
        b.r *= 0.975
        b.y += b.drift
        if (b.life <= 0 || b.r < 0.4) {
          blobs.splice(i, 1)
          continue
        }
        ctx.globalAlpha = Math.max(0, b.life) * 0.55
        ctx.fillStyle = b.color
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95] mix-blend-screen"
    />
  )
}
