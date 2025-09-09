import { ReviewFormData } from '../types/orderTypes';
import API from './axios';

const submitReview = async (data: ReviewFormData): Promise<ReviewFormData> => {
    const response = await API.post('/api/review', data);
    return response.data;
}

const reviewsByProductId = async (product_id: number) => {
    const response = await API.get(`/api/review/${product_id}`);
    return response.data;
}

const reviewApi = {
    reviewSubmit: submitReview,
    fetchReviewsByProductId: reviewsByProductId,
}
export default reviewApi;