import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Home/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchUserCart, removeFromCart, updateCart } from '../../redux/features/cart/cartSlice';
import { toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userCart, loading, error } = useSelector(
    (state: RootState) => state.cart
  );
  const [updatingItems, setUpdatingItems] = useState<Record<number, boolean>>({});
  const [removingItems, setRemovingItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);

  const updateQuantity = async (id: number, change: number) => {
    if (change < 1) return;

    setUpdatingItems(prev => ({ ...prev, [id]: true }));
    try {
      await dispatch(updateCart({ productId: id, quantity: change }));
    } finally {
      setUpdatingItems(prev => ({ ...prev, [id]: false }));
    }
  };

  const removeItem = async (id: number) => {
    if (window.confirm("Are you sure you want to remove this product from cart?")) {
      setRemovingItems(prev => ({ ...prev, [id]: true }));
      try {
        await dispatch(removeFromCart(id));
        dispatch(fetchUserCart());
        toast.error("Product Remove Successfully");
      } finally {
        setRemovingItems(prev => ({ ...prev, [id]: false }));
      }
    }
  };

  const totalPrice = userCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className="container py-5 cart-page">
        <h2 className="mt-4 mb-4 fw-bold ">Your Cart</h2>
        {loading && userCart.length === 0 ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status"></div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : userCart.length === 0 ? (
          <div className="alert alert-warning text-center">
            Your cart is empty. <Link to="/shop">Shop Now</Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              {userCart.map(cart => (
                <div key={cart.id} className="card mb-3 shadow-sm cart-card">
                  <div className="row g-0">
                    <div className="col-md-3 d-flex align-items-center justify-content-center p-2">
                      <Link to={`/product/${cart.product_id}`} className="text-decoration-none text-dark">
                        <img
                          src={`${process.env.REACT_APP_API_URL}${cart.image_url}`}
                          alt={cart.product_name}
                          className="img-fluid rounded"
                          style={{ maxHeight: '120px', objectFit: 'contain' }}
                        />
                      </Link>
                    </div>

                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{cart.product_name}</h5>
                        <p className="card-text mb-2 text-danger fs-5">₹{cart.price}</p>

                        <div className="d-flex align-items-center gap-3 flex-wrap">
                          <div className="input-group quantity-control" style={{ width: '120px' }}>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(cart.product_id, cart.quantity - 1)}
                              disabled={updatingItems[cart.product_id] || cart.quantity <= 1}
                            >
                              {updatingItems[cart.product_id] && cart.quantity <= 1 ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              ) : '-'}
                            </button>
                            <div className="form-control text-center d-flex align-items-center justify-content-center">
                              {updatingItems[cart.product_id] ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              ) : cart.quantity}
                            </div>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(cart.product_id, cart.quantity + 1)}
                              disabled={updatingItems[cart.product_id]}
                            >
                              {updatingItems[cart.product_id] ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              ) : '+'}
                            </button>
                          </div>

                          <button
                            className="btn btn-outline-danger"
                            onClick={() => removeItem(cart.product_id)}
                            disabled={removingItems[cart.product_id]}
                          >
                            {removingItems[cart.product_id] ? (
                              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            ) : (
                              <i className="fas fa-trash-alt me-1"></i>
                            )}
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4 mb-3">
              <div className="card shadow-sm p-4 sticky-top">
                <h4 className="fw-bold mb-3">Summary</h4>
                <p><strong>Cart Items:</strong> {userCart.length}</p>
                <p><strong>Total:</strong> <span className="text-danger fs-5">₹{totalPrice}</span></p>
                <Link to={'/checkout'}>
                  <button
                    className="btn btn-danger w-100 mt-3"
                    disabled={loading || Object.values(updatingItems).some(Boolean) || Object.values(removingItems).some(Boolean)}
                  >
                    {(loading || Object.values(updatingItems).some(Boolean) || Object.values(removingItems).some(Boolean)) ? (
                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    ) : null}
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <style>{`
          .cart-page h2 {
            font-size: 2rem;
          }
          .cart-card:hover {
            background-color: #f8f9fa;
          }
          .quantity-control .form-control {
            max-width: 50px;
            min-height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default Cart;