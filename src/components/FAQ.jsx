import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import SectionHeading from './SectionHeading'

const FAQS = [
  {
    q: 'How much paint do I need for my room?',
    a: 'Use our paint calculator above — enter your wall dimensions, number of coats and openings, and it estimates litres and cost instantly. As a rule of thumb, 1 litre covers about 12 m² in a single coat.',
  },
  {
    q: 'Can I really preview colors before buying?',
    a: 'Yes. Our virtual try-on shows any shade on a room in both day and evening light. You can also order physical color chips to confirm before purchase.',
  },
  {
    q: 'Do you provide painting services or only paint?',
    a: 'We do both. Buy paint, or book a free site visit and our professional crew will handle preparation, priming and finishing end to end.',
  },
  {
    q: 'How long does a typical room take to paint?',
    a: 'A standard bedroom takes 1–2 days including drying time between coats. Larger or textured projects are scheduled with a clear timeline up front.',
  },
  {
    q: 'Is the paint safe for kids and pets?',
    a: 'We use low-VOC, water-based paints that are safe once dry. Just ask our team and we will recommend the right child-safe finish for your home.',
  },
]

function Item({ faq, open, onToggle }) {
  return (
    <div className="border-b border-line">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base font-semibold sm:text-lg">{faq.q}</span>
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-brand">
          {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-mut">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="Everything customers usually ask before picking up a brush."
          align="center"
        />
        <div className="mt-10 rounded-2xl border border-line bg-panel/70 px-6 backdrop-blur-sm">
          {FAQS.map((faq, i) => (
            <Item key={faq.q} faq={faq} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
