import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchFeaturedProduct } from '../../redux/features/products/productSlice';
import ProductCard from '../ProductCard';
import { FeaturedProductsProps } from '../../types/productsTypes';

const FeaturedProducts = ({ onAddToCart, onAddToWishlist, cartItems, wishlistItems }: FeaturedProductsProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const { featuredProduct, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchFeaturedProduct());
    }, [dispatch]);

    if (loading)
        return (
            <p className="text-center py-5 text-primary fw-bold">
                Loading Featured Products...
            </p>
        );

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h2 className="mb-0">FEATURED PRODUCTS</h2>
                    <Link to="/shop?filter=featured" className="btn btn-outline-dark">VIEW ALL</Link>
                </div>

                {error ? (
                    <div className="text-center py-5">
                        <p className="text-danger fw-bold">{error}</p>
                    </div>
                ) : featuredProduct.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="text-muted fw-bold">No bestseller products available right now.</p>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-4">
                        {featuredProduct.map((product) => {
                            const isInCart = cartItems.some(item => item.product_id === product.id);
                            const isInWishlist = wishlistItems.some(item => item.product_id === product.id);
                            return (
                                <div className="col" key={product.id}>
                                    <ProductCard
                                        product={product}
                                        isInCart={isInCart}
                                        isInWishlist={isInWishlist}
                                        onAddToCart={onAddToCart}
                                        onAddToWishlist={onAddToWishlist}
                                        badge="Featured"
                                    />
                                </div>
                            )
                        })}
                    </div>
                )}

            </div>

        </section>
    );
};

export default FeaturedProducts;
