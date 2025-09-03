import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AppDispatch, RootState } from '../../store';
import { Brand } from '../../types/brandTypes';
import { addBrand, deleteBrand, fetchBrands, updateBrand } from '../../redux/features/brand/brandSlice';
import { toast } from 'react-toastify';

// Yup validation schema
const brandSchema = yup.object({
  brand_name: yup
    .string()
    .required('Brand name is required')
    .min(2, 'Brand name must be at least 2 characters')
    .max(50, 'Brand name must not exceed 50 characters')
});

type BrandFormData = yup.InferType<typeof brandSchema>;

const ManageBrands = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { brands, loading, error } = useSelector((state: RootState) => state.brands);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    setFocus
  } = useForm<BrandFormData>({
    resolver: yupResolver(brandSchema),
    defaultValues: {
      brand_name: ''
    }
  });

  const [editing, setEditing] = React.useState<Brand | null>(null);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  // Reset form when editing changes
  useEffect(() => {
    if (editing) {
      setValue('brand_name', editing.brand_name);
      setFocus('brand_name');
    } else {
      reset({ brand_name: '' });
    }
  }, [editing, setValue, reset, setFocus]);

  const onSubmit = async (data: BrandFormData) => {
    try {
      if (editing) {
        await dispatch(updateBrand({ 
          id: editing.brand_id, 
          brand: { brand_name: data.brand_name } 
        })).unwrap();
        toast.success("Brand updated successfully");
      } else {
        await dispatch(addBrand({ brand_name: data.brand_name })).unwrap();
        toast.success("Brand added successfully");
      }
      
      // Refresh the brands list
      dispatch(fetchBrands());
      
      // Reset form and editing state
      setEditing(null);
      reset();
      
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    }
  };

  const handleDelete = async (brandId: number) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        await dispatch(deleteBrand(brandId)).unwrap();
        toast.success("Brand deleted successfully");
        dispatch(fetchBrands());
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete brand');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
    reset();
  };

  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4"><i className={`fas fa-tag`}></i> Manage Brands</h3>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex gap-2 mb-4">
          <div className="flex-grow-1">
            <input
              type="text"
              className={`form-control ${errors.brand_name ? 'is-invalid' : ''}`}
              placeholder="Enter brand name"
              {...register('brand_name')}
            />
            {errors.brand_name && (
              <div className="invalid-feedback">
                {errors.brand_name.message}
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
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map(brand => (
              <tr key={brand.brand_id}>
                <td>{brand.brand_id}</td>
                <td>{brand.brand_name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setEditing(brand)}
                    disabled={isSubmitting}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(brand.brand_id)}
                    disabled={isSubmitting}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center">
                  No brands found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageBrands;