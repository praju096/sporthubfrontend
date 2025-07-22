import React from 'react';

const ManageBestsellers: React.FC = () => {
  const bestsellers = [
    { id: 1, name: 'Running T-shirt', sales: 120 },
    { id: 2, name: 'Yoga Pants', sales: 98 },
  ];

  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4"><i className={`fas fa-fire`}></i> Manage Bestsellers</h3>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Sales</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bestsellers.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.sales}</td>
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

export default ManageBestsellers;
