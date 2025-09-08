import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrderItem, ReviewData } from '../../types/orderTypes';
import Rating from '../Rating';
import { reviewSchema } from '../../types/validation/reviewSchama';

interface OrderItemProps {
  item: OrderItem;
  isDelivered: boolean;
}

const SingleOrderItem = ({ item, isDelivered }: OrderItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    reset,
  } = useForm<ReviewData>({
    resolver: yupResolver(reviewSchema),
    defaultValues: {
      title: '',
      rating: 0,
      comment: '',
    },
    mode: "onTouched",
  });

  const submitReview = (data: ReviewData) => {
    console.log(`Submitting review for item ${item.id}:`, data);
    alert(`Review submitted for ${item.product_name}`);
    reset();
    setIsExpanded(false);
  };

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {item.product_image && (
            <img
              src={`${process.env.REACT_APP_API_URL}${item.product_image}`}
              alt={item.product_name}
              className="rounded me-3"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
          )}
          <div>
            <h6 className="mb-1 text-dark">{item.product_name}</h6>
            <small className="text-muted">Qty: {item.quantity}</small>
          </div>
        </div>

        <div className="text-end">
          <span className="text-dark">₹{item.price}</span>
          <br />
          <small className="text-muted">
            ₹{(item.price * item.quantity).toFixed(2)}
          </small>
        </div>
      </div>

      {isDelivered && (
        <div className="mt-3">
          {isExpanded ? (
            <div className="card bg-light border-0">
              <div className="card-body">
                <form onSubmit={handleSubmit(submitReview)} className="row g-3 mb-3">
                  <h6 className="card-title">Rate your experience with {item.product_name}</h6>
                  <div className="col-md-6">
                    <label htmlFor={`title-${item.id}`} className="form-label">
                      Review Title
                    </label>
                    <input
                      id={`title-${item.id}`}
                      className={`form-control ${errors.title && touchedFields.title ? 'is-invalid' : ''}`}
                      {...register('title')}
                      placeholder="Enter a title for your review"
                    />
                    {errors.title && (
                      <div className="invalid-feedback">{errors.title.message}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Your Rating</label>
                    <Controller
                      name="rating"
                      control={control}
                      render={({ field }) => (
                        <Rating
                          rating={field.value}
                          maxRating={5}
                          size="md"
                          showValue={true}
                          onRate={(newRating) => field.onChange(newRating)}
                        />
                      )}
                    />
                    {errors.rating && (
                      <div className="text-danger small">{errors.rating.message}</div>
                    )}
                  </div>

                  <div className="col-md-12">
                    <label htmlFor={`review-${item.id}`} className="form-label">
                      Your Review
                    </label>
                    <textarea
                      id={`review-${item.id}`}
                      className={`form-control ${errors.comment && touchedFields.comment ? 'is-invalid' : ''}`}
                      rows={3}
                      placeholder="Share your experience with this product"
                      {...register('comment')}
                    ></textarea>
                    {errors.comment && (
                      <div className="invalid-feedback">{errors.comment.message}</div>
                    )}
                  </div>

                  <div className="col-12 d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary me-2"
                      onClick={() => {
                        reset();
                        setIsExpanded(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-danger">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                How was your experience with this product?
              </small>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => setIsExpanded(true)}
              >
                <i className="bi bi-pencil me-1"></i> Write a Review
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default SingleOrderItem;
