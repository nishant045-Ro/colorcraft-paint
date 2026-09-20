export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  const num = parseInt(full, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

export function rgbToHex(r, g, b) {
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)))
  return '#' + [clamp(r), clamp(g), clamp(b)].map((v) => v.toString(16).padStart(2, '0')).join('')
}

export function mix(hex, ratio, target) {
  const a = hexToRgb(hex)
  const b = target === 'white' ? { r: 255, g: 255, b: 255 } : { r: 0, g: 0, b: 0 }
  return rgbToHex(a.r + (b.r - a.r) * ratio, a.g + (b.g - a.g) * ratio, a.b + (b.b - a.b) * ratio)
}

export function getLuminance(hex) {
  const { r, g, b } = hexToRgb(hex)
  const [rs, gs, bs] = [r, g, b].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

export function isLight(hex) {
  return getLuminance(hex) > 0.55
}

export function copyText(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text)
  }
  return Promise.reject(new Error('clipboard unavailable'))
}

export function shadeRamp(hex) {
  return [
    { label: '25% White', color: mix(hex, 0.75, 'white') },
    { label: '50% White', color: mix(hex, 0.5, 'white') },
    { label: 'Base', color: hex },
    { label: '25% Black', color: mix(hex, 0.25, 'black') },
    { label: '50% Black', color: mix(hex, 0.5, 'black') },
  ]
}

export function hexToHsl(hex) {
  const { r, g, b } = hexToRgb(hex)
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  const d = max - min
  let h = 0
  let s = 0
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0)
    else if (max === gn) h = (bn - rn) / d + 2
    else h = (rn - gn) / d + 4
    h /= 6
  }
  return { h: h * 360, s: s * 100, l: l * 100 }
}

export function hslToHex(h, s, l) {
  const hue = ((h % 360) + 360) % 360
  const sat = Math.max(0, Math.min(100, s)) / 100
  const lig = Math.max(0, Math.min(100, l)) / 100
  const c = (1 - Math.abs(2 * lig - 1)) * sat
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = lig - c / 2
  let r = 0
  let g = 0
  let b = 0
  if (hue < 60) [r, g] = [c, x]
  else if (hue < 120) [r, g] = [x, c]
  else if (hue < 180) [g, b] = [c, x]
  else if (hue < 240) [g, b] = [x, c]
  else if (hue < 300) [r, b] = [x, c]
  else [r, b] = [c, x]
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255)
}

export function rotateHue(hex, deg) {
  const { h, s, l } = hexToHsl(hex)
  return hslToHex(h + deg, s, l)
}

export function adjustLightness(hex, delta) {
  const { h, s, l } = hexToHsl(hex)
  return hslToHex(h, s, Math.max(0, Math.min(100, l + delta)))
}

export function harmony(hex) {
  return [
    { label: 'Complementary', colors: [hex, rotateHue(hex, 180)] },
    { label: 'Analogous', colors: [rotateHue(hex, -30), hex, rotateHue(hex, 30)] },
    { label: 'Triadic', colors: [hex, rotateHue(hex, 120), rotateHue(hex, 240)] },
    { label: 'Monochrome', colors: [adjustLightness(hex, 20), hex, adjustLightness(hex, -20)] },
  ]
}
