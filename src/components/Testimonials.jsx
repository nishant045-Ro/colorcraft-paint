import { Star } from 'lucide-react'
import SectionHeading from './SectionHeading'

const REVIEWS = [
  { name: 'Ramesh Shrestha', role: 'Homeowner, Lalitpur', text: 'The virtual preview saved us from a costly mistake. We tried 6 shades before choosing — the final walls look exactly like the screen.', color: '#8b5cf6' },
  { name: 'Sunita Gurung', role: 'Interior Designer', text: 'I use ColorCraft with every client now. The harmony palettes and tint ramp make presenting options incredibly fast.', color: '#06b6d4' },
  { name: 'Amit Karki', role: 'Restaurant Owner', text: 'Booked a free visit and got a full quote the same day. Crew was clean, fast, and the finish is flawless.', color: '#f97316' },
  { name: 'Priya Maharjan', role: 'Apartment Owner', text: 'Loved being able to see day and evening lighting before committing. It genuinely took the guesswork out.', color: '#ec4899' },
  { name: 'Bikash Thapa', role: 'Property Developer', text: 'We painted 12 units through ColorCraft. Consistent quality, honest pricing, and zero delays.', color: '#10b981' },
  { name: 'Anjali Rai', role: 'New Homeowner', text: 'The paint calculator told us exactly how many litres to buy. Not a single extra can wasted.', color: '#3b82f6' },
]

function ReviewCard({ review }) {
  return (
    <article className="w-80 shrink-0 rounded-2xl border border-line bg-panel/80 p-6 backdrop-blur-sm">
      <div className="flex gap-0.5 text-brand">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" />
        ))}
      </div>
      <p className="mt-4 text-sm text-mut">“{review.text}”</p>
      <div className="mt-5 flex items-center gap-3">
        <span
          className="grid size-10 place-items-center rounded-full font-semibold text-white"
          style={{ backgroundColor: review.color }}
        >
          {review.name.charAt(0)}
        </span>
        <div>
          <h4 className="text-sm font-semibold">{review.name}</h4>
          <p className="text-xs text-soft">{review.role}</p>
        </div>
      </div>
    </article>
  )
}

function MarqueeRow({ items, reverse, duration }) {
  const track = [...items, ...items]
  return (
    <div className="overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex w-max gap-5 hover:[animation-play-state:paused]"
        style={{ animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${duration}s linear infinite` }}
      >
        {track.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by homes and designers"
          description="Over 1,200 projects painted with confidence — here's what our customers say."
          align="center"
        />
      </div>
      <div className="mt-12">
        <MarqueeRow items={REVIEWS} duration={46} />
        <MarqueeRow items={[...REVIEWS].reverse()} reverse duration={54} />
      </div>
    </section>
  )
}
