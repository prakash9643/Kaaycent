import { Product, HeroSlide } from "./types";

export const PRODUCTS: Product[] = [
// ... (omitted for brevity in prompt, but I will provide the full replacement in the tool call)
  {
    id: "8772620026038",
    name: "Nomad Obsidian",
    category: "perfume",
    price: 1599,
    rating: 4.8,
    image: "/perfumes/Nomad Obsidian.png",
    description: "Bold. Smooth. Unforgettable.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_VARIANT_ID_FOR_PRODUCT_8772620026038"
  },
  {
    id: "8744638054582",
    name: "Clear Instinct",
    category: "perfume",
    price: 1899,
    rating: 4.9,
    image: "/perfumes/Clear Instinct.png",
    description: "Crisp, clean, and effortlessly natural.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_VARIANT_ID_FOR_PRODUCT_8744638054582"
  },
  {
    id: "8744637923510",
    name: "Pink Prive",
    category: "perfume",
    price: 2199,
    rating: 4.7,
    image: "/perfumes/Pink Prive.png",
    description: "A private garden of blushing roses and delicate sweetness.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_VARIANT_ID_FOR_PRODUCT_8744637923510"
  },
  {
    id: "8744637366454",
    name: "Nocturne Bliss",
    category: "perfume",
    price: 1299,
    rating: 4.6,
    image: "/perfumes/Nocturne Bliss.png",
    description: "A sophisticated blend of botanical notes.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_VARIANT_ID_FOR_PRODUCT_8744637366454"
  },
  {
    id: "8391231144118",
    name: "Inner Creed",
    category: "perfume",
    price: 2499,
    rating: 4.9,
    image: "/perfumes/Inner Creed.png",
    description: "Find your strength within this majestic woody aroma.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_VARIANT_ID_FOR_PRODUCT_8391231144118"
  },
  {
    id: "6",
    name: "Chandan Aura",
    category: "aura",
    price: 599,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1616948055677-83a37803e7f4?auto=format&fit=crop&q=80&w=800",
    description: "The essence of traditional sandalwood.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_ACTUAL_ID_6"
  },
  {
    id: "7",
    name: "Ocean Whisper",
    category: "candle",
    price: 899,
    rating: 4.8,
    image: "/candles/ocean-whisper.jpeg",
    description: "Breezy oceanic scent for refreshing moments.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_ACTUAL_ID_7"
  },
  {
    id: "11",
    name: "Orange Blossom Glow",
    category: "candle",
    price: 949,
    rating: 4.9,
    image: "/candles/orange-blossom-glow.jpeg",
    description: "Warm citrus notes with a golden floral touch.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_ACTUAL_ID_11"
  },
  {
    id: "12",
    name: "Caramel Drizzle Delight",
    category: "candle",
    price: 999,
    rating: 4.7,
    image: "/candles/caramel-drizzle-delight.jpeg",
    description: "Sweet and decadent caramel aroma.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_ACTUAL_ID_12"
  },
  {
    id: "13",
    name: "Heart Melt Roses",
    category: "candle",
    price: 1099,
    rating: 4.9,
    image: "/candles/heart-melt-roses.jpeg",
    description: "Romantic rose petals for a loving atmosphere.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_ACTUAL_ID_13"
  },
  {
    id: "18",
    name: "Parijat Heritage",
    category: "aura",
    price: 499,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1612144431180-2dca88a387fa?auto=format&fit=crop&q=80&w=800",
    description: "Elegant floral notes of night-blooming jasmine.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_ACTUAL_ID_18"
  },
  {
    id: "19",
    name: "Marigold Divine",
    category: "aura",
    price: 399,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1614088685112-0a149bfe38a6?auto=format&fit=crop&q=80&w=800",
    description: "Vibrant and sacred marigold essence.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_ACTUAL_ID_19"
  },
  {
    id: "20",
    name: "Havan Bliss",
    category: "aura",
    price: 549,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1611068813580-b07ef920964b?auto=format&fit=crop&q=80&w=800",
    description: "The purifying aroma of ancient fire rituals.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_ACTUAL_ID_20"
  },
  {
    id: "21",
    name: "Rose Garden",
    category: "aura",
    price: 449,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800",
    description: "Delicate and refreshing morning rose garden.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_ACTUAL_ID_21"
  },
  {
    id: "22",
    name: "Blooming Jasmine",
    category: "aura",
    price: 899,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1615485240354-946467364b73?auto=format&fit=crop&q=80&w=800",
    description: "A rich, floral tribute to blooming jasmine.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_ACTUAL_ID_22"
  },
  {
    id: "23",
    name: "Kesar Bloom",
    category: "aura",
    price: 1299,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1612144431180-2dca88a387fa?auto=format&fit=crop&q=80&w=800",
    description: "Luxurious saffron saffron for a royal atmosphere.",
    shopifyVariantId: "gid://shopify/ProductVariant/REPLACE_WITH_ACTUAL_ID_23"
  }
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "Nomad Obsidian",
    subtitle: "The Kaycent Essence",
    tagline: "Bold. Smooth. Unforgettable.",
    image: "/banner-1.png",
    mobileImage: "/hero/perfume-hero-mobile.png",
    bgColor: "bg-orange-950/80"
  },
  {
    id: 2,
    title: "Artisanal Candles",
    subtitle: "The Aroma Collection",
    tagline: "Calm, tranquility, and soft floral notes.",
    image: "/banner-2.png",
    mobileImage: "/hero/candle-hero-mobile.png",
    bgColor: "bg-teal-950/80"
  }
];

export const REVIEWS = [
  {
    id: "1",
    author: "Elena Voce",
    text: "The Amber Oud concentration is unparalleled. It lingers like a forgotten dream, sophisticated and presence-defining.",
    rating: 5,
    subtitle: "Fashion Photographer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "2",
    author: "Marcello Russo",
    text: "Kaycent doesn't just sell scents; they curate atmospheres. The 'Casual Bloom' transforms my studio into a botanical sanctuary.",
    rating: 5,
    subtitle: "Interior Architect",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "3",
    author: "Sasha Grey",
    text: "Minimalist bottles, maximalist impact. The attention to detail in the packaging alone speaks volumes of the quality inside.",
    rating: 4,
    subtitle: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "4",
    author: "Julian Chen",
    text: "The Sandalwood Silk candle has a slow, meaningful burn that I've never found elsewhere. Truly artisanal light.",
    rating: 5,
    subtitle: "Wellness Coach",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "The Art of Scent Layering: A Guide to Creating Your Signature Aroma",
    excerpt: "Discover how to blend different notes to create a fragrance that is uniquely yours. From base notes to top notes, we cover it all.",
    image: "https://images.unsplash.com/photo-1595433707802-6806f3fc52b0?auto=format&fit=crop&q=80&w=800",
    date: "May 15, 2024",
    author: "Elena Voce",
    category: "Fragrance Guide"
  },
  {
    id: 2,
    title: "Sustainable Luxury: Why Hand-Poured Soy Wax Matters",
    excerpt: "At Kaycent, we believe in beauty without compromise. Learn about our commitment to eco-friendly ingredients and ethical sourcing.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800",
    date: "May 10, 2024",
    author: "Marcello Russo",
    category: "Craftsmanship"
  },
  {
    id: 3,
    title: "Meditation and Fragrance: Enhancing Your Sacred Space",
    excerpt: "How the right aroma can deepen your mindfulness practice and bring a sense of divine tranquility to your daily rituals.",
    image: "https://images.unsplash.com/photo-1545202989-2244453dff91?auto=format&fit=crop&q=80&w=800",
    date: "May 05, 2024",
    author: "Julian Chen",
    category: "Wellness"
  },
  {
    id: 4,
    title: "The Ritual of Home Fragrance",
    excerpt: "Transform your living space into a sanctuary of peace with our expert tips on candle placement and room spray techniques.",
    image: "https://images.unsplash.com/photo-1596433845115-f85108bb6b35?auto=format&fit=crop&q=80&w=800",
    date: "April 28, 2024",
    author: "Sofia Loren",
    category: "Lifestyle"
  },
  {
    id: 5,
    title: "Understanding Fragrance Families",
    excerpt: "From Woody to Floral, Oriental to Fresh. A deep dive into the four main fragrance families and what they say about your personality.",
    image: "https://images.unsplash.com/photo-1595433707802-6806f3fc52b0?auto=format&fit=crop&q=80&w=800",
    date: "April 20, 2024",
    author: "Elena Voce",
    category: "Education"
  }
];
