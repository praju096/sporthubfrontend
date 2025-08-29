import React, { useEffect } from 'react';
import '../../css/Wishlist.css'
import { Link } from 'react-router-dom';
import Footer from '../Home/Footer';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, moveToCartWishlist, removeWishlist } from '../../redux/features/wishlist/wishlistSlice';
import { fetchUserCart } from '../../redux/features/cart/cartSlice';

const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlist, loading, error } = useSelector((state: RootState) => state.wishlist);
  const { userCart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchWishlist());
    dispatch(fetchUserCart());
  }, [dispatch]);

  const removeItem = (id: number) => {
    if (window.confirm("Are you sure you want to remove this product from wishlist?")) {
      dispatch(removeWishlist(id));
    }
  };

  const moveToCart = (id: number) => {
    dispatch(moveToCartWishlist({ product_id: id }));
    dispatch(removeWishlist(id));
    dispatch(fetchUserCart());
  };

  return (
    <>
      <div className="container py-5 wishlist-page">
        <h2 className="mt-4 mb-4 fw-bold">Your Wishlist</h2>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status"></div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : wishlist.length === 0 ? (
          <div className="alert alert-warning text-center">
            Your wishlist is empty. <Link to="/shop">Browse Products</Link>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {wishlist.map((product) => {
              const inCart = userCart.some((cart) => cart.product_id === product.product_id);

              return (
                <div className="col" key={product.wishlist_id}>
                  <div className="card shadow-sm product-card">
                    <Link to={`/product/${product.product_id}`}>
                      <img
                        src={`${process.env.REACT_APP_API_URL}${product.image_url}`}
                        alt={product.product_name}
                        className="card-img-top"
                        style={{ width: '100%', height: '250px' }}
                      />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{product.product_name}</h5>
                      <p className="card-text text-danger fs-5">₹{product.price}</p>
                      <div className="d-grid gap-2 mt-3">
                        <button
                          className="btn btn-danger"
                          onClick={() => removeItem(product.product_id)}
                        >
                          <i className="fas fa-trash me-2"></i>Remove
                        </button>

                        {inCart ? (
                          <button className="btn btn-outline-danger" disabled>
                            <i className="fas fa-check-circle me-2"></i>Item in Cart
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => moveToCart(product.product_id)}
                          >
                            <i className="fas fa-shopping-cart me-2"></i>Move to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
