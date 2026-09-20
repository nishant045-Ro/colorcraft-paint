import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Dice5, Droplets, Moon, Sun } from 'lucide-react'
import { COLORS, DEFAULT_COLOR, FINISHES } from '../data/colors'
import { cn, copyText, harmony, mix, shadeRamp } from '../utils/helpers'
import { useToast } from './Toast'

function RoomScene({ hex, finish, mode }) {
  const isNight = mode === 'night'
  const sheen =
    finish === 'gloss'
      ? 'linear-gradient(115deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0) 38%, rgba(255,255,255,0) 62%, rgba(255,255,255,0.22) 100%)'
      : finish === 'satin'
        ? 'linear-gradient(115deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.12) 100%)'
        : 'none'

  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-line">
      {/* Wall */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: hex, filter: isNight ? 'brightness(0.62) saturate(0.9)' : 'brightness(1)' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      {/* Sheen overlay */}
      <div className="absolute inset-0 transition-all duration-500" style={{ background: sheen }} />
      {/* Ambient light */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isNight
            ? 'radial-gradient(circle at 22% 30%, rgba(255,214,150,0.35), transparent 40%)'
            : 'radial-gradient(circle at 68% 26%, rgba(255,255,255,0.35), transparent 42%)',
        }}
      />

      {/* Window */}
      <div className="absolute top-[14%] left-[12%] h-[46%] w-[30%] rounded-lg border-4 border-white/70 shadow-inner">
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-b',
            isNight ? 'from-indigo-950 via-indigo-800 to-slate-900' : 'from-sky-200 to-sky-400',
          )}
        >
          {isNight && (
            <>
              <span className="absolute top-2 right-3 size-1.5 rounded-full bg-white/90" />
              <span className="absolute top-5 left-2 size-1 rounded-full bg-white/80" />
              <span className="absolute bottom-4 right-5 size-1 rounded-full bg-white/70" />
            </>
          )}
        </div>
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div className="border-r-2 border-b-2 border-white/70" />
          <div className="border-b-2 border-white/70" />
          <div className="border-r-2 border-white/70" />
          <div />
        </div>
        <div className="absolute -inset-x-2 -bottom-2 h-3 rounded-b-lg bg-white/60" />
      </div>

      {/* Hanging picture frames */}
      <div className="absolute top-[16%] right-[14%] flex gap-3">
        <div className="h-14 w-11 rounded-sm border-2 border-white/60 bg-black/10 backdrop-blur-sm" />
        <div className="h-14 w-11 rounded-sm border-2 border-white/60 bg-black/15 backdrop-blur-sm" />
      </div>

      {/* Floor */}
      <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-b from-amber-800 to-amber-950" />
      <div className="absolute inset-x-0 bottom-[20%] h-2 bg-white/25" />

      {/* Rug */}
      <div className="absolute bottom-[6%] left-1/2 h-[12%] w-[62%] -translate-x-1/2 rounded-[50%] bg-white/15 backdrop-blur-sm" />

      {/* Sofa */}
      <div className="absolute bottom-[15%] left-[8%] h-[26%] w-[46%]">
        <div className="absolute inset-0 rounded-xl bg-slate-700 shadow-lg" />
        <div className="absolute -top-[34%] left-[6%] h-[40%] w-[44%] rounded-t-xl bg-slate-600" />
        <div className="absolute top-[18%] left-[8%] h-8 w-8 rounded-md transition-colors duration-500" style={{ backgroundColor: mix(hex, 0.15, 'white') }} />
        <div className="absolute top-[18%] left-[30%] h-8 w-8 rounded-md bg-amber-400/80" />
        <div className="absolute -bottom-3 left-[6%] h-3 w-3 rounded-full bg-slate-800" />
        <div className="absolute -right-2 -bottom-3 h-3 w-3 rounded-full bg-slate-800" />
      </div>

      {/* Side table + lamp */}
      <div className="absolute right-[14%] bottom-[15%] w-[14%]">
        <div className="mx-auto h-10 w-10 rounded-t-full bg-gradient-to-b from-amber-300 to-amber-500 shadow-md" />
        <div className="mx-auto h-14 w-1.5 bg-slate-300" />
        <div className="mx-auto h-1.5 w-14 rounded bg-slate-400" />
      </div>

      {/* Plant */}
      <div className="absolute bottom-[15%] left-[58%]">
        <div className="mx-auto h-5 w-6 rounded-b-md bg-orange-800" />
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-2xl">🪴</div>
      </div>
    </div>
  )
}

export default function RoomPainter({ selected, onSelect }) {
  const { toast } = useToast()
  const [finish, setFinish] = useState('satin')
  const [mode, setMode] = useState('day')
  const color = selected ?? DEFAULT_COLOR
  const ramp = shadeRamp(color.hex)
  const palettes = harmony(color.hex)

  const applyHarmony = (hex) => {
    onSelect({ name: `${color.name} harmony`, hex, category: color.category, family: 'Harmony' })
    toast(`Applied ${hex}`, 'info')
  }

  const handleCopy = async () => {
    try {
      await copyText(color.hex)
      toast(`Copied ${color.name} · ${color.hex}`, 'success')
    } catch {
      toast('Could not copy — please copy manually', 'error')
    }
  }

  const surprise = () => {
    let next = color
    while (next.hex === color.hex) {
      next = COLORS[Math.floor(Math.random() * COLORS.length)]
    }
    onSelect(next)
    toast(`Surprise! ${next.name}`, 'info')
  }

  return (
    <section id="room" className="relative bg-ink/70 py-20 backdrop-blur-sm lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">Virtual Try-On</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Preview a color on a real wall</h2>
            <p className="mt-4 text-mut">
              Pick any shade, choose the finish, and see how it looks in day or evening light — before a single drop is
              poured.
            </p>
          </div>

          <div className="flex rounded-full border border-line bg-panel p-1">
            {[
              { id: 'day', label: 'Day', Icon: Sun },
              { id: 'night', label: 'Evening', Icon: Moon },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  mode === id ? 'bg-gradient-to-br from-brand to-brand-2 text-white' : 'text-mut hover:text-fg',
                )}
              >
                <Icon className="size-4" /> {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <RoomScene hex={color.hex} finish={finish} mode={mode} />

          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-line bg-panel p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs tracking-wide text-soft uppercase">Selected color</p>
                  <h3 className="mt-1 font-display text-xl font-bold">{color.name}</h3>
                </div>
                <span className="rounded-full border border-line px-3 py-1 text-xs text-mut">{color.family}</span>
              </div>

              <motion.div
                className="mt-4 h-20 rounded-xl border border-line"
                animate={{ backgroundColor: color.hex }}
                transition={{ duration: 0.4 }}
              />

              <div className="mt-4 flex items-center justify-between">
                <code className="text-sm text-mut">{color.hex}</code>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-mut transition-colors hover:text-fg"
                >
                  <Copy className="size-3.5" /> Copy
                </button>
              </div>
            </div>

            {/* Finish selector */}
            <div className="rounded-2xl border border-line bg-panel p-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Droplets className="size-4 text-brand" /> Finish
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {FINISHES.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f.id)}
                    className={cn(
                      'rounded-xl border px-2 py-3 text-center transition-colors',
                      finish === f.id ? 'border-brand bg-brand/10' : 'border-line hover:border-brand/50',
                    )}
                  >
                    <span className="block text-sm font-semibold">{f.label}</span>
                    <span className="mt-0.5 block text-[11px] text-soft">{f.note}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Shade ramp */}
            <div className="rounded-2xl border border-line bg-panel p-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sun className="size-4 text-brand" /> Tints & shades
              </div>
              <div className="mt-3 flex overflow-hidden rounded-xl border border-line">
                {ramp.map((s) => (
                  <div key={s.label} className="h-14 flex-1" style={{ backgroundColor: s.color }} title={`${s.label} · ${s.color}`} />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-soft">
                <span>Lighter</span>
                <span>Base</span>
                <span>Darker</span>
              </div>
            </div>

            {/* Harmony palettes */}
            <div className="rounded-2xl border border-line bg-panel p-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Droplets className="size-4 text-brand" /> Color harmony
              </div>
              <p className="mt-1 text-xs text-soft">Tap a swatch to apply it to the wall.</p>
              <div className="mt-3 space-y-2.5">
                {palettes.map((p) => (
                  <div key={p.label} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 text-xs text-mut">{p.label}</span>
                    <div className="flex flex-1 gap-1.5">
                      {p.colors.map((hex) => (
                        <button
                          key={hex}
                          onClick={() => applyHarmony(hex)}
                          className="h-8 flex-1 rounded-md border border-line transition-transform hover:scale-105"
                          style={{ backgroundColor: hex }}
                          title={hex}
                          aria-label={`Apply ${hex}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={surprise}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-elev py-3 text-sm font-semibold transition-colors hover:bg-white/5"
            >
              <Dice5 className="size-4 text-brand" /> Surprise me
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
