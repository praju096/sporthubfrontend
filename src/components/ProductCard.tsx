import React from 'react'
import { Product } from '../types/productsTypes';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
    onAddToCart: (productId: number) => void;
    onAddToWishlist: (productId: number) => void;
    isInCart: boolean;
    isInWishlist: boolean;
    badge?: string;
};

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInCart, isInWishlist, badge }: ProductCardProps) => {

    return (
        <div className="product-card card h-100 border-0 shadow-sm">
            <div className="position-relative product-hover-container">
                {badge && (
                    <div className="badge bg-success position-absolute mt-2 me-2 end-0">
                        {badge}
                    </div>
                )}
                <img src={`${process.env.REACT_APP_API_URL}${product.image_url}`} className="card-img-top" alt={product.name} style={{ width: '100%', height: '250px' }} />

                <div className="hover-buttons d-flex flex-column gap-2">
                    <Link to={`/product/${product.id}`} className="text-decoration-none btn btn-danger btn-sm">
                        Quick View
                    </Link>
                    <button className="btn btn-sm btn-outline-light"
                        onClick={() => onAddToWishlist(product.id)}
                        disabled={isInWishlist}
                    >
                        {isInWishlist ? 'Added to wishlist' : 'Add to Wishlist'}
                    </button>
                </div>
            </div>

            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                        <span className="text-danger fw-bold">₹{product.price}</span>
                        {Number(product.original_price) > 0 && (
                            <span className="text-muted text-decoration-line-through ms-2">
                                ₹{product.original_price}
                            </span>
                        )}
                    </div>
                    <div className="text-warning">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                        <span className="text-muted ms-2">
                            ({product.rating})
                        </span>
                    </div>
                </div>
                <div className="d-grid gap-2">
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => onAddToCart(product.id)}
                        disabled={isInCart}
                    >
                        {isInCart ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
            <style>{`

            .product-card {
                border-radius: 15px;
                overflow: hidden;
            }
            .product-hover-container {
                position: relative;
                overflow: hidden;
            }

            .hover-buttons {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: 0;
                transition: opacity 0.3s ease;
                width: 80%;
                z-index: 10;
            }

            .product-hover-container:hover .hover-buttons {
                opacity: 1;
            }

            .product-hover-container::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0, 0, 0, 0.4);
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .product-hover-container:hover::before {
                opacity: 1;
            }

      `}</style>
        </div>
    )
}

export default ProductCard;
