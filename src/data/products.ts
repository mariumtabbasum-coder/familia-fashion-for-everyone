import { Product, CategoryId, LookbookItem, BlogPost } from '../types';
import { WOMEN_PRODUCTS } from './womenProducts';
import { MEN_PRODUCTS } from './menProducts';
import { KIDS_BABY_PRODUCTS } from './kidsBabyProducts';
import { TEENS_PRODUCTS } from './teensProducts';

export const CATEGORIES: {
  id: CategoryId;
  name: string;
  iconName: string;
  badge?: string;
  featuredSubcategories: string[];
  bannerImage: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroCta: string;
}[] = [
  {
    id: 'women',
    name: 'Women',
    iconName: 'User',
    featuredSubcategories: ['Dresses', 'Tops', 'Jeans', 'Co-ords', 'Activewear', 'Outerwear', 'Lingerie', 'Plus Size'],
    bannerImage: '/assets/women_banner_crisp.jpg',
    heroHeadline: 'Elegant. Confident. You.',
    heroSubtitle: 'Discover the latest trends in women’s fashion — timeless silhouettes, breathable fabrics, and effortless elegance.',
    heroCta: 'Shop Women',
  },
  {
    id: 'men',
    name: 'Men',
    iconName: 'UserCheck',
    featuredSubcategories: ['Shirts', 'T-shirts', 'Jeans', 'Trousers', 'Jackets', 'Activewear'],
    bannerImage: '/assets/men_banner_crisp.jpg',
    heroHeadline: 'Modern Looks. Everyday Comfort.',
    heroSubtitle: 'From casual to formal, find what fits your lifestyle with crafted essentials made for all-day comfort.',
    heroCta: 'Shop Men',
  },
  {
    id: 'kids-baby',
    name: 'Kids & Baby',
    iconName: 'Smile',
    featuredSubcategories: ['Boys', 'Girls', 'Clothing Sets', 'Newborn', 'Rompers', 'T-shirts', 'Organic Essentials'],
    bannerImage: '/assets/kids_baby_crisp.jpg',
    heroHeadline: 'Little Styles. Big Smiles.',
    heroSubtitle: 'Comfortable, cute and made for endless adventures. Play-ready apparel for boys, girls, and gentle baby essentials.',
    heroCta: 'Shop Kids & Baby',
  },
  {
    id: 'teens',
    name: 'Teens',
    iconName: 'Sparkles',
    featuredSubcategories: ['Casualwear', 'Dresses', 'Tops', 'Jeans', 'Streetwear', 'Hoodies'],
    bannerImage: '/assets/teens_banner_crisp.jpg',
    heroHeadline: 'Express Your Vibe.',
    heroSubtitle: 'Everyday cool, relaxed streetwear, and trending styles that fit the rhythm of teen life.',
    heroCta: 'Shop Teens',
  },
  {
    id: 'sale',
    name: 'Sale',
    iconName: 'Tag',
    badge: 'Up to 50%',
    featuredSubcategories: ['Women Sale', 'Men Sale', 'Kids & Baby Sale', 'Teens Sale', 'Under $25', 'Clearance'],
    bannerImage: '/assets/sale_banner_crisp.jpg',
    heroHeadline: 'Mid-Season Family Sale.',
    heroSubtitle: 'Save up to 50% on family essentials, seasonal bestsellers, and coordinated wardrobe sets.',
    heroCta: 'Shop All Sale',
  },
];

export const PRODUCTS: Product[] = [
  ...WOMEN_PRODUCTS,

  ...MEN_PRODUCTS,

  ...KIDS_BABY_PRODUCTS,

  ...TEENS_PRODUCTS,
];
export const LOOKBOOK_COLLECTIONS: LookbookItem[] = [
  {
    id: 'family-looks',
    title: 'Family Looks',
    subtitle: 'Coordinated pastel hues for family portraits & celebrations',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop',
    tag: 'Signature Harmony',
    badge: 'Popular Choice',
    featuredProductIds: ['floral-maxi-dress', 'mens-casual-shirt', 'girls-flutter-dress', 'kids-denim-jacket'],
  },
  {
    id: 'casual-vibes',
    title: 'Casual Vibes',
    subtitle: 'Laid-back linen and soft denim for Sunday breakfasts and walks',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop',
    tag: 'Weekend Easy',
    featuredProductIds: ['mens-pocket-tee', 'womens-high-rise-jeans', 'hoodie'],
  },
  {
    id: 'beach-ready',
    title: 'Beach Ready',
    subtitle: 'Sun-drenched vacation sets crafted in airy breathable organic weaves',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    tag: 'Coastal Breeze',
    badge: 'Summer 2026',
    featuredProductIds: ['summer-dress', 'resort-camp-collar-shirt', 'summer-muslin-shirt-short-set'],
  },
  {
    id: 'festive-wear',
    title: 'Festive Wear',
    subtitle: 'Memorable celebrations dressed in graceful coordinated silhouettes',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop',
    tag: 'Celebration Ready',
    featuredProductIds: ['womens-coord-set', 'floral-maxi-dress', 'mens-casual-shirt'],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '5-summer-outfit-ideas-for-kids',
    title: '5 Summer Outfit Ideas for Kids',
    slug: '5-summer-outfit-ideas-for-kids',
    date: 'Apr 22, 2025',
    readTime: '4 min read',
    category: 'Kids Fashion',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Play-proof fabrics, pastel palettes, and sun-safe styles that keep little adventurers cool and smiling all season long.',
    content: [
      'Summer with children is all about freedom, sunshine, and continuous discovery. Dressing them should never feel like a battle against heat or scratchy tags.',
      '1. The Breathable Cotton Tier: Natural cotton muslin lets air circulate freely, keeping body temperatures regulated even during lively playground games.',
      '2. Play-Friendly Denim Layers: Lightweight stretch jackets provide just enough warmth for late evening beach bonfires without restricting movement.',
      '3. Color-Coded Coords: Make morning dressing easy for toddlers with matching shorts and tee sets in ice blue and mint green.',
      '4. UPF Sun Hats: Protect delicate skin with soft organic weaves they actually enjoy wearing.',
      '5. Wash-and-Wear Durability: Choose clothes with reinforced seams that survive countless washing machine cycles without losing shape.',
    ],
    author: {
      name: 'Elena Rostova',
      role: 'Family Styling Editor',
    },
  },
  {
    id: 'best-travel-looks-for-families',
    title: 'Best Travel Looks for Families',
    slug: 'best-travel-looks-for-families',
    date: 'Apr 18, 2025',
    readTime: '6 min read',
    category: 'Family Travel',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
    excerpt: 'How to pack coordinated carry-on friendly capsules for the entire family without sacrificing comfort during flights.',
    content: [
      'Traveling with multiple generations requires strategy. The key to seamless vacation dressing is creating a cohesive palette where pieces mix and match across days.',
      'Start with a neutral foundation: soft grey, off-white, and deep teal provide grounds that naturally resist transit stains.',
      'Layering is crucial when moving through chilly airports into tropical sunshine. Soft modal tees paired with breathable button-downs work across both settings.',
      'Our top advice: choose wrinkle-resistant linen blends that look even better with a slight relaxed crease.',
    ],
    author: {
      name: 'Marcus Vance',
      role: 'Travel & Lifestyle Contributor',
    },
  },
  {
    id: 'how-to-style-jeans-for-every-age',
    title: 'How to Style Jeans for Every Age',
    slug: 'how-to-style-jeans-for-every-age',
    date: 'Apr 12, 2025',
    readTime: '5 min read',
    category: 'Style Guide',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    excerpt: 'From toddlers to grandparents: timeless ways to wear denim that feel contemporary, flattering, and effortlessly put together.',
    content: [
      'Denim is the ultimate generational bridge. It is worn with equal pride by an eight-year-old on a scooter and a grandfather tending his garden.',
      'For teens, oversized vintage cuts and relaxed streetwear silhouettes offer comfortable everyday expression.',
      'For women, straight-leg high-rise cuts paired with tucked floral blouses create a balanced, statuesque silhouette.',
      'For men, a clean mid-wash straight leg paired with crisp linen shirts works seamlessly from casual Fridays to family dinners.',
    ],
    author: {
      name: 'Chloe Laurent',
      role: 'Head of Creative Design',
    },
  },
  {
    id: 'sustainable-fashion-for-a-better-tomorrow',
    title: 'Sustainable Fashion for a Better Tomorrow',
    slug: 'sustainable-fashion-for-a-better-tomorrow',
    date: 'Apr 5, 2025',
    readTime: '7 min read',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Our commitment to organic fibers, water-saving dyeing techniques, and heirloom garments designed to be passed down.',
    content: [
      'At FAMILIA, we measure our success not just in stylish collections, but in the world we leave behind for our children and grandchildren.',
      'Over 85% of our cotton is now certified GOTS organic, grown without synthetic pesticides or excessive water depletion.',
      'We focus on heirloom durability: when a child outgrows our denim jacket or floral dress, the construction is sturdy enough to be handed down to younger siblings or cousins.',
      'Small deliberate choices in supply chain and packaging compound into meaningful real-world impact.',
    ],
    author: {
      name: 'David & Sarah Chen',
      role: 'Sustainability Directors',
    },
  },
];
