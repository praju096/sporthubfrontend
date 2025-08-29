import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { fetchOrdersUser } from '../../redux/features/order/orderSlice';
import { orderDetail, OrderStatus, statusClasses } from '../../types/orderTypes';

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    dispatch(fetchOrdersUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container mt-5 pt-4 text-center" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const activeOrders = orders.filter(order => order.status !== "delivered");
  const deliveredOrders = orders.filter(order => order.status === "delivered");

  const renderTable = (
    list: orderDetail[],
    title: string,
    showExpected: boolean
  ) => (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">{title}</h5>
      </div>
      <div className="card-body p-0">
        {list.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-box-seam display-4 text-muted mb-3"></i>
            <h5 className="text-muted">No {title.toLowerCase()} found</h5>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0">Order #</th>
                  <th className="border-0">Order Date</th>
                  <th className="border-0">Status</th>
                  <th className="border-0">Total</th>
                  {showExpected ? (
                    <th className="border-0 text-center">Expected Delivery</th>
                  ) : (
                    <th className="border-0 text-center">Delivered At</th>
                  )}
                  <th className="border-0"></th>
                </tr>
              </thead>
              <tbody>
                {list.map(order => (
                  <tr key={order.id}>
                    <td className="text-dark fw-semibold">#{order.id}</td>
                    <td>{order?.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}</td>
                    <td>
                      <span className={`badge ${statusClasses[order.status as OrderStatus] || "bg-secondary"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-danger fw-bold">₹{order.total}</td>
                    {showExpected ? (
                      <td className="text-center">
                        {order.expected_delivery
                          ? new Date(order.expected_delivery).toLocaleDateString()
                          : "-"}
                      </td>
                    ) : (
                      <td className="text-center">
                        {order.delivered_at
                          ? new Date(order.delivered_at).toLocaleDateString()
                          : "-"}
                      </td>
                    )}
                    <td className="text-end">
                      <Link
                        to={`/orders/${order.id}`}
                        className="btn btn-sm btn-outline-dark"
                      >
                        <i className="bi bi-eye me-1"></i> Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {list.length > 0 && (
        <div className="card-footer bg-light text-end">
          <small className="text-muted">Showing {list.length} orders</small>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mt-5 pt-4" style={{ minHeight: 'calc(100vh - 56px)' }}>
      {renderTable(activeOrders, "Active Orders", true)}
      {renderTable(deliveredOrders, "Delivered Orders", false)}
    </div>
  );
};

export default OrdersPage;
