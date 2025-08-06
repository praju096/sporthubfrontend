import React, { useState } from 'react';

const ManageOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', total: 150, status: 'Delivered' },
    { id: 2, customer: 'Jane Smith', total: 80, status: 'Pending' },
  ]);

  const updateStatus = (id: number, newStatus: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4"><i className="fas fa-shipping-fast"></i> Manage Orders</h3>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={order.status}
                    onChange={e => updateStatus(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td><button className="btn btn-sm btn-danger">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;

