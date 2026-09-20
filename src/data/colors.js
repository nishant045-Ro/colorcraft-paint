export const CATEGORIES = [
  { id: 'all', label: 'All Colors' },
  { id: 'warm', label: 'Warm' },
  { id: 'cool', label: 'Cool' },
  { id: 'neutral', label: 'Neutral' },
  { id: 'bold', label: 'Bold' },
  { id: 'pastel', label: 'Pastel' },
  { id: 'earth', label: 'Earth' },
]

export const FINISHES = [
  { id: 'matte', label: 'Matte', note: 'Soft, non-reflective' },
  { id: 'satin', label: 'Satin', note: 'Gentle, washable sheen' },
  { id: 'gloss', label: 'Gloss', note: 'Bright, reflective' },
]

export const COLORS = [
  // Warm
  { name: 'Sunburst Amber', hex: '#f59e0b', category: 'warm', family: 'Yellow' },
  { name: 'Golden Hour', hex: '#fbbf24', category: 'warm', family: 'Yellow' },
  { name: 'Mango Tango', hex: '#f97316', category: 'warm', family: 'Orange' },
  { name: 'Apricot Haze', hex: '#fdba74', category: 'warm', family: 'Orange' },
  { name: 'Terracotta Clay', hex: '#d97757', category: 'warm', family: 'Red' },
  { name: 'Hot Coral', hex: '#f43f5e', category: 'warm', family: 'Red' },
  { name: 'Crimson Pop', hex: '#dc2626', category: 'warm', family: 'Red' },
  { name: 'Rustic Brick', hex: '#b45309', category: 'warm', family: 'Orange' },

  // Cool
  { name: 'Ocean Mist', hex: '#0ea5e9', category: 'cool', family: 'Blue' },
  { name: 'Arctic Sky', hex: '#7dd3fc', category: 'cool', family: 'Blue' },
  { name: 'Cobalt Glow', hex: '#2563eb', category: 'cool', family: 'Blue' },
  { name: 'Midnight Indigo', hex: '#4338ca', category: 'cool', family: 'Blue' },
  { name: 'Arctic Teal', hex: '#14b8a6', category: 'cool', family: 'Green' },
  { name: 'Emerald Grove', hex: '#10b981', category: 'cool', family: 'Green' },
  { name: 'Frosted Mint', hex: '#6ee7b7', category: 'cool', family: 'Green' },
  { name: 'Lavender Fog', hex: '#a78bfa', category: 'cool', family: 'Purple' },

  // Neutral
  { name: 'Soft Ivory', hex: '#f5f5f0', category: 'neutral', family: 'White' },
  { name: 'Pearl White', hex: '#f8f8f6', category: 'neutral', family: 'White' },
  { name: 'Warm Greige', hex: '#c9bdb0', category: 'neutral', family: 'Beige' },
  { name: 'Stone Beige', hex: '#d6c6b0', category: 'neutral', family: 'Beige' },
  { name: 'Taupe Sand', hex: '#b8a99a', category: 'neutral', family: 'Beige' },
  { name: 'Cloud Grey', hex: '#cbd5e1', category: 'neutral', family: 'Grey' },
  { name: 'Charcoal Mist', hex: '#4b5563', category: 'neutral', family: 'Grey' },
  { name: 'Graphite', hex: '#374151', category: 'neutral', family: 'Grey' },

  // Bold
  { name: 'Royal Indigo', hex: '#4f46e5', category: 'bold', family: 'Blue' },
  { name: 'Plum Wine', hex: '#7e1d6f', category: 'bold', family: 'Purple' },
  { name: 'Magenta Fizz', hex: '#db2777', category: 'bold', family: 'Pink' },
  { name: 'Forest Deeper', hex: '#166534', category: 'bold', family: 'Green' },
  { name: 'Leaf Green', hex: '#16a34a', category: 'bold', family: 'Green' },
  { name: 'Deep Slate', hex: '#334155', category: 'bold', family: 'Grey' },
  { name: 'Aubergine', hex: '#5b2333', category: 'bold', family: 'Red' },
  { name: 'Sapphire Night', hex: '#1e3a8a', category: 'bold', family: 'Blue' },

  // Pastel
  { name: 'Blush Petal', hex: '#fbcfe8', category: 'pastel', family: 'Pink' },
  { name: 'Rose Powder', hex: '#fecdd3', category: 'pastel', family: 'Pink' },
  { name: 'Peach Cream', hex: '#fed7aa', category: 'pastel', family: 'Orange' },
  { name: 'Butter Soft', hex: '#fef9c3', category: 'pastel', family: 'Yellow' },
  { name: 'Baby Blue', hex: '#bfdbfe', category: 'pastel', family: 'Blue' },
  { name: 'Sky Fluff', hex: '#e0f2fe', category: 'pastel', family: 'Blue' },
  { name: 'Mint Breeze', hex: '#a7f3d0', category: 'pastel', family: 'Green' },
  { name: 'Lilac Whisper', hex: '#e9d5ff', category: 'pastel', family: 'Purple' },

  // Earth
  { name: 'Sienna Brown', hex: '#a0522d', category: 'earth', family: 'Brown' },
  { name: 'Caramel Silk', hex: '#c17f3f', category: 'earth', family: 'Brown' },
  { name: 'Olive Branch', hex: '#6b7f3a', category: 'earth', family: 'Green' },
  { name: 'Moss Stone', hex: '#7c8a5a', category: 'earth', family: 'Green' },
  { name: 'Clay Beige', hex: '#bda58a', category: 'earth', family: 'Beige' },
  { name: 'Umber Deep', hex: '#5c4033', category: 'earth', family: 'Brown' },
  { name: 'Desert Sage', hex: '#b8b99a', category: 'earth', family: 'Green' },
  { name: 'Cinnamon', hex: '#8b4a2b', category: 'earth', family: 'Brown' },
]

export const DEFAULT_COLOR = COLORS[0]
