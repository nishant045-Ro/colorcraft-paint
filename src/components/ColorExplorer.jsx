import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Search, SlidersHorizontal } from 'lucide-react'
import { CATEGORIES, COLORS } from '../data/colors'
import { cn, copyText, isLight } from '../utils/helpers'
import { useToast } from './Toast'

function PaintCard({ color, active, onSelect, index }) {
  const { toast } = useToast()
  const light = isLight(color.hex)

  const handleCopy = async (e) => {
    e.stopPropagation()
    try {
      await copyText(color.hex)
      toast(`${color.name} · ${color.hex} copied`, 'success')
    } catch {
      toast('Could not copy — please copy manually', 'error')
    }
  }

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.28, delay: Math.min(index * 0.015, 0.3) }}
      whileHover={{ y: -6 }}
      onClick={() => onSelect(color)}
      className={cn(
        'group relative overflow-hidden rounded-2xl border bg-panel text-left transition-colors',
        active ? 'border-brand ring-2 ring-brand/40' : 'border-line hover:border-brand/50',
      )}
    >
      <div className="relative h-28" style={{ backgroundColor: color.hex }}>
        {active && (
          <span className="absolute top-2 left-2 grid size-7 place-items-center rounded-full bg-black/35 text-white backdrop-blur">
            <Check className="size-4" />
          </span>
        )}
        <span className="absolute top-2 right-2 rounded-full bg-black/30 px-2 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur">
          {color.family}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 px-3.5 py-3">
        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold">{color.name}</h4>
          <code className="text-xs text-mut">{color.hex}</code>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            'grid size-8 shrink-0 place-items-center rounded-lg border border-line text-mut transition-colors',
            light ? 'hover:bg-black/5' : 'hover:bg-white/5',
            'hover:text-fg',
          )}
          aria-label={`Copy ${color.hex}`}
        >
          <Copy className="size-3.5" />
        </button>
      </div>
    </motion.button>
  )
}

export default function ColorExplorer({ selected, onSelect }) {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return COLORS.filter((c) => {
      const inCat = category === 'all' || c.category === category
      const inQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.hex.toLowerCase().includes(q) ||
        c.family.toLowerCase().includes(q)
      return inCat && inQuery
    })
  }, [category, query])

  return (
    <section id="colors" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">Color Catalog</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Find your perfect shade</h2>
          <p className="mt-4 text-mut">
            Search by name, hex code or family. Tap any color to preview it on the virtual room, or copy its code for
            your painter.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. Ocean Mist or #0ea5e9"
              className="w-full rounded-xl border border-line bg-panel py-3 pr-4 pl-10 text-sm text-fg placeholder:text-soft focus:border-brand/60 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal className="size-4 shrink-0 text-soft" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  category === cat.id
                    ? 'border-transparent bg-gradient-to-br from-brand to-brand-2 text-white'
                    : 'border-line text-mut hover:border-brand/50 hover:text-fg',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 text-sm text-soft">
          {filtered.length} color{filtered.length === 1 ? '' : 's'}
        </div>

        <motion.div layout className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((color, i) => (
              <PaintCard
                key={color.hex}
                color={color}
                index={i}
                active={selected?.hex === color.hex}
                onSelect={onSelect}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-mut">
            <p className="font-display text-lg">No colors found</p>
            <p className="mt-1 text-sm">Try a different search or category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
