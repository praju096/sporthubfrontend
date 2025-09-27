import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductFormData, ProductFormProps } from "../../../types/productsTypes";
import { productSchema } from "../../../types/validation/productSchema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { fetchBrands } from "../../../redux/features/brand/brandSlice";
import { fetchCategoriesItem } from "../../../redux/features/categoryItem/categoryItemSlice";

const ProductForm = ({ onSubmit, onCancel, editProduct }: ProductFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoriesItem, loading: catLoading } = useSelector(
    (state: RootState) => state.categories
  );
  const { brands, loading: brandLoading } = useSelector(
    (state: RootState) => state.brands
  );

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

  useEffect(() => {
    dispatch(fetchCategoriesItem());
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    if (editProduct) {
      Object.entries(editProduct).forEach(([key, value]) => {
        if (key in productSchema.fields && key !== "category_id" && key !== "brand_id") {
          setValue(key as keyof ProductFormData, value);
        }
      });

      if (categoriesItem.length > 0) {
        if (editProduct.category_id) {
          setValue("category_id", editProduct.category_id);
        } else if (editProduct.category_name) {
          const categories = categoriesItem.find(
            (category) => category.category_name === editProduct.category_name
          );
          if (categories) {
            setValue("category_id", categories.category_id);
          }
        }
      }

      if (brands.length > 0) {
        if (editProduct.brand_id) {
          setValue("brand_id", editProduct.brand_id);
        } else if (editProduct.brand_name) {
          const brandName = brands.find(
            (brand) => brand.brand_name === editProduct.brand_name
          );
          if (brandName) {
            setValue("brand_id", brandName.brand_id);
          }
        }
      }
    } else {
      reset();
    }
  }, [editProduct, categoriesItem, brands, reset, setValue]);


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
            src={`${process.env.REACT_APP_API_URL}${editProduct.image_url}`}
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
        <select
          className={`form-select ${errors.category_id && touchedFields.category_id ? "is-invalid" : ""}`}
          {...register("category_id")}
        >
          <option value="">Select Category</option>
          {catLoading ? (
            <option disabled>Loading...</option>
          ) : (
            categoriesItem.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </option>
            ))
          )}
        </select>
        {errors.category_id && (
          <div className="invalid-feedback">{errors.category_id.message}</div>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label">
          Brand<span className="text-danger">*</span>
        </label>
        <select
          className={`form-select ${errors.brand_id && touchedFields.brand_id ? "is-invalid" : ""}`}
          {...register("brand_id")}
        >
          <option value="">Select Brand</option>
          {brandLoading ? (
            <option disabled>Loading...</option>
          ) : (
            brands.map((brand) => (
              <option key={brand.brand_id} value={brand.brand_id}>
                {brand.brand_name}
              </option>
            ))
          )}
        </select>
        {errors.brand_id && (
          <div className="invalid-feedback">{errors.brand_id.message}</div>
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
