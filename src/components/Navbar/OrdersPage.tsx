import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { fetchOrdersUser } from '../../redux/features/order/orderSlice';
import { OrderStatus, statusClasses } from '../../types/orderTypes';

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading } = useSelector((s: RootState) => s.order as any);

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

  return (
    <div className="container mt-5 pt-4" style={{ minHeight: 'calc(100vh - 56px)' }}>
      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">
            <i className="bi bi-list-ul me-2"></i>
            Your Order History
          </h4>
        </div>
        
        <div className="card-body p-0">
          {orders.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-box-seam display-4 text-muted mb-3"></i>
              <h5 className="text-muted">No orders found</h5>
              <p className="text-muted">You haven't placed any orders yet</p>
              <Link to="/" className="btn btn-danger mt-3">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0">Order #</th>
                    <th className="border-0">Date</th>
                    <th className="border-0">Status</th>
                    <th className="border-0 text-end">Total</th>
                    <th className="border-0"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o: any) => (
                    <tr key={o.id}>
                      <td className="text-dark fw-semibold">#{o.id}</td>
                      <td>{new Date(o.created_at).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${statusClasses[o.status as OrderStatus] || "bg-secondary"}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="text-end text-danger fw-bold">₹{o.total}</td>
                      <td className="text-end">
                        <Link 
                          to={`/orders/${o.id}`} 
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

        {orders.length > 0 && (
          <div className="card-footer bg-light text-end">
            <small className="text-muted">Showing {orders.length} orders</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;