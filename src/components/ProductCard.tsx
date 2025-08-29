import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';
import '../css/ProductCard.css';
import { ProductCardProps } from '../types/productsTypes';

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
                        <i className="fas fa-eye me-1"></i>Quick View
                    </Link>
                    <button className="btn btn-sm btn-outline-light"
                        onClick={() => onAddToWishlist(product.id)}
                        disabled={isInWishlist}
                    >
                        {isInWishlist ? (
                            <><i className="fas fa-heart me-1"></i> In Wishlist</>
                        ) : (
                            <><i className="far fa-heart me-1"></i> Add to Wishlist</>
                        )}
                    </button>
                </div>
            </div>

            <div className="card-body d-flex flex-column">
                <h5 className="card-title flex-fill">
                    {product.name}
                </h5>

                <div className="d-flex justify-content-between align-items-center mb-2 flex-nowrap">
                    <div className="d-flex align-items-center flex-wrap">
                        <span className="text-danger fw-bold me-2">₹{product.price}</span>
                        {Number(product.original_price) > 0 && (
                            <span className="text-muted text-decoration-line-through small">
                                ₹{product.original_price}
                            </span>
                        )}
                    </div>
                    <div className="text-warning ms-2 flex-shrink-0">
                        <Rating rating={product.rating} size='sm' />
                    </div>
                </div>

                <div className="d-grid gap-2 mt-auto">
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => onAddToCart(product.id)}
                        disabled={isInCart}
                    >
                        {isInCart ? (
                            <><i className="fas fa-check-circle me-2"></i> Added to Cart</>
                        ) : (
                            <><i className="fas fa-shopping-cart me-2"></i> Add to Cart</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;