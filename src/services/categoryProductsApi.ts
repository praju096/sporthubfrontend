import API from "./axios";

export const getProductsByCategory = async (category: string) => {
  const response = await API.get(`/api/categories/${category}`);
  return response.data;
};
