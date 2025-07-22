
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  featured: string[];
  banner: string;
}

export interface CategoriesState {
  items: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
