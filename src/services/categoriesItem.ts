import { categoriesItemApiResponse } from "../types/categoriesItemTypes";
import API from "./axios";


const getAllCategoriesitems = async (): Promise<categoriesItemApiResponse> => {
    const res = await API.get<categoriesItemApiResponse>('/api/categoriesitem');
    return res.data;
};

const categoriesItemApi = {
    getAll: getAllCategoriesitems,
}
export default categoriesItemApi;