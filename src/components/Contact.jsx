import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck, Mail, MapPin, Phone } from 'lucide-react'
import { useToast } from './Toast'

export default function Contact() {
  const { toast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    toast(`Thanks ${form.name || 'there'}! We'll call you within 24 hours.`, 'success')
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  const inputClass =
    'w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-fg placeholder:text-soft focus:border-brand/60 focus:outline-none'

  return (
    <section id="contact" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand-2 to-accent-2 p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="text-white"
            >
              <span className="text-sm font-semibold tracking-[0.2em] uppercase opacity-90">Get in touch</span>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Book a free site visit</h2>
              <p className="mt-4 max-w-md text-white/90">
                Tell us about your space and we'll bring color samples, give expert advice, and send a transparent quote.
              </p>

              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="size-5 opacity-90" /> 980-0000000
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-5 opacity-90" /> hello@colorcraft.example
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="size-5 opacity-90" /> Kathmandu, Nepal
                </li>
                <li className="flex items-center gap-3">
                  <CalendarCheck className="size-5 opacity-90" /> Mon–Sat · 9am – 6pm
                </li>
              </ul>
            </motion.div>

            <motion.form
              onSubmit={onSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-ink/95 p-6 shadow-2xl"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input required name="name" value={form.name} onChange={onChange} placeholder="Your name" className={inputClass} />
                <input required type="email" name="email" value={form.email} onChange={onChange} placeholder="Email address" className={inputClass} />
              </div>
              <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone number" className={`${inputClass} mt-4`} />
              <textarea
                required
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Tell us about your project — rooms, size, colors you like..."
                className={`${inputClass} mt-4 min-h-32 resize-y`}
              />
              <button
                type="submit"
                className="mt-4 w-full rounded-xl bg-gradient-to-br from-brand to-brand-2 py-3.5 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Send Request
              </button>
              <p className="mt-3 text-center text-xs text-soft">No spam. We reply within 24 hours.</p>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  )
}
