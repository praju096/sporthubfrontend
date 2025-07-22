import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "./store";

const AdminPrivateRoute = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" />
  );
};

export default AdminPrivateRoute;
