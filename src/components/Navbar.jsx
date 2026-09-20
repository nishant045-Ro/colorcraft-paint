import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, PaintBucket, X } from 'lucide-react'
import { cn } from '../utils/helpers'

const LINKS = [
  { href: '#colors', label: 'Colors' },
  { href: '#room', label: 'Try at Home' },
  { href: '#calculator', label: 'Calculator' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300',
        scrolled ? 'border-line bg-ink/80 backdrop-blur-xl' : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-ink">
            <PaintBucket className="size-5" />
          </span>
          Color<span className="bg-gradient-to-r from-brand to-brand-2 bg-clip-text text-transparent">Craft</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-mut transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-br from-brand to-brand-2 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-2/30 transition-transform hover:-translate-y-0.5"
          >
            Get Free Quote
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-lg border border-line text-fg md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-ink/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-mut transition-colors hover:bg-panel hover:text-fg"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-gradient-to-br from-brand to-brand-2 px-3 py-3 text-center text-sm font-semibold text-white"
              >
                Get Free Quote
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div style={{ scaleX: progress }} className="h-0.5 origin-left bg-gradient-to-r from-brand to-brand-2" />
    </header>
  )
}
