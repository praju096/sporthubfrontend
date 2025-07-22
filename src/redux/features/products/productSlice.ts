import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import productApi, { ProductApiResponse } from '../../../services/productApi';
import { Product, ProductFormData } from '../../../types/productsTypes';

interface ProductState {
    allProducts: Product[];
    productsWithPage: Product[];
    bestsellers: Product[];
    featuredProduct: Product[];
    productDetail: Product | null;
    total: number;
    page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    allProducts: [],
    productsWithPage: [],
    bestsellers: [],
    featuredProduct: [],
    productDetail: null,
    total: 0,
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
};

export const fetchAllProducts = createAsyncThunk<ProductApiResponse>(
    "products/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await productApi.getAll();
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const fetchPaginatedProducts = createAsyncThunk(
    'products/fetchPaginatedProducts',
    async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
        try {
            const response = await productApi.getAllWithPage(page, limit);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const searchProducts = createAsyncThunk<Product[], string>(
    "products/search",
    async (query, { rejectWithValue }) => {
        try {
            const response = await productApi.getSearchProducts(query);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Search failed");
        }
    }
);

export const getProductById = createAsyncThunk(
    "products/getProductById",
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await productApi.getProductById(id);
            return res;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const addProduct = createAsyncThunk(
    'products/add',
    async (product: ProductFormData, { rejectWithValue }) => {
        try {
            await productApi.create(product);
            return true;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/update',
    async ({ id, product }: { id: number, product: ProductFormData }, { rejectWithValue }) => {
        try {
            await productApi.update(id, product);
            return true;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            await productApi.remove(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const fetchBestsellers = createAsyncThunk<Product[]>(
    'products/fetchBestsellers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productApi.getbestseller();
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const fetchFeaturedProduct = createAsyncThunk<Product[]>(
    'products/fetchFeaturedProduct',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productApi.getFeatured();
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch all product
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.allProducts = action.payload.data;
                // state.total = action.payload.total;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch with page
            .addCase(fetchPaginatedProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPaginatedProducts.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.productsWithPage = action.payload.data;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchPaginatedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // search results
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                searchProducts.fulfilled,
                (state, action: PayloadAction<Product[]>) => {
                    state.loading = false;
                    state.allProducts = action.payload;
                }
            )
            .addCase(searchProducts.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })

            // product by id
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetail = Array.isArray(action.payload)
                    ? action.payload[0] // returning array
                    : action.payload;   // assign directly
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Add
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
                state.productsWithPage = state.productsWithPage.filter(p => p.id !== action.payload);
                state.allProducts = state.allProducts.filter(p => p.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // Fetch Bestsellers
            .addCase(fetchBestsellers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBestsellers.fulfilled, (state, action) => {
                state.loading = false;
                state.bestsellers = action.payload;
            })
            .addCase(fetchBestsellers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Featured Product
            .addCase(fetchFeaturedProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFeaturedProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.featuredProduct = action.payload;
            })
            .addCase(fetchFeaturedProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default productSlice.reducer;
