import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Footer from '../Home/Footer';

interface OrderItem {
  id: string;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

const orders: OrderItem[] = [
  {
    id: 'ORD-1001',
    date: '2025-07-05',
    status: 'Shipped',
    total: 199.99,
    items: [
      {
        name: 'Nike Air Max',
        quantity: 1,
        price: 120.0,
        image: 'https://via.placeholder.com/60',
      },
      {
        name: 'Adidas Shorts',
        quantity: 2,
        price: 39.99,
        image: 'https://via.placeholder.com/60',
      },
    ],
  },
  {
    id: 'ORD-1002',
    date: '2025-07-02',
    status: 'Delivered',
    total: 89.99,
    items: [
      {
        name: 'Puma Cap',
        quantity: 1,
        price: 29.99,
        image: 'https://via.placeholder.com/60',
      },
      {
        name: 'Under Armour T-Shirt',
        quantity: 1,
        price: 60.0,
        image: 'https://via.placeholder.com/60',
      },
    ],
  },
];

const statusColorMap = {
  Pending: 'warning',
  Shipped: 'info',
  Delivered: 'success',
  Cancelled: 'danger',
};

const Order: React.FC = () => {
  return (<>
    <div className="container py-5 mt-5">
      <h2 className="mb-4 fw-bold">Your Orders
      </h2>

      {orders.map((order) => (
        <div key={order.id} className="card shadow-lg mb-4 rounded-4 border-0">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center rounded-top-4 px-4 py-3">
            <div>
              <h5 className="mb-0 fw-semibold">
                <i className="fa fa-receipt me-2 text-danger"></i>Order #{order.id}
              </h5>
              <small className="text-muted">Placed on: {order.date}</small>
            </div>
            <span className={`badge bg-${statusColorMap[order.status]} px-3 py-2 rounded-pill`}>
              {order.status}
            </span>
          </div>

          <div className="card-body p-4">
            {order.items.map((item, index) => (
              <div key={index} className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-3">
                <div className="d-flex align-items-center">
                  <img src={item.image} alt={item.name} className="rounded-3 me-3" width="60" height="60" />
                  <div>
                    <h6 className="mb-1">{item.name}</h6>
                    <small className="text-muted">Qty: {item.quantity}</small>
                  </div>
                </div>
                <div className="text-end fw-semibold text-dark">₹{(item.quantity * item.price).toFixed(2)}</div>
              </div>
            ))}

            <div className="d-flex justify-content-end mt-3">
              <h5 className="text-danger">
                <i className="fa fa-credit-card me-2"></i>Total: ₹{order.total.toFixed(2)}
              </h5>
            </div>
          </div>
        </div>
      ))}
      
    </div>
    <Footer />
    </>
  );
};

export default Order;
