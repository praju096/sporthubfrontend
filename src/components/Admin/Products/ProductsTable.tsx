import React from "react";
import { ProductsTableProps } from "../../../types/productsTypes";

const ProductsTable = ({ products, onEdit, onDelete, loading }:ProductsTableProps) => {
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Original</th>
            <th>Desc</th>
            <th>Gender</th>
            <th>Category</th>
            <th>Brand</th>
            <th>New</th>
            <th>Sale</th>
            <th>Best</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    className="rounded-5"
                    src={`${process.env.REACT_APP_API_URL}${product.image_url}`}
                    alt={product.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>
                  {product.original_price
                    ? `₹${product.original_price}`
                    : "-"}
                </td>
                <td>{product.description}</td>
                <td>{product.category_gender}</td>
                <td>{product.category_name}</td>
                <td>{product.brand_name}</td>
                <td>{product.is_new ? "Yes" : "No"}</td>
                <td>{product.is_on_sale ? "Yes" : "No"}</td>
                <td>{product.bestseller ? "Yes" : "No"}</td>
                <td>{product.featured_product ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={13} className="text-center text-muted">
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;