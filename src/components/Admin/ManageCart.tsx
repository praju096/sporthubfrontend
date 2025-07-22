import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminCart } from '../../redux/features/cart/cartSlice';

const ManageCart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { adminCart, loading, error } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(fetchAdminCart());
  }, [dispatch]);
  // console.log("Admin cart data:", adminCart);

  const groupByUser = () => {
    const grouped: { [userId: number]: typeof adminCart } = {};
    adminCart.forEach((item) => {
      if (!grouped[item.user_id]) grouped[item.user_id] = [];
      grouped[item.user_id].push(item);
    });
    return grouped;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const groupedCarts = groupByUser();

  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4"><i className={`fas fa-cart-plus text-danger`}></i> Manage Cart</h3>
      {Object.entries(groupedCarts).map(([userId, items]) => (
        <div key={userId} className="mb-4">
          <h5>
            ({userId}) {items[0].user_name} ({items[0].user_email})
          </h5>
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={`${item.cart_id}-${item.product_id}`}>
                  <td>{item.product_name}</td>
                  <td>
                    <img
                      src={`${process.env.REACT_APP_API_URL}${item.image_url}`}
                      alt={item.product_name}
                      className='rounded-5'
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{(item.price * item.quantity)}</td>
                </tr>
              ))}
              <tr className="fw-bold">
                <td colSpan={4}>Total</td>
                <td>
                  ₹
                  {items
                    .reduce((sum, i) => sum + i.price * i.quantity, 0)
                    .toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ManageCart;
