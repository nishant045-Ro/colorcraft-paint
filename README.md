# ColorCraft Paint

A modern, interactive marketing website for a paint company. Explore dozens of curated paint colors, preview them on a virtual room in day or evening light, generate harmonious palettes, and estimate exactly how much paint your space needs.

Built with React 19, Vite, Tailwind CSS 4, Framer Motion and a custom Three.js / WebGL shader background.

## Features

- **Reactive WebGL background** — a flowing liquid-paint animation written as a custom GLSL fragment shader that re-tints itself to match the currently selected color.
- **Paint-splash cursor trail** — a canvas overlay that paints fading color blobs behind the pointer (disabled on touch devices and for reduced-motion users).
- **Color catalog** — 48 curated colors across 6 categories (Warm, Cool, Neutral, Bold, Pastel, Earth). Search by name, hex code or color family.
- **Virtual room try-on** — preview any color on a stylized room with selectable finish (Matte / Satin / Gloss) and a Day / Evening lighting toggle.
- **Color harmony** — automatically generates complementary, analogous, triadic and monochromatic palettes from the selected color.
- **Tints and shades ramp** — lighter and darker variants of the chosen color.
- **Paint calculator** — estimates paintable area, liters required, recommended pack sizes (20L / 4L / 1L) and approximate cost.
- **Testimonials marquee** — infinite opposite-direction scrolling review rows.
- **FAQ accordion**, **contact / booking form** and a reusable **toast notification** system.
- **Responsive and accessible** — mobile menu, keyboard-friendly controls and reduced-motion support.

## Tech Stack

| Area | Library / Tool | Version |
| --- | --- | --- |
| Language | JavaScript (ESM + JSX) | — |
| Shaders | GLSL | — |
| UI | React | 19.2.8 |
| DOM Renderer | React DOM | 19.2.8 |
| Build Tool | Vite | ^8.3.0 |
| React Plugin | @vitejs/plugin-react | ^6.1.1 |
| Styling | Tailwind CSS | ^4.3.3 |
| Tailwind Vite Plugin | @tailwindcss/vite | ^4.3.3 |
| Animation | Framer Motion | ^13.4.0 |
| 3D / WebGL | Three.js | ^0.186.0 |
| 3D for React | @react-three/fiber | ^9.7.0 |
| Icons | lucide-react | ^1.47.0 |
| Linting | oxlint | ^1.81.0 |

## Getting Started

Requirements: Node.js 18+ and npm.

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# create an optimized production build in dist/
npm run build

# preview the production build locally
npm run preview

# run the linter
npm run lint
```

## Project Structure

```
paint-site/
├── index.html                 # App shell, fonts, meta tags
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite + React + Tailwind config
├── public/
│   └── paint.svg              # Favicon
└── src/
    ├── main.jsx               # React entry point
    ├── index.css              # Tailwind theme, keyframes, global styles
    ├── App.jsx                # Layout & global state
    ├── components/
    │   ├── PaintBackground.jsx    # WebGL fluid shader background
    │   ├── CursorTrail.jsx        # Paint-splash cursor effect
    │   ├── Navbar.jsx             # Sticky nav + scroll progress
    │   ├── Hero.jsx               # Hero + rotating words
    │   ├── ColorExplorer.jsx      # Searchable color catalog
    │   ├── RoomPainter.jsx        # Virtual try-on, finishes, harmony
    │   ├── PaintCalculator.jsx    # Paint quantity & cost estimator
    │   ├── Testimonials.jsx       # Scrolling review marquee
    │   ├── Services.jsx           # Service cards
    │   ├── FAQ.jsx                # Accordion
    │   ├── Contact.jsx            # Booking form
    │   ├── Footer.jsx             # Footer
    │   ├── SectionHeading.jsx     # Reusable heading
    │   └── Toast.jsx              # Notification system
    ├── data/
    │   └── colors.js          # 48 paint colors, categories, finishes
    └── utils/
        └── helpers.js         # Color math, clipboard, class helper
```

## Design System

| Token | Value | Usage |
| --- | --- | --- |
| Background | `#0c0f14` | Base dark surface |
| Brand | `#f59e0b` to `#ef4444` | Primary gradient (amber to red) |
| Accents | `#3b82f6`, `#8b5cf6` | Blue and violet highlights |
| Text | `#f4f7fb` / `#9aa7b8` | Primary and muted text |
| Display font | Space Grotesk | Headings |
| Body font | Inter | Body text |

## Deployment

The project builds to static files in `dist/`, so it can be hosted on any static provider such as GitHub Pages, Netlify or Vercel.

## Notes

All colors, prices, phone numbers and testimonials are sample data for demonstration and should be replaced with real business information.

## Inspiration

Feature patterns were informed by leading paint-brand tools:

- Sherwin-Williams ColorSnap Visualizer — color try-on and day/evening lighting.
- Behr Color Visualizer — paint quantity estimation and sheen selection.
- PPG Paints Visualizer — curated palettes and color-family browsing.

## License

MIT
