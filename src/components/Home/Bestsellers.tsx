import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import IMAGES from '../../constant/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchBestsellers } from '../../redux/features/products/productSlice';
import { CartItem } from '../../types/cartTypes';
import { WishlistItem } from '../../types/wishlistTypes';
import ProductCard from './../ProductCard';


interface BestsellersProps {
  onAddToCart: (productId: number) => void;
  onAddToWishlist: (productId: number) => void;
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
};


const Bestsellers = ({ onAddToCart, onAddToWishlist, cartItems, wishlistItems }: BestsellersProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { bestsellers, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchBestsellers());
  }, [dispatch]);

  if (loading)
    return (
      <p className="text-center py-5 text-primary fw-bold">
        Loading bestsellers...
      </p>
    );

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="mb-0">BESTSELLERS</h2>
          <Link to="/shop?filter=bestseller" className="btn btn-outline-dark">VIEW ALL</Link>
        </div>

        {error ? (
          <div className="text-center py-5">
            <p className="text-danger fw-bold">{error}</p>
          </div>
        ) : bestsellers.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted fw-bold">No bestseller products available right now.</p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-4">
            {bestsellers.map((product) => {
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
                    badge="BESTSELLER"
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

export default Bestsellers;

