/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ExpertiseItem, Testimonial, GalleryItem, SpecialOffer, StatItem } from './types';

export const HERO_IMAGE = '/src/assets/images/thickshake_hero_1781080158261.png';

export const PRODUCTS: Product[] = [
  {
    id: 'chocolate-overload',
    name: 'Chocolate Overload Thickshake',
    description: 'Our signature artisanal chocolate thickshake infused with premium Belgian chocolate fudge, sprinkled with dark chocolate shavings, crunchy gourmet fudge brownies, and hand-whipped vanilla gold cream.',
    price: 8.49,
    image: '/src/assets/images/chocolate_shake_1781080173573.png',
    category: 'chocolate',
    rating: 4.9,
    calories: 680,
    allergens: ['Dairy', 'Gluten', 'Soy'],
    isPopular: true,
  },
  {
    id: 'oreo-blast',
    name: 'Oreo Blast Thickshake',
    description: 'An immersive cookies-and-cream sensation packed with crushed Oreo cookies, rich chocolate ganache, double cream vanilla glaze, topped with a whole crisp cookie and white chocolate flakes.',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600',
    category: 'chocolate',
    rating: 4.8,
    calories: 710,
    allergens: ['Dairy', 'Gluten', 'Soy'],
    isPopular: true,
  },
  {
    id: 'strawberry-delight',
    name: 'Strawberry Delight Thickshake',
    description: 'A luxurious creamy blend of sun-ripened organic strawberries, custom strawberry nectar coulis, folded with premium sweet cream, and finished with dehydrated strawberry shards.',
    price: 7.49,
    image: '/src/assets/images/strawberry_shake_1781080188544.png',
    category: 'fruity',
    rating: 4.7,
    calories: 520,
    allergens: ['Dairy'],
    isNew: true,
  },
  {
    id: 'mango-magic',
    name: 'Mango Magic Thickshake',
    description: 'A sunshine-filled tropical bliss made using exquisite Alphonso mango pulp, condensed cream glaze, visual mango coulis swirl, and wild forest honey drizzle.',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=600',
    category: 'fruity',
    rating: 4.9,
    calories: 550,
    allergens: ['Dairy'],
    isNew: true,
  },
  {
    id: 'vanilla-supreme',
    name: 'Vanilla Supreme Thickshake',
    description: 'Elegance in a glass. Pure Tahitian vanilla bean caviar slow-brewed into a luxurious frozen custard base, layered with whipped golden honeycomb syrup and toasted cookie crumbs.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=600',
    category: 'classic',
    rating: 4.6,
    calories: 580,
    allergens: ['Dairy'],
  },
  {
    id: 'coffee-caramel',
    name: 'Coffee Caramel Thickshake',
    description: 'A sophisticated combination of bold single-origin cold brew espresso, ribbons of buttery hot caramel, and frozen cream, finished with raw sugar crunch and dark chocolate dust.',
    price: 8.29,
    image: 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&q=80&w=600',
    category: 'coffee',
    rating: 4.9,
    calories: 630,
    allergens: ['Dairy'],
    isPopular: true,
  },
];

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    id: 'ingredients',
    title: 'Premium Ingredients',
    description: 'We source only A-grade ingredients: high-fat churned milk, organic fresh fruits, premium Belgian chocolates, and genuine Tahitian vanilla beans.',
    iconName: 'Sparkles',
  },
  {
    id: 'preparation',
    title: 'Expert Preparation',
    description: 'Our shake experts use specialized temperature-controlled blenders that freeze as they whip, ensuring a dense, ultra-thick texture zero-ice crystalline structure.',
    iconName: 'ChefHat',
  },
  {
    id: 'flavors',
    title: 'Innovative Flavors',
    description: 'From experimental botanical blends to highly complex chocolate layers, our culinary lab releases periodic limited-edition culinary creations.',
    iconName: 'Flame',
  },
  {
    id: 'satisfaction',
    title: 'Customer Satisfaction',
    description: 'We prioritize a luxury experience in every interaction. If your shake isn’t thick enough to stand a straw upright, we’ll craft you a fresh one for free.',
    iconName: 'Heart',
  },
  {
    id: 'service',
    title: 'Fast Service',
    description: 'Pristinely prepared in under 4 minutes. Our optimized workflow keeps lanes active and servings fresh, delivering ice-cold velvet straight to your hands.',
    iconName: 'Zap',
  },
  {
    id: 'assurance',
    title: 'Quality Assurance',
    description: 'We enforce triple-sanitized clinical preparation workflows. Zero heavy syrups, zero artificial thickeners—only wholesome rich indulgence with strict food transparency.',
    iconName: 'ShieldCheck',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Eleanor Vance',
    rating: 5,
    text: 'Best thickshakes I’ve ever tasted. Rich, creamy, and absolutely delicious. The Chocolate Overload is life-changing—it actually feels like velvet on your tongue. The branding, service, and presentation are unmatched.',
    date: '2026-05-18',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Marcus Sterling',
    rating: 5,
    text: 'A truly premium experience. The Coffee Caramel shake has this incredible espresso punch that is perfectly balanced by the buttery caramel ribbons. I love that you can stand a spoon upright in these shakes!',
    date: '2026-06-02',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Sienna Brooks',
    rating: 5,
    text: 'Absolutely in love with Mango Magic! You can taste the authenticity of the Alphonso mango pulp. It’s rich and dense without being overly sweet. The staff at the boutique store are phenomenal.',
    date: '2026-06-08',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Devon Patel',
    rating: 4,
    text: 'Incredible flavor depth. The Oreo Blast is massive and incredibly satisfying. The sugar reduction option works really well for my preferences while keeping that ultra-smooth, high-quality density.',
    date: '2026-06-09',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    verified: false,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Artisanal Preparation',
    description: 'Chocolatiers drizzling hot fudge into a fresh Belgian blend.',
    image: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=600',
    category: 'product',
  },
  {
    id: 'gal-2',
    title: 'The Flagship Boutique',
    description: 'Our luxurious chocolate-brown and warm gold physical store layout.',
    image: '/src/assets/images/store_ambiance_1781080203012.png',
    category: 'ambiance',
  },
  {
    id: 'gal-3',
    title: 'Summer Launch Gala',
    description: 'Serving customized tasting sliders at the seasonal launch event.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600',
    category: 'event',
  },
  {
    id: 'gal-4',
    title: 'Fruity Bliss In the Making',
    description: 'Fresh organic strawberries and heavy double cream waiting to be churned.',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600',
    category: 'product',
  },
  {
    id: 'gal-5',
    title: 'Bespoke Private Parties',
    description: 'Our custom mobile shake-bar setup catering a premium wedding anniversary.',
    image: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?auto=format&fit=crop&q=80&w=600',
    category: 'event',
  },
  {
    id: 'gal-6',
    title: 'Serene Dining Atmosphere',
    description: 'Guests finding their sweet spot in our cozy, ambient leather booths.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600',
    category: 'ambiance',
  },
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'offer-1',
    title: 'Buy 1 Get 1 Free',
    tagline: 'Double your velvet joy',
    description: 'In honor of our Anniversary Month! Purchase any large Premium Thickshake and receive a standard Chocolate Overload completely free.',
    code: 'BOGOVELVET',
    badge: 'TUESDAYS ONLY',
    discountType: 'freebie',
    bgGradient: 'from-[#4E342E]/95 via-[#5D4037] to-[#4E342E]',
  },
  {
    id: 'offer-2',
    title: 'Weekend Indulgence Gala',
    tagline: 'Elevate your off-hours',
    description: '20% off your entire order when you order 3 or more thickshakes. Perfect to sweeten your weekend gatherings and family movie nights.',
    code: 'SWEETWEEKEND',
    badge: 'WEEKENDS ONLY',
    discountType: 'percentage',
    discountValue: 20,
    bgGradient: 'from-[#FF6F91]/95 via-[#FF85A1] to-[#FF6F91]',
  },
  {
    id: 'offer-3',
    title: 'Creative Student Discount',
    tagline: 'Brain food, elevated',
    description: 'Flash your valid student identity card at any physical checkout counter to unlock a flat $2.00 off on any Large sized thickshake.',
    badge: 'EVERYDAY OFFER',
    discountType: 'flat',
    discountValue: 2,
    bgGradient: 'from-[#FFC857]/90 via-[#FFD275] to-[#FFC857]',
  },
  {
    id: 'offer-4',
    title: 'Seasonal Wild Honeycomb',
    tagline: 'Limited craft release',
    description: 'Try our freshly introduced Honeycomb-infused Vanilla Gold. Only available during this spring season—experience gourmet texture in full bloom.',
    badge: 'SEASONAL CROP',
    discountType: 'freebie',
    bgGradient: 'from-amber-800 via-amber-700 to-amber-900',
  },
];

export const STATS: StatItem[] = [
  {
    id: 'stat-customers',
    value: 10000,
    suffix: '+',
    label: 'Happy Customers Serviced',
  },
  {
    id: 'stat-flavors',
    value: 50,
    suffix: '+',
    label: 'Unique Gourmet Flavors',
  },
  {
    id: 'stat-experience',
    value: 5,
    suffix: '+',
    label: 'Years Culinary Experience',
  },
  {
    id: 'stat-rating',
    value: 4.9,
    suffix: '/5',
    label: 'Average Customer Rating',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What makes your thickshakes so uniquely thick?',
    answer: 'We employ advanced frozen-whip technology rather than adding ice or excessive heavy syrups. Our blenders are precision temperature-controlled to whip ice cream at exactly -4°C, creating a dense velvet micro-structure so premium you can stand your straw directly upright in it!',
  },
  {
    question: 'Do you offer vegan or dairy-free alternatives?',
    answer: 'Yes! Any of our signature thickshakes can be custom prepared using our premium churned organic oat milk base and house-made allergen-free coconut vegan whipped cream. Simply select the dairy-free base customization option.',
  },
  {
    question: 'How do you handle severe food allergies?',
    answer: 'We maintain isolated blender-cups and dedicated sanitized lines for nut-free and gluten-free preparations. However, all our products are handled in a facility that whips nuts, dairy, and soy. Please notify our staff of severe sensitivities!',
  },
  {
    question: 'Do you cater private events or wedding receptions?',
    answer: 'Absolutely! We have an elegant mobile THICKSHAKES cocktail counter complete with custom-branded menu options, personal mixologists, and mini slider samplers for corporate galas, private celebrations, or weddings.',
  }
];

export const STORE_HOURS = [
  { days: 'Monday – Thursday', hours: '11:00 AM – 11:00 PM' },
  { days: 'Friday – Saturday', hours: '11:00 AM – 01:00 AM' },
  { days: 'Sunday & Holidays', hours: '12:00 PM – 11:00 PM' },
];

export const CONTACT_INFO = {
  address: '52 Velvet Churn Boulevard, Gourmet District, Suite 100, San Francisco, CA 94103',
  phone: '+1 (555) 742-5373', // (+1 555-SHAKE-SD)
  email: 'indulge@thickshakes-premium.com',
  whatsapp: 'https://wa.me/15557425373?text=I%20would%20love%20to%20order%20a%20premium%20thickshake!',
};
