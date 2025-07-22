import { Product, ProductFormData } from '../types/productsTypes';
import API from './axios';

export interface ProductApiResponse {
  data: Product[];
  // total: number;
}

export interface PaginatedProductResponse {
  data: Product[];
  total: number;
  page: number;
  totalPages: number;
}

const toFormData = (data: ProductFormData): FormData => {
  const formData = new FormData();
  for (const key in data) {
    const value = data[key as keyof ProductFormData];

    if (key === "image_url" && value instanceof FileList && value.length > 0) {
      formData.append("image", value[0]); 
    } else if (Array.isArray(value)) {
      value.forEach((v) => formData.append(`${key}[]`, v));
    } else if (value !== null && value !== undefined) {
      formData.append(key, value as string);
    }
  }
  return formData;
};

const fetchPaginatedProducts = async (page: number = 1, limit: number = 10):Promise<PaginatedProductResponse>=> {
  const res = await API.get(`/api/products/paginated?page=${page}&limit=${limit}`);
  return res.data.data;
}

const getAllProducts = async (): Promise<ProductApiResponse> => {
  const res = await API.get<ProductApiResponse>('/api/products');
  return res.data;
};

export const searchProducts = async (query: string) => {
  const response = await API.get(`/api/products/search?query=${query}`);
  return response.data;
};

// Function to create a new product
const createProduct = async (data: ProductFormData): Promise<Product> => {
  const formData = toFormData(data);
  const res = await API.post('/api/products', formData);
  return res.data;
};

// Function to update a product by ID
const updateProduct = async (id: number, data: ProductFormData): Promise<Product> => {
  const formData = toFormData(data);
  const res = await API.put(`/api/products/${id}`, formData);
  return res.data;
};

// Function to delete a product by ID
const deleteProduct = async (id: number): Promise<void> => {
  await API.delete(`/api/products/${id}`);
};

const getBestsellerProducts = async (): Promise<Product[]> => {
  const res = await API.get<{ data: Product[] }>(`/api/products/bestsellers`);
  return res.data.data;
};

const getFeaturedProducts = async (): Promise<Product[]> => {
  const res = await API.get<{ data: Product[] }>(`/api/products/featured`);
  return res.data.data;
};

const getById = async(id:number): Promise<Product[]> =>{
  const res = await API.get(`/api/products/${id}`);
  return res.data.data;
}

// Group all functions under a single object
const productApi = {
  getAll: getAllProducts,
  getAllWithPage: fetchPaginatedProducts,
  getSearchProducts: searchProducts,
  getProductById: getById,
  create: createProduct,
  update: updateProduct,
  remove: deleteProduct,
  getbestseller: getBestsellerProducts,
  getFeatured: getFeaturedProducts,
};

export default productApi;
