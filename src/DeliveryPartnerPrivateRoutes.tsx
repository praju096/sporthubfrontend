import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "./store";

const DeliveryPartnerPrivateRoute = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user && user.role === "delivery_partner" ? (
    <Outlet />
  ) : (
    <Navigate to="/deliverypartner/login" />
  );
};

export default DeliveryPartnerPrivateRoute;
