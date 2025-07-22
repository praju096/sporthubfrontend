import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../types/authTypes";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUsers } from "../../redux/features/authSlice";
import { AppDispatch, RootState } from "../../store";
import { registerSchema } from "../../types/validation/registerSchema";

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<RegisterUser>({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterUser) => {
    try {
      const resultAction = await dispatch(registerUsers(data));
      if (registerUsers.fulfilled.match(resultAction)) {
        toast.success("Registered successfully. Please login.");
        navigate("/login");
      } else {
        toast.error(resultAction.payload as string);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light" style={{background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card border-0 shadow-sm rounded-4" style={{ marginTop: '70px' }}>
              <div className="card-body p-4 p-md-5">
                {/* Header */}
                <div className="text-center mb-5">
                  <h2 className="text-danger fw-bold mb-3">JOIN OUR COMMUNITY</h2>
                  <p className="text-muted mb-0">
                    Create your SPORTHUB account
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Full Name Field */}
                  <div className="mb-4">
                    <label className="form-label text-dark">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <i className="fas fa-user text-muted"></i>
                      </span>
                      <input
                        {...register("fullname")}
                        className={`form-control border-start-0 ${errors.fullname && touchedFields.fullname ? "is-invalid" : ""}`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.fullname && (
                      <div className="invalid-feedback d-block">
                        {errors.fullname.message}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="mb-4">
                    <label className="form-label text-dark">Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <i className="fas fa-envelope text-muted"></i>
                      </span>
                      <input
                        {...register("email")}
                        className={`form-control border-start-0 ${errors.email && touchedFields.email ? "is-invalid" : ""}`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label className="form-label text-dark">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <i className="fas fa-lock text-muted"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className={`form-control border-start-0 ${errors.password && touchedFields.password ? "is-invalid" : ""}`}
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        className="input-group-text bg-white border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-muted`}></i>
                      </button>
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="mb-4">
                    <label className="form-label text-dark">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <i className="fas fa-lock text-muted"></i>
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        className={`form-control border-start-0 ${errors.confirmPassword && touchedFields.confirmPassword ? "is-invalid" : ""}`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        className="input-group-text bg-white border-start-0"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} text-muted`}></i>
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="invalid-feedback d-block">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-danger w-100 py-2 mb-3 fw-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Registering...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>

                  {/* Login Link */}
                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Already have an account?{" "}
                      <Link to="/login" className="text-decoration-none text-danger fw-bold">
                        Login
                      </Link>
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="position-relative my-4">
                    <hr className="my-4" />
                    <div className="position-absolute top-50 start-50 translate-middle bg-white px-3 small text-muted">
                      OR
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="d-flex gap-3">
                    <button
                      type="button"
                      className="btn btn-outline-secondary flex-grow-1 rounded-3"
                    >
                      <i className="fab fa-google me-2 text-danger"></i>
                      Google
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary flex-grow-1 rounded-3"
                    >
                      <i className="fab fa-apple me-2"></i>
                      Apple
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;