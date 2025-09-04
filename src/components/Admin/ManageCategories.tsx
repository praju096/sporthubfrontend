import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { categoriesItem } from '../../types/categoriesItemTypes';
import { addCategoriesItem, deleteCategoriesItem, fetchCategoriesItem, updateCategoriesItem } from '../../redux/features/categoryItem/categoryItemSlice';
import { toast } from 'react-toastify';

const categoryItemSchema = yup.object({
  category_name: yup
    .string()
    .required('CategoryItem name is required')
    .min(2, 'CategoryItem name must be at least 2 characters')
    .max(50, 'CategoryItem name must not exceed 50 characters')
});

type categoryItemSchemaFormData = yup.InferType<typeof categoryItemSchema>;

const ManageCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoriesItem, loading, error } = useSelector((state: RootState) => state.categories);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    setFocus
  } = useForm<categoryItemSchemaFormData>({
    resolver: yupResolver(categoryItemSchema),
    defaultValues: {
      category_name: ''
    }
  });

  const [editing, setEditing] = useState<categoriesItem | null>(null);

  useEffect(() => {
    dispatch(fetchCategoriesItem());
  }, [dispatch]);

  useEffect(() => {
    if (editing) {
      setValue('category_name', editing.category_name);
      setFocus('category_name');
    } else {
      reset({ category_name: '' });
    }
  }, [editing, setValue, reset, setFocus]);

  const onSubmit = async (data: categoryItemSchemaFormData) => {
    try {
      if (editing) {
        await dispatch(updateCategoriesItem({
          id: editing.category_id,
          categoriesItem: { category_name: data.category_name }
        })).unwrap();
        toast.success("CategoryItem updated successfully");
      } else {
        await dispatch(addCategoriesItem({ category_name: data.category_name })).unwrap();
        toast.success("CategoryItem added successfully");
      }

      dispatch(fetchCategoriesItem());

      setEditing(null);
      reset();

    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    }
  };

  const handleDelete = async (categoriesItemId: number) => {
    if (window.confirm('Are you sure you want to delete this CategoryItem?')) {
      try {
        await dispatch(deleteCategoriesItem(categoriesItemId)).unwrap();
        toast.success("CategoryItem deleted successfully");
        dispatch(fetchCategoriesItem());
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete CategoryItem');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
    reset();
  };

  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4"><i className={`fas fa-copy text-danger`}></i> Manage Categories</h3>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex gap-2 mb-4">
          <div className="flex-grow-1">
            <input
              type="text"
              className={`form-control ${errors.category_name ? 'is-invalid' : ''}`}
              placeholder="Enter brand name"
              {...register('category_name')}
            />
            {errors.category_name && (
              <div className="invalid-feedback">
                {errors.category_name.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-danger"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : editing ? "Update" : "Add"}
          </button>

          {editing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancelEdit}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
        </form>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesItem.map(category => (
              <tr key={category.category_id}>
                <td>{category.category_id}</td>
                <td>{category.category_name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setEditing(category)}
                    disabled={isSubmitting}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(category.category_id)}
                    disabled={isSubmitting}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categoriesItem.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center">
                  No Categoriesitem found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCategories;
