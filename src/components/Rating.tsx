import React from 'react';
import { StarRatingProps } from '../types/productsTypes';

const Rating = ({
    rating,
    maxRating = 5,
    size = 'md',
    showValue = true,
    className = ''
}: StarRatingProps) => {
    const clampedRating = Math.max(0, Math.min(rating, maxRating));

    const sizeClasses = {
        sm: 'fs-6',
        md: 'fs-5',
        lg: 'fs-4'
    };

    const renderStar = (index: number) => {
        const fillPercentage = Math.max(0, Math.min(1, clampedRating - index));

        return (
            <span
                key={index}
                className={`position-relative d-inline-block ${sizeClasses[size]}`}
                style={{ color: '#e4e5e9' }}
            >
                <i className="bi bi-star-fill"></i>

                {fillPercentage > 0 && (
                    <i
                        className="bi bi-star-fill position-absolute top-0 start-0"
                        style={{
                            color: '#ffc107',
                            clipPath: `inset(0 ${(1 - fillPercentage) * 100}% 0 0)`
                        }}
                    ></i>
                )}
            </span>
        );
    };

    return (
        <div className={`d-flex align-items-center gap-2 ${className}`}>
            <div className="d-flex">
                {Array.from({ length: maxRating }, (_, index) => renderStar(index))}
            </div>

            {showValue && (
                <span className="text-muted small">
                    ({clampedRating.toFixed(1)})
                </span>
            )}
        </div>
    );
};
export default Rating;