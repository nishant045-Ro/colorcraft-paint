import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, ClipboardCheck } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { useToast } from './Toast'
import { copyText } from '../utils/helpers'

const COVERAGE = 12 // m² per litre, single coat
const RATE = 550 // NPR per litre (example)

function recommendPacks(liters) {
  let remaining = Math.ceil(liters)
  const sizes = [20, 4, 1]
  const packs = []
  for (const size of sizes) {
    const count = Math.floor(remaining / size)
    if (count > 0) {
      packs.push({ size, count })
      remaining -= count * size
    }
  }
  return packs
}

function NumberField({ label, value, onChange, suffix = 'm', min = 0, step = 0.1 }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-mut">{label}</span>
      <div className="flex items-center rounded-xl border border-line bg-ink px-3 focus-within:border-brand/60">
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent py-3 text-sm text-fg focus:outline-none"
        />
        <span className="text-xs text-soft">{suffix}</span>
      </div>
    </label>
  )
}

export default function PaintCalculator({ color }) {
  const { toast } = useToast()
  const [length, setLength] = useState(5)
  const [width, setWidth] = useState(4)
  const [height, setHeight] = useState(2.8)
  const [coats, setCoats] = useState(2)
  const [openings, setOpenings] = useState(2)

  const result = useMemo(() => {
    const perimeter = 2 * (Number(length) + Number(width))
    const wallArea = Math.max(0, perimeter * Number(height))
    const openingArea = Number(openings) * 1.8
    const paintable = Math.max(0, wallArea - openingArea)
    const liters = (paintable * Number(coats)) / COVERAGE
    const cost = liters * RATE
    return { wallArea, paintable, liters, cost, packs: recommendPacks(liters) }
  }, [length, width, height, coats, openings])

  const summary = `${color?.name ?? 'Paint'} — ${Math.round(result.paintable)} m², ${result.liters.toFixed(1)} L, ~NPR ${Math.round(result.cost).toLocaleString()}`

  const handleCopy = async () => {
    try {
      await copyText(summary)
      toast('Estimate copied to clipboard', 'success')
    } catch {
      toast('Could not copy estimate', 'error')
    }
  }

  return (
    <section id="calculator" className="relative bg-ink/70 py-20 backdrop-blur-sm lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Paint Calculator"
          title="How much paint do you need?"
          description="Enter your room size and we'll estimate litres, recommended pack sizes and an approximate cost — instantly."
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-line bg-panel/80 p-6 backdrop-blur-sm sm:p-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <NumberField label="Room length" value={length} onChange={setLength} />
              <NumberField label="Room width" value={width} onChange={setWidth} />
              <NumberField label="Wall height" value={height} onChange={setHeight} />
              <NumberField label="Coats" value={coats} onChange={setCoats} suffix="x" min={1} step={1} />
              <NumberField label="Doors + windows" value={openings} onChange={setOpenings} suffix="pcs" min={0} step={1} />
            </div>
            <p className="mt-4 text-xs text-soft">
              Assumes {COVERAGE} m² coverage per litre. Actual usage varies with surface and texture.
            </p>
          </div>

          <motion.div
            layout
            className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-brand-2/5 p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-brand">
              <Calculator className="size-4" /> Your estimate
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-soft">Paintable area</p>
                <p className="font-display text-2xl font-bold">{Math.round(result.paintable)} m²</p>
              </div>
              <div>
                <p className="text-xs text-soft">Paint needed</p>
                <p className="font-display text-2xl font-bold">{result.liters.toFixed(1)} L</p>
              </div>
              <div>
                <p className="text-xs text-soft">Approx. cost</p>
                <p className="font-display text-2xl font-bold">NPR {Math.round(result.cost).toLocaleString()}</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-6 rounded-md border border-line" style={{ backgroundColor: color?.hex }} />
                  <p className="truncate text-xs text-soft">{color?.name}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <p className="text-xs text-soft">Recommended packs</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.packs.map((p) => (
                  <span key={p.size} className="rounded-full border border-line bg-ink px-3 py-1 text-xs font-medium">
                    {p.count} × {p.size}L
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand to-brand-2 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <ClipboardCheck className="size-4" /> Copy estimate
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
