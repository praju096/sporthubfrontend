import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchOrdersAdmin, updateAdminStatus } from '../../redux/features/order/orderSlice';
import { toast } from 'react-toastify';
import { OrderStatus } from '../../types/orderTypes';

const ManageOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { adminOrders, loading, error } = useSelector(
    (state: RootState) => state.order
  );

  const [expectedDates, setExpectedDates] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    dispatch(fetchOrdersAdmin());
  }, [dispatch]);

  const updateStatus = (id: number, status: OrderStatus) => {
    const payload: any = { id, status };

    // if shipped/confirmed, include expected delivery (if admin set it)
    if ((status === "shipped" || status === "confirmed") && expectedDates[id]) {
      payload.expected_delivery = expectedDates[id];
    }

    dispatch(updateAdminStatus(payload))
      .unwrap()
      .then(() => toast.success("Status updated successfully"))
      .catch(() => toast.error("Failed to update status"));
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  if (error) return <p className="alert alert-danger mt-3">{error}</p>;

  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4">
        <i className="fas fa-shipping-fast"></i> Manage Orders
      </h3>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order_id</th>
              <th>User_id</th>
              <th>Email</th>
              <th>Total</th>
              <th>Status</th>
              <th>Expected Delivery</th>
              <th>Delivered At</th>
              <th>Payment Method</th>
              <th>Shipping Method</th>
            </tr>
          </thead>
          <tbody>
            {adminOrders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.user_id}</td>
                <td>{order.email}</td>
                <td>₹{order.total}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.order_id, e.target.value as OrderStatus)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered" disabled={order.status !== "shipped"}>Delivered</option>
                  </select>
                </td>
                <td>
                  {(order.status === "shipped" || order.status === "confirmed") && (
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={expectedDates[order.order_id] || ""}
                      onChange={(e) =>
                        setExpectedDates({
                          ...expectedDates,
                          [order.order_id]: e.target.value,
                        })
                      }
                    />
                  )}
                  {order.expected_delivery ?
                    new Date(order.expected_delivery).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {order.delivered_at ?
                    new Date(order.delivered_at).toLocaleDateString()
                    : "-"}
                </td>
                <td>{order.payment_method}</td>
                <td>{order.shipping_method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
