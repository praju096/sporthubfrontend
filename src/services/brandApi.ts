import { brandApiResponse } from "../types/brandTypes";
import API from "./axios";

const getAllBrands = async (): Promise<brandApiResponse> => {
    const res = await API.get<brandApiResponse>('/api/brand');
    return res.data;
};

const brandApi = {
    getAll: getAllBrands,
}
export default brandApi;