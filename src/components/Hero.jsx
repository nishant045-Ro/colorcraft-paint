import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Palette, Sparkles } from 'lucide-react'
import { COLORS } from '../data/colors'

const SWATCHES = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6', '#e11d48']
const ROOMS = ['living room', 'bedroom', 'kitchen', 'office', 'nursery']

function RotatingWord() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROOMS.length), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROOMS[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="bg-gradient-to-r from-brand via-brand-2 to-accent-2 bg-clip-text text-transparent"
        >
          {ROOMS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } },
}

export default function Hero({ onPick }) {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44">
      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-sm text-mut"
        >
          <Sparkles className="size-4 text-brand" />
          Trusted by 1,200+ painters & home owners
        </motion.span>

        <motion.h1
          variants={item}
          className="mx-auto mt-7 max-w-4xl font-display text-4xl leading-[1.12] font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          Give your <RotatingWord /> the{' '}
          <span className="underline decoration-brand/40 decoration-4 underline-offset-8">color it deserves</span>
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-lg text-mut">
          Explore 48+ curated paint shades, preview them on a virtual wall, and let our experts handle the rest — from
          color advice to the final coat.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#colors"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand to-brand-2 px-7 py-3.5 font-semibold text-white shadow-xl shadow-brand-2/30 transition-transform hover:-translate-y-0.5"
          >
            <Palette className="size-5" />
            Explore All Colors
          </a>
          <a
            href="#room"
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-semibold text-fg transition-colors hover:bg-white/5"
          >
            Try on a Wall
            <ArrowRight className="size-4" />
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {SWATCHES.map((hex, i) => (
            <motion.button
              key={hex}
              onClick={() => onPick(COLORS[Math.floor(COLORS.length * ((i + 1) / (SWATCHES.length + 1)))])}
              whileHover={{ scale: 1.18, rotate: -8 }}
              whileTap={{ scale: 0.94 }}
              className="size-12 rounded-xl border-2 border-white/20 shadow-lg sm:size-14"
              style={{ backgroundColor: hex }}
              aria-label={`Pick ${hex}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
