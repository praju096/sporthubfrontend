import React, { useState } from 'react';

const ManageBrands = () => {
  const [brands, setBrands] = useState([
    { id: 1, name: 'Nike' },
    { id: 2, name: 'Adidas' },
  ]);
  const [newBrand, setNewBrand] = useState('');

  const addBrand = () => {
    if (!newBrand.trim()) return;
    setBrands(prev => [...prev, { id: prev.length + 1, name: newBrand }]);
    setNewBrand('');
  };

  const deleteBrand = (id: number) => {
    setBrands(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4"><i className={`fas fa-tag`}></i> Manage Brands</h3>

      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter brand name"
          value={newBrand}
          onChange={e => setNewBrand(e.target.value)}
        />
        <button className="btn btn-success" onClick={addBrand}>Add Brand</button>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map(brand => (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => deleteBrand(brand.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBrands;
