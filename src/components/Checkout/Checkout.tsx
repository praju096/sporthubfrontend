import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import API from '../../services/axios';
import UserDetailForm from './UserDetailForm';
import { fetchUserDetail } from '../../redux/features/userDetail/userDetailSlice';
import { userPlaceOrder } from '../../redux/features/order/orderSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userDetail, loading } = useSelector((state: RootState) => state.userDetail);

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => { 
    dispatch(fetchUserDetail());
    fetchCart();
  }, [dispatch]);

  const fetchCart = async () => {
    const { data } = await API.get('/api/cart');
    setCartItems(data.data || []);
  };

  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.warn('Please select an address or add one.');
      return;
    }
    try {
      await dispatch(userPlaceOrder({
        userdetail_id: selectedAddress,
        payment_method: paymentMethod,
        shipping_method: shippingMethod
      }));
      toast.success('Order placed successfully!');
      navigate('/orders')
    } catch {
      toast.warn('Failed to place order');
    }
  };

  return (
    <div className="container mt-5 pt-4" style={{ minHeight: 'calc(100vh - 56px)' }}>
      <div className="row">
        {/* Shipping Address Section */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Shipping Address</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : userDetail.length > 0 ? (
                <div className="list-group mb-3">
                  {userDetail.map(addr => (
                    <label key={addr.id} className="list-group-item list-group-item-action">
                      <div className="d-flex align-items-center">
                        <input
                          type="radio"
                          name="address"
                          value={addr.id}
                          checked={selectedAddress === addr.id}
                          onChange={() => setSelectedAddress(addr.id!)}
                          className="form-check-input me-3"
                        />
                        <div>
                          <strong className="text-dark">{addr.full_name}</strong>
                          <div className="text-muted small">
                            {addr.address_line}, {addr.city} - {addr.pincode}
                          </div>
                          <div className="text-muted small">{addr.phone}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="alert alert-warning mb-3">No addresses found. Please add one.</div>
              )}

              <button
                className={`btn ${showAddressForm ? 'btn-outline-danger' : 'btn-outline-dark'}`}
                onClick={() => setShowAddressForm(!showAddressForm)}
              >
                {showAddressForm ? (
                  <><i className="bi bi-x-lg me-2"></i>Cancel</>
                ) : (
                  <><i className="bi bi-plus-lg me-2"></i>Add New Address</>
                )}
              </button>

              {showAddressForm && (
                <div className="mt-3 border-top pt-3">
                  <UserDetailForm
                  mode='add' 
                  onSaved={() => {
                    dispatch(fetchUserDetail());
                    setShowAddressForm(false);
                  }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 sticky-top" style={{ top: '80px' }}>
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group mb-3">
                {cartItems.map(item => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={item.product_id}>
                    <div>
                      <span className="fw-semibold">{item.name}</span>
                      <small className="text-muted ms-2">x {item.quantity}</small>
                    </div>
                    <span className="text-dark">₹{item.price * item.quantity}</span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between align-items-center bg-light">
                  <strong className="text-dark">Total</strong>
                  <strong className="text-danger">₹{total}</strong>
                </li>
              </ul>

              <div className="mb-3">
                <label className="form-label text-dark">Payment method</label>
                <select 
                  className="form-select border-dark" 
                  value={paymentMethod} 
                  onChange={e => setPaymentMethod(e.target.value)}
                >
                  <option value="cod">Cash on delivery</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label text-dark">Shipping Method</label>
                <select 
                  className="form-select border-dark" 
                  value={shippingMethod} 
                  onChange={e => setShippingMethod(e.target.value)}
                >
                  <option value="standard">Standard (3-5 days)</option>
                  <option value="express">Express (1-2 days)</option>
                </select>
              </div>

              <button 
                className="btn btn-danger w-100 py-2 fw-bold"
                onClick={handlePlaceOrder}
                disabled={!selectedAddress}
              >
                <i className="bi bi-bag-check me-2"></i>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;