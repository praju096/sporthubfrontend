import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import {
  fetchPaginatedProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./../../../redux/features/products/productSlice";
import { Product, ProductFormData } from "../../../types/productsTypes";
import { toast } from "react-toastify";
import ProductForm from "./ProductForm";
import ProductsTable from "./ProductsTable";
import PaginationControls from "./PaginationControls";


const ManageProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsWithPage: products, loading, page, totalPages } = useSelector(
    (state: RootState) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [showProductForm, setShowProductForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchPaginatedProducts({ page: currentPage, limit }));
  }, [dispatch, currentPage]);

  const handleSubmit = async (data: ProductFormData) => {
    try {
      if (editProduct) {
        await dispatch(updateProduct({ id: editProduct.id, product: data }));
        toast.success("Product Edit Successfully");
      } else {
        await dispatch(addProduct(data));
        toast.success("Product Add Successfully");
      }
      setEditProduct(null);
      setShowProductForm(false);
      dispatch(fetchPaginatedProducts({ page: currentPage, limit }));
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setShowProductForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteProduct(id));
      dispatch(fetchPaginatedProducts({ page: currentPage, limit }));
      toast.error("Product Delete Successfully");
    }
  };

  const handleCancel = () => {
    setEditProduct(null);
    setShowProductForm(false);
  };

  const handlePrevPage = () => setCurrentPage((prev) => prev - 1);
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);

  return (
    <div className="card shadow rounded-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>
          <i className="fas fa-archive text-danger"></i> Manage Products
        </h3>
        {!showProductForm && (
          <button className="btn btn-danger" onClick={() => setShowProductForm(true)}>
            <i className="fas fa-plus me-2"></i>
            {editProduct ? "Edit Product" : "Add Product"}
          </button>
        )}
      </div>

      {showProductForm && (
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          editProduct={editProduct}
        />
      )}

      <ProductsTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        page={page}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
      />
    </div>
  );
};

export default ManageProducts;