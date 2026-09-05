export type Product = {
  id: string
  name: string
  brand: string
  model: string
  price: string
  color: string
  thickness: string
  core: string
  weight: string
  shape: string
  surface: string
  grip: string
  image?: string
  images?: string[]
  features: string[]
  inStock?: boolean
  stock?: 'In Stock' | 'Out of Stock'
  bestSeller?: boolean
  createdAt?: number
}

export const starterProducts: Product[] = [
  { id: '1', name: 'Loco EVA Plus', brand: 'Bread & Butter', model: 'Carbon Fiber Paddle', price: '₱2,500', color: 'Blue / Black', thickness: '16mm', core: 'EVA Foam Core', weight: '7.8–8.2 oz', shape: 'Elongated', surface: 'T700 Raw Carbon Fiber', grip: '4.25 in', image: '/images/paddle-carbon-blue.png', features: ['Lightweight', 'Durable', 'High Quality'], inStock: true },
  { id: '2', name: 'Loco EVA Plus', brand: 'Bread & Butter', model: 'Carbon Fiber Paddle', price: '₱2,500', color: 'Red / Black', thickness: '16mm', core: 'EVA Foam Core', weight: '7.8–8.2 oz', shape: 'Elongated', surface: 'T700 Raw Carbon Fiber', grip: '4.25 in', image: '/images/paddle-carbon-red.png', features: ['Powerful', 'Spin Ready', 'Edge Guard'], inStock: true },
  { id: '3', name: 'J2K Pro', brand: 'Joola', model: 'Raw Carbon Paddle', price: '₱3,200', color: 'Carbon / Sand', thickness: '16mm', core: 'Polypropylene Honeycomb', weight: '7.9 oz', shape: 'Widebody', surface: 'Carbon Friction Surface', grip: '4.25 in', image: '/images/paddle-raw-carbon.png', features: ['Pro Control', 'Raw Carbon', 'Comfort Grip'], inStock: true },
  { id: '4', name: 'Hyperion CFS', brand: 'Joola', model: 'Performance Paddle', price: '₱3,500', color: 'Forest Green / Black', thickness: '16mm', core: 'Reactive Polymer', weight: '8.0 oz', shape: 'Elongated', surface: 'Carbon-Flex5 Textured', grip: '4.25 in', image: '/images/paddle-green.png', features: ['All-Court', 'Balanced', 'Tournament Ready'], inStock: true },
  { id: '5', name: 'Era Power', brand: 'ProXR', model: 'Premium Paddle', price: '₱2,800', color: 'Purple / Black', thickness: '14mm', core: 'Polypropylene Core', weight: '7.6 oz', shape: 'Hybrid', surface: 'Carbon Texture', grip: '4.125 in', image: '/images/paddle-purple.png', features: ['Fast Hands', 'Lightweight', 'Premium Feel'], inStock: true },
  { id: '6', name: 'Nova Control', brand: 'Selkirk', model: 'Performance Paddle', price: '₱4,100', color: 'White / Navy', thickness: '16mm', core: 'X7 Thikset Honeycomb', weight: '8.1 oz', shape: 'Widebody', surface: 'Raw Carbon Fiber', grip: '4.25 in', image: '/images/paddle-white.png', features: ['Maximum Control', 'Vibration Dampening', 'Premium Build'], inStock: true },
]