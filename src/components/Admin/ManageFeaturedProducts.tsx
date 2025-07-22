import React from 'react';

const ManageFeaturedProducts: React.FC = () => {
  const featured = [
    { id: 1, name: 'Training Shorts', price: 25 },
    { id: 2, name: 'Basketball Shoes', price: 60 },
  ];

  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4"><i className={`fas fa-briefcase`}></i> Manage Featured Products</h3>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {featured.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageFeaturedProducts;
