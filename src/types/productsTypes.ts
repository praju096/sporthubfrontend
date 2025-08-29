import { SubmitHandler } from "react-hook-form";
import { CartItem } from "./cartTypes";
import { WishlistItem } from "./wishlistTypes";

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

export interface ProductCardProps {
    product: Product;
    onAddToCart: (productId: number) => void;
    onAddToWishlist: (productId: number) => void;
    isInCart: boolean;
    isInWishlist: boolean;
    badge?: string;
};

export interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    showValue?: boolean;
    className?: string;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  page: number;
  onPrev: () => void;
  onNext: () => void;
}

export interface ProductFormProps {
  onSubmit: SubmitHandler<ProductFormData>;
  onCancel: () => void;
  editProduct?: Product | null;
}

export interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

export interface BestsellersProps {
  onAddToCart: (productId: number) => void;
  onAddToWishlist: (productId: number) => void;
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
};

export interface FeaturedProductsProps {
    onAddToCart: (productId: number) => void;
    onAddToWishlist: (productId: number) => void;
    cartItems: CartItem[];
    wishlistItems: WishlistItem[];
};

export interface FiltersSidebarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    selectedSizes: string[];
    setSelectedSizes: (sizes: string[]) => void;
    selectedColors: string[];
    setSelectedColors: (colors: string[]) => void;
    handleSearchSubmit: (e: React.FormEvent) => void;
    handleClearSearch: () => void;
    handleFilterChange: () => void;
}

export interface PaginationProps {
    productsPerPage: number;
    totalProducts: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

export interface ProductsGridProps {
    loading: boolean;
    error: string | null;
    currentProducts: Product[];
    cartItems: CartItem[];
    wishlistItems: WishlistItem[];
    handleAddToCart: (productId: number) => void;
    handleAddToWishlist: (productId: number) => void;
}

export interface SortOptionsProps {
    sortOption: string;
    setSortOption: (option: string) => void;
    showingCount: number;
    totalCount: number;
}