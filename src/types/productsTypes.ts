export type Gender = 'Men' | 'Women' | 'Kids';

export type Product = {
  id: number;
  name: string;
  price: number;
  original_price?: number | null;
  description: string;
  image_url: string;
  category_gender: Gender;
  category: string;
  is_new?: boolean;
  is_on_sale?: boolean;
  bestseller?: boolean;
  featured_product?: boolean;
  rating: number;
};

export type ProductFormData = Omit<Product, 'id' | 'image_url'> & {
  image_url: File | null;
};