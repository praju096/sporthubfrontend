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
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = async (productId: number) => {
    await dispatch(addToCart({ product_id: productId, quantity: 1 }));
    toast.success("Product Add In Cart");
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
      <FeaturedProducts onAddToCart={handleAddToCart}/>

      {/* Bestsellers */}
      <Bestsellers onAddToCart={handleAddToCart}/>

      {/* Store Locations */}
      <StoreLocations />

      {/* Assurance */}
      <Assurance />

      {/* Footer */}
      <Footer />

      {/* Font Awesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

    </div>
  );
};

export default Home;


