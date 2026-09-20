import { PaintBucket } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-display font-bold">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-ink">
            <PaintBucket className="size-4" />
          </span>
          Color<span className="bg-gradient-to-r from-brand to-brand-2 bg-clip-text text-transparent">Craft</span>
        </div>
        <p className="text-sm text-soft">© 2026 ColorCraft Paint Co. All rights reserved.</p>
      </div>
    </footer>
  )
}
