import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleCheck, CircleAlert, Info, X } from 'lucide-react'
import { cn } from '../utils/helpers'

const ToastContext = createContext(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

const ICONS = { success: CircleCheck, error: CircleAlert, info: Info }

const STYLES = {
  success: { ring: 'border-emerald-400/40', icon: 'text-emerald-400' },
  error: { ring: 'border-rose-400/40', icon: 'text-rose-400' },
  info: { ring: 'border-amber-400/40', icon: 'text-amber-400' },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const toast = useCallback(
    (message, type = 'success', options = {}) => {
      const id = ++idRef.current
      setToasts((t) => [...t.slice(-3), { id, message, type }])
      if (options.duration !== 0) {
        setTimeout(() => dismiss(id), options.duration ?? 3500)
      }
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed right-4 bottom-6 z-[110] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = ICONS[t.type] ?? Info
            const s = STYLES[t.type] ?? STYLES.info
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className={cn(
                  'pointer-events-auto flex items-start gap-3 rounded-xl border bg-panel/90 p-4 shadow-2xl backdrop-blur-xl',
                  s.ring,
                )}
                role="status"
              >
                <Icon className={cn('mt-0.5 size-5 shrink-0', s.icon)} />
                <p className="flex-1 text-sm leading-snug text-fg">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-soft transition-colors hover:text-fg"
                  aria-label="Dismiss notification"
                >
                  <X className="size-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
