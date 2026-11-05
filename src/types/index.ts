export type CategoryId =
  | 'women'
  | 'men'
  | 'kids-baby'
  | 'kids'
  | 'baby'
  | 'teens'
  | 'sale';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryId;
  subcategory: string;
  subcategories?: string[];
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isSale?: boolean;
  isBestSeller?: boolean;
  colors: ProductColor[];
  sizes: string[];
  description: string;
  details: string[];
  fabricCare: string[];
  images: string[];
  inStock: boolean;
  sku: string;
  tags: string[];
}

export interface CartItem {
  id: string; // unique item instance id (productId + color + size)
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  badge?: string;
  featuredProductIds: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  image: string;
  author: {
    name: string;
    role: string;
  };
}

export interface UserAccount {
  email: string;
  name: string;
  joinedDate: string;
  orders: {
    id: string;
    date: string;
    total: number;
    status: string;
    itemsCount: number;
  }[];
}
