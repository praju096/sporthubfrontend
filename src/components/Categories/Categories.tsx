import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../Home/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchProductsByCategory } from '../../redux/features/category/categoryProductsSlice';
import './Categories.css';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { addWishlist } from '../../redux/features/wishlist/wishlistSlice';
import ProductCard from '../ProductCard';


const Categories = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const validCategories = ['men', 'women', 'kids', 'new-arrivals', 'sale'] as const;
  type CategoryType = typeof validCategories[number];
  const selectedCategory = validCategories.includes(category as CategoryType)
    ? (category as CategoryType)
    : 'sale';

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { categoryProducts, loading, error } = useSelector(
    (state: RootState) => state.categoryProducts
  );
  const cartItems = useSelector((state: RootState) => state.cart.userCart);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlist);

  useEffect(() => {
    dispatch(fetchProductsByCategory(selectedCategory));

    if (category !== selectedCategory) {
      navigate(`/categories/${selectedCategory}`, { replace: true });
    }
  }, [selectedCategory, category, dispatch, navigate]);

  const handleAddToCart = async (productId: number) => {
    if (!user) {
      toast.warning("Please log in to add items to your wishlist.");
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

  const categoryDisplayNameMap: Record<typeof selectedCategory, string> = {
    men: 'Men',
    women: 'Women',
    kids: 'Kids',
    'new-arrivals': 'New Arrivals',
    sale: 'Sale',
  };
  const categoryDisplayName = categoryDisplayNameMap[selectedCategory];



  return (
    <div className="categories-page">
      <div className="shop-hero mb-5">
        <div className="container text-white">
          <h1 className="display-4 fw-bold">{categoryDisplayName}</h1>
          <p className="lead">Discover the best in {categoryDisplayName.toLowerCase()} gear</p>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3 justify-content-center">
          {[
            { key: 'sale', label: 'Sale', icon: 'fa-tags' },
            { key: 'men', label: 'Men', icon: 'fa-person' },
            { key: 'women', label: 'Women', icon: 'fa-person-dress' },
            { key: 'kids', label: 'Kids', icon: 'fa-child' },
            { key: 'new-arrivals', label: 'New-Arrivals', icon: 'fa-star' },
          ].map(({ key, label, icon }) => (
            <div key={key} className="col">
              <div
                className={`category-tile text-center p-3 rounded shadow-sm ${selectedCategory === key ? 'active' : ''
                  }`}
                onClick={() => navigate(`/categories/${key}`)}
              >
                <div className={`category-icon mb-2`}>
                  <i className={`fas ${icon} fa-2x`}></i>
                </div>
                <div className="category-label fw-semibold">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mb-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status"></div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) :
          categoryProducts.length > 0 ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
              {categoryProducts.map((product) => {
                const isInCart = cartItems.some(item => item.product_id === product.id);
                const isInWishlist = wishlistItems.some(item => item.product_id === product.id);
                return (
                  <div className="col" key={product.id}>
                    <ProductCard
                      product={product}
                      isInCart={isInCart}
                      isInWishlist={isInWishlist}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="alert alert-warning text-center">
              No products found for {categoryDisplayName}.
            </div>
          )}
      </div>

      <Footer />


    </div>
  );
};

export default Categories;
