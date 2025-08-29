import * as yup from "yup";
import { userDetailData } from "../userDetailTypes";

export const userDetailSchema: yup.ObjectSchema<userDetailData> = yup.object({
    user_id: yup
        .number()
        .optional()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        ) as yup.NumberSchema<number | undefined>,
    full_name: yup
        .string()
        .trim()
        .min(3, "User name must be at least 3 characters")
        .max(100, "User name must not exceed 100 characters")
        .required("User name is required"),
    phone: yup
        .string()
        .required("Phone no is required")
        .test(
            "is-valid-phone",
            "Phone number must contain only digits",
            (value) => /^[\d+]+$/.test(value ?? "")
        )
        .matches(/^[1-9][0-9]{9}$/, "Phone number must be exactly 10 digits"),
    address_line: yup
        .string()
        .trim()
        .min(10, "Address must be at least 10 characters")
        .max(1000, "Address must not exceed 1000 characters")
        .required("User Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    pincode: yup
        .string()
        .test(
            "is-valid-pincode",
            "Pincode must contain only digits",
            (value) => /^[\d+]+$/.test(value ?? "")
        )
        .matches(/^[1-9]{1}[0-9]{5}$/, "Pincode must be a 6-digit number")
        .required("Pincode is required"),
    country: yup.string().required("Country is required"),
});