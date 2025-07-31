import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminCart } from '../../redux/features/cart/cartSlice';

const ManageCart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { adminCart, loading, error } = useSelector(
    (state: RootState) => state.cart
  );
  const [expandedUsers, setExpandedUsers] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    dispatch(fetchAdminCart());
  }, [dispatch]);

  const toggleUser = (userId: number) => {
    setExpandedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const groupByUser = () => {
    const grouped: { [userId: number]: typeof adminCart } = {};
    adminCart.forEach((item) => {
      if (!grouped[item.user_id]) grouped[item.user_id] = [];
      grouped[item.user_id].push(item);
    });
    return grouped;
  };

  if (loading) return <div className="d-flex justify-content-center p-4"><div className="spinner-border text-primary"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const groupedCarts = groupByUser();

  return (
    <div className="card shadow rounded-4 p-4">
      <div className="card-header bg-white py-3">
        <h3 className="mb-0 d-flex align-items-center">
          <i className="fas fa-shopping-cart me-2 text-danger"></i>
          User Carts Management
        </h3>
      </div>
      
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {Object.entries(groupedCarts).map(([userId, items]) => {
            const userIdNum = Number(userId);
            const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            return (
              <div key={userId} className="list-group-item border-0 p-0">
                <div 
                  className="d-flex justify-content-between align-items-center p-3 cursor-pointer"
                  onClick={() => toggleUser(userIdNum)}
                >
                  <div>
                    <span className="badge bg-light text-dark me-2">ID: {userId}</span>
                    <strong>{items[0].user_name}</strong>
                    <div className="small text-muted">{items[0].user_email}</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="text-end me-3">
                      <div className="fw-bold">₹{total.toFixed(2)}</div>
                      <div className="small">{items.length} item{items.length > 1 ? 's' : ''}</div>
                    </div>
                    <i className={`fas fa-chevron-${expandedUsers[userIdNum] ? 'up' : 'down'} text-muted`}></i>
                  </div>
                </div>
                
                {expandedUsers[userIdNum] && (
                  <div className="bg-light p-3 border-top">
                    <div className="table-responsive">
                      <table className="table table-sm align-middle mb-0">
                        <thead className="table-dark">
                          <tr>
                            <th className="border-0">Product</th>
                            <th className="border-0" style={{width: '70px'}}>Qty</th>
                            <th className="border-0 text-end">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map(item => (
                            <tr key={`${item.cart_id}-${item.product_id}`}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img 
                                    src={`${process.env.REACT_APP_API_URL}${item.image_url}`}
                                    alt={item.product_name}
                                    className="rounded me-2"
                                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                  />
                                  <div className="text-truncate" style={{maxWidth: '200px'}}>
                                    {item.product_name}
                                  </div>
                                </div>
                              </td>
                              <td className="fw-bold">x{item.quantity}</td>
                              <td className="text-end">
                                <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                                <div className="small text-muted">₹{item.price} each</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageCart;