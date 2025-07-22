export type RegisterUser = {
  _id?: string;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: {
    _id: string;
    fullname: string;
    email: string;
    role: string;
  };
};
