import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchOrderById } from '../../redux/features/order/orderSlice';
import { OrderStatus, statusClasses } from '../../types/orderTypes';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { currentOrder, loading } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    if (id) dispatch(fetchOrderById(Number(id)));
  }, [dispatch, id]);

  if (loading || !currentOrder) {
    return (
      <div className="container mt-5 pt-4 text-center" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const order = currentOrder?.data?.order;
  const items = currentOrder?.data?.items;

  return (
    <div className="container mt-5 pt-4" style={{ minHeight: 'calc(100vh - 56px)' }}>
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">
            <i className="bi bi-receipt me-2"></i>
            Order #{order.id}
          </h4>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4">
              <h6 className="text-muted">Order Date</h6>
              <p>
                {order?.created_at
                  ? new Date(order.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div className="col-md-4">
              <h6 className="text-muted">Status</h6>
              <p
                className={`badge ${statusClasses[order?.status as OrderStatus] || "bg-secondary"
                  }`}
              >
                {order?.status || "Unknown"}
              </p>
            </div>
            <div className="col-md-4">
              <h6 className="text-muted">
                {order?.delivered_at ? "Delivered On" : "Expected Delivery"}
              </h6>
              <p
                className={`fw-semibold ${order?.delivered_at ? "text-success" : order?.expected_delivery ? "text-" : "text-muted"
                  }`}
              >
                {order?.delivered_at
                  ? new Date(order.delivered_at).toLocaleDateString()
                  : order?.expected_delivery
                    ? new Date(order.expected_delivery).toLocaleDateString()
                    : "-"}
              </p>
            </div>
          </div>

          <div className="alert alert-dark">
            <div className="d-flex justify-content-between">
              <strong>Order Total</strong>
              <strong className="text-danger">₹{order.total}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">
            <i className="bi bi-cart3 me-2"></i>
            Order Items
          </h5>
        </div>
        <div className="card-body p-0">
          <ul className="list-group list-group-flush">
            {items.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  {item.product_image && (
                    <img
                      src={`${process.env.REACT_APP_API_URL}${item.product_image}`}
                      alt={item.product_name}
                      className="rounded me-3"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                  )}
                  <div>
                    <h6 className="mb-1 text-dark">
                      {item.product_name}
                    </h6>
                    <small className="text-muted">Qty: {item.quantity}</small>
                  </div>
                </div>

                <div className="text-end">
                  <span className="text-dark">₹{item.price}</span>
                  <br />
                  <small className="text-muted">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-3 text-end">
        <button className="btn btn-outline-dark me-2">
          <i className="bi bi-printer me-2"></i>Print Invoice
        </button>
        <button className="btn btn-danger">
          <i className="bi bi-headset me-2"></i>Need Help?
        </button>
      </div>
    </div>
  );
}

export default OrderDetails;