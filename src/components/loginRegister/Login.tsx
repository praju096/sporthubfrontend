import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUsers } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginUser } from "../../types/authTypes";
import { AppDispatch, RootState } from "../../store";
import { loginUserSchema } from "../../types/validation/loginUserSchema";
import { fetchUserCart } from "../../redux/features/cart/cartSlice";
import { fetchWishlist } from "../../redux/features/wishlist/wishlistSlice";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginUser>({
    resolver: yupResolver(loginUserSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginUser) => {
    try {
      const resultAction = await dispatch(loginUsers(data));
      if (loginUsers.fulfilled.match(resultAction)) {
        toast.success("Login Successful");
        dispatch(fetchUserCart());
        dispatch(fetchWishlist());
        navigate("/welcome");
      } else {
        toast.error(resultAction.payload as string);
      }
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || "Login failed";
      toast.error(message);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light" style={{background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card border-0 shadow-sm rounded-4" style={{ marginTop: '70px' }}>
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-5">
                  <h2 className="text-danger fw-bold mb-3">WELCOME BACK</h2>
                  <p className="text-muted mb-0">
                    Sign in to access your SPORTHUB account
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                        placeholder="Enter your password"
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

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                      />
                      <label className="form-check-label small text-muted" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <Link to="#" className="small text-decoration-none text-danger">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-danger w-100 py-2 mb-3 fw-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>

                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-decoration-none text-danger fw-bold">
                        Register
                      </Link>
                    </p>
                  </div>

                  <div className="position-relative my-4">
                    <hr className="my-4" />
                    <div className="position-absolute top-50 start-50 translate-middle bg-white px-3 small text-muted">
                      OR
                    </div>
                  </div>

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

export default Login;