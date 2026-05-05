
export interface Product {
  id: string;
  shopifyVariantId?: string; // Added for Shopify
  name: string;
  category: "perfume" | "candle" | "aura";
  price: number;
  rating: number;
  image: string;
  images?: string[];
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  avatar?: string;
  role: "user" | "admin";
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  mobileImage?: string;
  bgColor: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
