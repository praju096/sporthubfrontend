import { categoriesItemApiResponse } from "../types/categoriesItemTypes";
import API from "./axios";
import { categoriesItem } from './../types/categoriesItemTypes';


const getAllCategoriesitems = async (): Promise<categoriesItemApiResponse> => {
    const res = await API.get<categoriesItemApiResponse>('/api/categoriesitem');
    return res.data;
};
const getByIdCategoriesitem = async (id: number): Promise<categoriesItem> => {
    const res = await API.get<{ data: categoriesItem }>(`/api/categoriesitem/${id}`);
    return res.data.data;
}
const createCategoriesitem = async (categoriesItem: { category_name: string }): Promise<categoriesItem> => {
    const res = await API.post<{ data: categoriesItem }>(`/api/categoriesitem`, categoriesItem);
    return res.data.data;
}
const updateCategoriesitem = async (id: number, categoriesItem: { category_name: string }): Promise<categoriesItem> => {
    const res = await API.put<{ data: categoriesItem }>(`/api/categoriesitem/${id}`, categoriesItem);
    return res.data.data;
}
const deleteCategoriesitem = async (id: number): Promise<{ message: string }> => {
    const res = await API.delete<{ message: string }>(`/api/categoriesitem/${id}`);
    return res.data;
}

const categoriesItemApi = {
    getAll: getAllCategoriesitems,
    getById: getByIdCategoriesitem,
    create: createCategoriesitem,
    update: updateCategoriesitem,
    delete: deleteCategoriesitem,
}
export default categoriesItemApi;