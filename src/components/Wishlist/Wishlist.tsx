// src/pages/Wishlist.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Home/Footer';

type WishlistProduct = {
    id: number;
    name: string;
    price: number;
    image: string;
};

const initialWishlist: WishlistProduct[] = [
    { id: 4, name: 'Running Jacket', price: 890.99, image: 'https://placehold.co/300x300?text=Running+Jacket' },
    { id: 5, name: 'Limited Edition Hoodie', price: 790.99, image: 'https://placehold.co/300x300?text=Limited+Hoodie' },
];

const Wishlist: React.FC = () => {
    const [wishlist, setWishlist] = useState<WishlistProduct[]>(initialWishlist);
    const [cart, setCart] = useState<number[]>([]);

    const removeItem = (id: number) => {
        setWishlist(prev => prev.filter(p => p.id !== id));
    };

    const moveToCart = (id: number) => {
        if (!cart.includes(id)) setCart(prev => [...prev, id]);
        removeItem(id);
    };

    return (<>
        <div className="container py-5 wishlist-page">
            <h2 className="mt-4 mb-4 fw-bold">Your Wishlist</h2>
            {wishlist.length === 0 ? (
                <div className="alert alert-info text-center">
                    Your wishlist is empty. <Link to="/shop">Browse Products</Link>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {wishlist.map(product => (
                        <div className="col" key={product.id}>
                            <div className="card h-100 shadow-sm product-card">
                                <img src={product.image} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{product.name}</h5>
                                    <p className="card-text text-danger fs-5">${product.price.toFixed(2)}</p>
                                    <div className="d-grid gap-2 mt-3">
                                        <button className="btn btn-outline-danger" onClick={() => removeItem(product.id)}>
                                            <i className="fas fa-trash me-2"></i>Remove
                                        </button>
                                        <button className="btn btn-danger" onClick={() => moveToCart(product.id)}>
                                            <i className="fas fa-cart-plus me-2"></i>Move to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
        .wishlist-page h2 {
          font-size: 2rem;
        }
        .product-card {
          border-radius: 15px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
      `}</style>


        </div>
        <Footer />
    </>
    );
};

export default Wishlist;
