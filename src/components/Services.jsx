import { motion } from 'framer-motion'
import { Home, Building2, ShieldCheck, Brush } from 'lucide-react'

const SERVICES = [
  { icon: Home, title: 'Interior Painting', text: 'Living rooms, bedrooms and ceilings with smooth, long-lasting finishes.' },
  { icon: Building2, title: 'Exterior Painting', text: 'Weatherproof coatings that protect and beautify the outside of your home.' },
  { icon: ShieldCheck, title: 'Waterproofing', text: 'Leak-proof, moisture-resistant solutions for walls, roofs and bathrooms.' },
  { icon: Brush, title: 'Wall Textures', text: 'Decorative textures and designer finishes for a premium look.' },
]

export default function Services() {
  return (
    <section id="services" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">Our Services</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Professional painting, done right</h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-brand/50"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand/15 to-brand-2/10 text-brand">
                <s.icon className="size-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-mut">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
