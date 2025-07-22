import React from 'react';

const ManageWishlist: React.FC = () => {
  const wishlist = [
    { id: 1, product: 'Football Shoes', user: 'John Doe' },
    { id: 2, product: 'Running Shorts', user: 'Jane Smith' },
  ];

  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4"><i className={`fas fa-heart`}></i> Manage Wishlist</h3>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>{item.product}</td>
              <td><button className="btn btn-sm btn-danger">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageWishlist;
