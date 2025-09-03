import { brandApiResponse, Brand } from "../types/brandTypes";
import API from "./axios";

const getAllBrands = async (): Promise<brandApiResponse> => {
    const res = await API.get<brandApiResponse>('/api/brand');
    return res.data;
};

const getById = async (id: number): Promise<Brand> => {
    const res = await API.get<{ data: Brand }>(`api/brand/${id}`);
    return res.data.data;
};

const createBrand = async (brand: { brand_name: string }): Promise<Brand> => {
    const res = await API.post<{ data: Brand }>(`/api/brand`, brand);
    return res.data.data;
};

const updateBrand = async (id: number, brand: { brand_name: string }): Promise<Brand> => {
    const res = await API.put<{ data: Brand }>(`/api/brand/${id}`, brand);
    return res.data.data;
};

const deleteBrand = async (id: number): Promise<{ message: string }> => {
    const res = await API.delete<{ message: string }>(`/api/brand/${id}`);
    return res.data;
};

const brandApi = {
    getAll: getAllBrands,
    getByIdBrand: getById,
    create: createBrand,
    update: updateBrand,
    delete: deleteBrand,
};
export default brandApi;