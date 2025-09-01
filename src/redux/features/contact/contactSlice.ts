import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    createContact,
    getContacts,
    deleteContact,
} from "../../../services/contactApi";
import { Contact, ContactFormData } from "../../../types/contactTypes";

interface ContactState {
    contacts: Contact[];
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: ContactState = {
    contacts: [],
    loading: false,
    error: null,
    successMessage: null,
};

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const res = await getContacts();
        return res.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Failed to fetch contacts");
    }
});

export const addContact = createAsyncThunk("contacts/add", async (data: ContactFormData, { rejectWithValue }) => {
    try {
        await createContact(data);
        return true;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Failed to create contact");
    }
});

export const removeContact = createAsyncThunk("contacts/delete", async (id: number, { rejectWithValue }) => {
    try {
        await deleteContact(id);
        return id;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Failed to delete contact");
    }
});

const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Add contact
            .addCase(addContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete
            .addCase(removeContact.fulfilled, (state, action: PayloadAction<number>) => {
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
            })
            .addCase(removeContact.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default contactSlice.reducer;
