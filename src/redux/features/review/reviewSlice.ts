import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reviewApi from '../../../services/reviewApi';
import { ReviewData } from '../../../types/orderTypes';

interface ReviewState {
    reviews: ReviewData[];
    loading: boolean;
    error: string | null;
}

const initialState: ReviewState = {
    reviews: [],
    loading: false,
    error: null,
};

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (product_id: number, { rejectWithValue }) => {
        try {
            const response = await reviewApi.fetchReviewsByProductId(product_id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const submitReview = createAsyncThunk(
    'reviews/submitReview',
    async (reviewData: { product_id: number; title: string; rating: number; comment: string; }, { rejectWithValue }) => {
        try {
            const response = await reviewApi.reviewSubmit(reviewData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get review
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Add review
            .addCase(submitReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitReview.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(submitReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default reviewSlice.reducer;
