import * as yup from "yup";
import { ReviewFormData } from "../orderTypes";

export const reviewSchema: yup.ObjectSchema<ReviewFormData> = yup.object({
  title: yup.string().required('Title is required'),
  rating: yup.number().min(1, 'Rating is required').required(),
  comment: yup.string().required('Review comment is required'),
});