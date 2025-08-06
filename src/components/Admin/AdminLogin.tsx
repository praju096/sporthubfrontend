import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginAdmins } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginUser } from '../../types/authTypes';
import { AppDispatch, RootState } from '../../store';
import { adminSchema } from '../../types/validation/adminSchema';

const AdminLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginUser>({
    resolver: yupResolver(adminSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginUser) => {
    try {
      const resultAction = await dispatch(loginAdmins(data));

      if (loginAdmins.fulfilled.match(resultAction)) {
        toast.success("Login Admin Successful");
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="card p-5 shadow-lg" style={{ width: '400px', borderRadius: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h3 className="mb-4 text-center fw-bold">Admin Login</h3>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                {...register("email")}
                className={`form-control ${errors.email && touchedFields.email ? "is-invalid" : ""
                  }`}
                placeholder="Email"
              />
            </div>
            {errors.email && (<div className="invalid-feedback d-block">
              {errors.email?.message}
            </div>)}
          </div>

          <div className="mb-4">
            <div className="input-group has-validation">
              <span className="input-group-text bg-white">
                <i className="fas fa-lock"></i>
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password")}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
              </button>
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 py-2 fw-bold mb-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
