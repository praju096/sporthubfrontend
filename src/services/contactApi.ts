import API from "./axios";
import { Contact, ContactFormData } from "../types/contactTypes";

export const createContact = async (data: ContactFormData): Promise<Contact> => {
    const response = await API.post('/api/contact', data);
    return response.data;
};

export const getContacts = async () => {
    const response = await API.get('/api/contact');
    return response.data;
};

export const deleteContact = async (id: number) => {
    const response = await API.delete(`/api/contact/${id}`);
    return response.data;
};
