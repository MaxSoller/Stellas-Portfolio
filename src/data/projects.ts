export interface Project {
  id: string
  title: string
  description: string
  details: string[]
  images: string[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'shiro',
    title: 'Shiro',
    description:
      'En pappershållare som kombinerar funktion och form — stilren, minimalistisk design som smälter in i alla miljöer.',
    details: [
      'Shiro är en pappershållare som kombinerar funktion och form — en stilren, minimalistisk design som enklare smälter in i alla miljöer utan att kompromissa användbarheten.',
      '<strong>Material:</strong> 3 och 4 mm ståltråd',
    ],
    images: ['images/shiro.png', 'images/Shiro2.png'],
    featured: true,
  },
  {
    id: 'sustainable-packaging',
    title: 'Sustainable Packaging System',
    description:
      'A biodegradable packaging solution for e-commerce, reducing waste while protecting products in transit.',
    details: [
      'This packaging system replaces expanded polystyrene with a molded-pulp alternative made from agricultural waste. The interlocking tray design eliminates the need for tape or adhesives, and the entire package is home-compostable within 90 days.',
      '<strong>Materials:</strong> Molded sugarcane bagasse pulp, soy-based ink printing',
      '<strong>Role:</strong> Designer — structural design, material research, drop-test validation',
      '<strong>Impact:</strong> 60% reduction in packaging weight, fully compostable',
    ],
    images: [],
  },
  {
    id: 'ergonomic-kitchen-tools',
    title: 'Ergonomic Kitchen Tools',
    description:
      'A set of kitchen utensils designed for comfort and accessibility, tested with diverse user groups.',
    details: [
      'This five-piece utensil set was designed in collaboration with occupational therapists to address grip fatigue and limited dexterity. Each handle features a soft-touch overmold with subtle finger guides, and the balanced weight distribution reduces wrist strain during extended use.',
      '<strong>Materials:</strong> Stainless steel heads, glass-reinforced nylon handles, TPE overmold',
      '<strong>Role:</strong> Lead designer — user research, ergonomic testing, production liaison',
      '<strong>Testing:</strong> Validated with 40+ participants across age and ability groups',
    ],
    images: [],
  },
  {
    id: 'urban-bench',
    title: 'Urban Bench Collection',
    description:
      'Public seating designed for urban environments, balancing durability, aesthetics, and community interaction.',
    details: [
      'The Urban Bench Collection reimagines public seating as a social catalyst. The curved, segmented form invites both individual rest and group conversation. A powder-coated steel frame provides structural longevity, while FSC-certified hardwood slats add warmth and comfort.',
      '<strong>Materials:</strong> Powder-coated galvanized steel, FSC-certified ipe wood slats',
      '<strong>Role:</strong> Designer — concept, scale models, municipal review presentations',
      '<strong>Installation:</strong> Piloted in two city parks with positive community feedback',
    ],
    images: [],
  },
  {
    id: 'air-purifier',
    title: 'Portable Air Purifier',
    description:
      'A compact, rechargeable air purifier for personal use, with a minimal footprint and quiet operation.',
    details: [
      'Designed for desk, bedside, or travel use, this personal air purifier packs a true HEPA filter into a cylinder barely larger than a coffee cup. A brushless DC motor keeps noise below 28 dB on the lowest setting, and the USB-C rechargeable battery lasts up to 8 hours.',
      '<strong>Materials:</strong> Recycled ABS shell, HEPA H13 filter, brushless DC motor',
      '<strong>Role:</strong> Lead designer — industrial design, CMF selection, DFM optimization',
      '<strong>Features:</strong> 3 fan speeds, filter-change indicator LED, magnetic top cap',
    ],
    images: [],
  },
  {
    id: 'learning-toy',
    title: "Children's Learning Toy",
    description:
      'An interactive toy that teaches spatial reasoning through play, made from safe, recycled materials.',
    details: [
      'This modular block set uses interlocking geometry to teach children ages 3–7 about shapes, symmetry, and spatial relationships. Each block is made from recycled HDPE with rounded edges and non-toxic pigments. The set includes a visual guide with progressive challenges.',
      '<strong>Materials:</strong> Recycled HDPE, non-toxic water-based pigments',
      '<strong>Role:</strong> Designer — toy design, safety compliance (ASTM F963), color studies',
      '<strong>Testing:</strong> Play-tested with 25 children across three age groups',
    ],
    images: [],
  },
]
