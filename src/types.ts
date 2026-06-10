/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'chocolate' | 'fruity' | 'classic' | 'coffee';
  rating: number;
  calories: number;
  allergens: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: string; // unique for cart item (including custom options)
  product: Product;
  quantity: number;
  size: 'regular' | 'large';
  noSugar: boolean;
  extraWhippedCream: boolean;
  customRequests?: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'product' | 'ambiance' | 'event';
}

export interface SpecialOffer {
  id: string;
  title: string;
  tagline: string;
  description: string;
  code?: string;
  badge: string;
  discountType: 'percentage' | 'freebie' | 'flat';
  discountValue?: number;
  bgGradient: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}
