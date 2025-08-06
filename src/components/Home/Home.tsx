import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './SportsEcommerce.css';
import HeroCarousel from './HeroCarousel';
import BrandsSection from './BrandsSection';
import CategoriesSection from './CategoriesSection';
import FeaturedProducts from './FeaturedProducts ';
import Bestsellers from './Bestsellers';
import StoreLocations from './StoreLocations';
import Assurance from './Assurance';
import Footer from './Footer';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { addWishlist } from '../../redux/features/wishlist/wishlistSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.userCart);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlist)

  const handleAddToCart = async (productId: number) => {
    if (!user) {
      toast.warning("Please log in to add items to your cart.");
      navigate('/login');
      return;
    }
    await dispatch(addToCart({ product_id: productId, quantity: 1 }));
    toast.success("Product Add In Cart");
  };

  const handleAddToWishlist = async (productId: number) => {
    if (!user) {
      toast.warning("Please log in to add items to your wishlist.");
      navigate('/login');
      return;
    }
    await dispatch(addWishlist({ product_id: productId }));
    toast.success("Product Add In Wishlist");
  };

  return (
    <div className="sports-ecommerce">

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Brands Section */}
      <BrandsSection />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Featured Products */}
      <FeaturedProducts
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        cartItems={cartItems}
        wishlistItems={wishlistItems}
      />

      {/* Bestsellers */}
      <Bestsellers
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        cartItems={cartItems}
        wishlistItems={wishlistItems}
      />

      {/* Store Locations */}
      <StoreLocations />

      {/* Assurance */}
      <Assurance />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Home;


