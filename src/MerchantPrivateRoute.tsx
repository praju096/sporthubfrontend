import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "./store";

const MerchantPrivateRoute = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user && user.role === "merchant" ? (
    <Outlet />
  ) : (
    <Navigate to="/merchant/login" />
  );
};

export default MerchantPrivateRoute;
