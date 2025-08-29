import React, { useState } from 'react';
import Footer from '../Home/Footer';

const TrackOrder: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [error, setError] = useState('');

  const demoOrders = [
    { id: 'ORD12345', status: 'Shipped', date: '2023-10-15', items: 2, total: '$89.98' },
    { id: 'ORD67890', status: 'Processing', date: '2023-10-20', items: 1, total: '$49.99' }
  ];

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const foundOrder = demoOrders.find(order => order.id === orderId);
    if (foundOrder) {
      setOrderDetails(foundOrder);
      setError('');
    } else {
      setOrderDetails(null);
      setError('Order not found. Please check your order number.');
    }
  };

  return (
    <div>
      <div className="container py-4 mt-5" style={{ backgroundColor: 'white' }}>
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <h2 className="mb-4 text-black">Track Your Order</h2>
            <div className="card border-danger mb-4">
              <div className="card-header bg-danger text-white">
                <h5 className="mb-0">Order Lookup</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleTrack}>
                  <div className="mb-3">
                    <label htmlFor="orderId" className="form-label text-black">Order Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="orderId"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="Enter your order ID"
                      required
                    />
                    <div className="form-text text-muted">Found in your order confirmation email</div>
                  </div>
                  <button type="submit" className="btn btn-danger">Track Order</button>
                </form>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            {orderDetails && (
              <div className="card border-black">
                <div className="card-header bg-black text-white">
                  <h5 className="mb-0">Order #{orderDetails.id}</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h6 className="text-danger">Order Status</h6>
                      <p className="text-black">{orderDetails.status}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-danger">Order Date</h6>
                      <p className="text-black">{orderDetails.date}</p>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h6 className="text-danger">Items</h6>
                      <p className="text-black">{orderDetails.items}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-danger">Total Amount</h6>
                      <p className="text-black">{orderDetails.total}</p>
                    </div>
                  </div>
                  <div className="progress mt-2" style={{ height: '10px' }}>
                    <div
                      className={`progress-bar ${orderDetails.status === 'Shipped' ? 'bg-danger' : 'bg-warning'}`}
                      style={{ width: orderDetails.status === 'Shipped' ? '100%' : '60%' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrder;
