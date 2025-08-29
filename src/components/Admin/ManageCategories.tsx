import React, { useState } from 'react';

const ManageCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Men' },
    { id: 2, name: 'Women' },
  ]);
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory = { id: categories.length + 1, name: categoryName };
    setCategories([...categories, newCategory]);
    setCategoryName('');
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4"><i className={`fas fa-copy text-danger`}></i> Manage Categories</h3>

      <form onSubmit={handleAddCategory} className="row g-3 mb-4">
        <div className="col-md-10">
          <input
            type="text"
            className="form-control"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-danger w-100">Add</button>
        </div>
      </form>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCategory(cat.id)}>
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

export default ManageCategories;
