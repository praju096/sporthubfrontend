import * as yup from "yup";

export const registerSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z ]*$/, "Only letters and spaces are allowed")
    .trim(),
  email: yup
    .string()
    .trim()
    .required("Email is Required")
    .email("Invalid Email")
    .min(10, "Email must be at least 10 characters.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid Email format"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required.")
    .when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: () => yup.string().oneOf([yup.ref("password")], "not Match"),
    }),
});