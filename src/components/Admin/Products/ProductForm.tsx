import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Product, ProductFormData } from "../../../types/productsTypes";
import { productSchema } from "../../../types/validation/productSchema";

interface ProductFormProps {
  onSubmit: SubmitHandler<ProductFormData>;
  onCancel: () => void;
  editProduct?: Product | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, onCancel, editProduct }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    mode: "onTouched",
  });

  React.useEffect(() => {
    if (editProduct) {
      Object.entries(editProduct).forEach(([key, value]) => {
        if (key in productSchema.fields) {
          setValue(key as keyof ProductFormData, value);
        }
      });
    } else {
      reset();
    }
  }, [editProduct, reset, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3 mb-4">
      <div className="col-md-4">
        <label className="form-label">
          Product Name<span className="text-danger">*</span>
        </label>
        <input
          type="text"
          placeholder="Product Name"
          className={`form-control ${errors.name && touchedFields.name ? "is-invalid" : ""}`}
          {...register("name")}
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label">
          Price<span className="text-danger">*</span>
        </label>
        <input
          type="number"
          placeholder="Price"
          step="0.01"
          className={`form-control ${errors.price && touchedFields.price ? "is-invalid" : ""}`}
          {...register("price")}
        />
        {errors.price && (
          <div className="invalid-feedback">{errors.price.message}</div>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label">Original Price</label>
        <input
          type="text"
          placeholder="Original Price (Optional)"
          className={`form-control ${errors.original_price && touchedFields.original_price ? "is-invalid" : ""}`}
          {...register("original_price")}
        />
        {errors.original_price && (
          <div className="invalid-feedback">
            {errors.original_price.message}
          </div>
        )}
      </div>

      <div className="col-12">
        <label className="form-label">
          Description<span className="text-danger">*</span>
        </label>
        <textarea
          rows={2}
          placeholder="Description"
          className={`form-control ${errors.description && touchedFields.description ? "is-invalid" : ""}`}
          {...register("description")}
        />
        {errors.description && (
          <div className="invalid-feedback">
            {errors.description.message}
          </div>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label">
          Image URL<span className="text-danger">* 300x300px</span>
        </label>
        <input
          type="file"
          accept="image/*"
          className={`form-control ${errors.image_url && touchedFields.image_url ? "is-invalid" : ""}`}
          {...register("image_url")}
        />
        {errors.image_url && (
          <div className="invalid-feedback">{errors.image_url.message}</div>
        )}
      </div>

      {editProduct && (
        <div className="col-md-4">
          <label className="form-label">Current Image</label>
          <br />
          <img
            src={`http://localhost:5000${editProduct.image_url}`}
            alt="Product"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
      )}

      <div className="col-md-4">
        <label className="form-label">
          Gender<span className="text-danger">*</span>
        </label>
        <select
          className={`form-select ${errors.category_gender && touchedFields.category_gender ? "is-invalid" : ""}`}
          {...register("category_gender")}
        >
          <option value="">Select Gender</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
        {errors.category_gender && (
          <div className="invalid-feedback">
            {errors.category_gender.message}
          </div>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label">
          Category<span className="text-danger">*</span>
        </label>
        <input
          type="text"
          placeholder="Category"
          className={`form-control ${errors.category && touchedFields.category ? "is-invalid" : ""}`}
          {...register("category")}
        />
        {errors.category && (
          <div className="invalid-feedback">{errors.category.message}</div>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label">
          Rating<span className="text-danger">*</span>
        </label>
        <input
          type="number"
          placeholder="Rating"
          step="0.01"
          className={`form-control ${errors.rating && touchedFields.rating ? "is-invalid" : ""}`}
          {...register("rating")}
        />
        {errors.rating && (
          <div className="invalid-feedback">{errors.rating.message}</div>
        )}
      </div>

      <div className="input-group mx-auto">
        <div className="col-md-2 form-check form-switch">
          <label className="form-label">New</label>
          <input
            className="form-check-input"
            type="checkbox"
            {...register("is_new")}
          />
        </div>
        <div className="col-md-2 form-check form-switch">
          <label className="form-label">On Sale</label>
          <input
            className="form-check-input"
            type="checkbox"
            {...register("is_on_sale")}
          />
        </div>
        <div className="col-md-2 form-check form-switch">
          <label className="form-label">Bestseller</label>
          <input
            className="form-check-input"
            type="checkbox"
            {...register("bestseller")}
          />
        </div>
        <div className="col-md-2 form-check form-switch">
          <label className="form-label">Featured</label>
          <input
            className="form-check-input"
            type="checkbox"
            {...register("featured_product")}
          />
        </div>
      </div>

      <div className="col-12 d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-danger">
          {editProduct ? "Update" : "Add"} Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;