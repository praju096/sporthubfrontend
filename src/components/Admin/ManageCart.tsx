import React from 'react';

const ManageCart: React.FC = () => {
  const cartItems = [
    { id: 1, user: 'John Doe', product: 'Football Shoes', quantity: 2 },
    { id: 2, user: 'Jane Smith', product: 'Running Shorts', quantity: 1 },
  ];

  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4"><i className={`fas fa-cart-plus`}></i> Manage Cart</h3>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>{item.product}</td>
              <td>{item.quantity}</td>
              <td><button className="btn btn-sm btn-danger">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCart;
