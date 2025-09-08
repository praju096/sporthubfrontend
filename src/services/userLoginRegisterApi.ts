import { AuthResponse, LoginUser, RegisterUser } from "../types/authTypes";
import API from "./axios";

const createUser = async (userData: RegisterUser): Promise<AuthResponse> => {
  const payload = {
    fullname: userData.fullname,
    email: userData.email,
    password: userData.password,
    confirmPassword: userData.confirmPassword,
  };
  const res = await API.post("/api/auth/register", payload);
  if (res.data.status === "success") {
    return res.data.data;
  } else {
    throw new Error(res.data.message || "Register failed");
  }
};

const loginUserAuth = async (userData: LoginUser): Promise<AuthResponse> => {
  const payload = {
    email: userData.email,
    password: userData.password,
  };
  const res = await API.post("/api/auth/login", payload);
  if (res.data.status === "success") {
    return res.data.data;
  } else {
    throw new Error(res.data.message || "Login failed");
  }
};

const loginAdminAuth = async (userData: LoginUser): Promise<AuthResponse> => {
  const payload = {
    email: userData.email,
    password: userData.password,
  };
  const res = await API.post("/api/admin/auth/login", payload);
  if (res.data.status === "success") {
    return res.data.data;
  } else {
    throw new Error(res.data.message || "Admin Login failed");
  }
};

const loginMerchantAuth = async (userData: LoginUser): Promise<AuthResponse> => {
  const payload = {
    email: userData.email,
    password: userData.password,
  };
  const res = await API.post("/api/merchant/auth/login", payload);
  if (res.data.status === "success") {
    return res.data.data;
  } else {
    throw new Error(res.data.message || "Merchant Login failed");
  }
};

const loginDeliverypartnerAuth = async (userData: LoginUser): Promise<AuthResponse> => {
  const payload = {
    email: userData.email,
    password: userData.password,
  };
  const res = await API.post("/api/deliverypartner/auth/login", payload);
  if (res.data.status === "success") {
    return res.data.data;
  } else {
    throw new Error(res.data.message || "Delivery Partner Login failed");
  }
};

const profileUser = async ()=>{
  const res = await API.get("/api/auth/profile");
  return res.data;
};

const logout = async () => {
  await API.post("/api/auth/logout");
  return null;
};

const adminLogout = async () => {
  await API.post("/api/admin/auth/logout");
  return null;
};

const merchantLogout = async () => {
  await API.post("/api/merchant/auth/logout");
  return null;
};

const deliveryPartnerLogout = async () => {
  await API.post("/api/deliverypartner/auth/logout");
  return null;
};

const userLoginRegisterApi = {
  registerUser: createUser,
  loginUser: loginUserAuth,
  loginAdmin: loginAdminAuth,
  loginMerchant: loginMerchantAuth,
  loginDeliveryPartner: loginDeliverypartnerAuth,
  userProfile: profileUser,
  logoutUser: logout,
  logoutAdmin: adminLogout,
  logoutMerchant: merchantLogout,
  logoutDeliveryPartner: deliveryPartnerLogout,
};

export default userLoginRegisterApi;