import * as yup from "yup";
import { ProductFormData } from "../productsTypes";

export const productSchema: yup.ObjectSchema<ProductFormData> = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must not exceed 100 characters")
    .required("Product name is required"),
  price: yup
    .number()
    .typeError("Price must be a valid number")
    .positive("Price must be greater than 0")
    .max(999999, "Price is too high")
    .required("Price is required"),
  original_price: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" || isNaN(originalValue) ? null : Number(originalValue)
    )
    .positive("Original price must be greater than 0")
    .max(999999, "Original price is too high")
    .notRequired(),
  description: yup
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters")
    .required("Product description is required"),
  image_url: yup
    .mixed<File>()
    .required("Product image is required")
    .when("isEdit", {
      is: true,
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required("Product image is required"),
    })
    .test(
      "fileType",
      "Only JPEG, PNG and JPG are allowed",
      (value) => {
        if (!value) return true;
        if (typeof value === "string") return true;
        const file = value instanceof File ? value : value[0];

        return (
          file &&
          ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
        );
      }
    )
    .test("fileSize", "File size must be less than 2MB", (value) => {
      if (!value) return true;
      if (typeof value === "string") return true;
      const file = value instanceof File ? value : value?.[0];
      return file ? file.size <= 2 * 1024 * 1024 : true;
    }),
  category_gender: yup
    .mixed<"Men" | "Women" | "Kids">()
    .oneOf(["Men", "Women", "Kids"], "Select a valid gender")
    .required("Gender is required"),
  category: yup
    .string()
    .trim()
    .required("Category is required"),
  rating: yup
    .number()
    .typeError("Price must be a valid number")
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot be more than 5')
    .required('Rating is required'),
  is_new: yup.boolean().default(false),
  is_on_sale: yup.boolean().default(false),
  bestseller: yup.boolean().default(false),
  featured_product: yup.boolean().default(false),
});