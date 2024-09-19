// slices/authSlice.js
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import http from '@/components/helpers/http';
import { doObjToFormData } from '@/components/helpers/helpers';
import { setCookie } from "cookies-next";
import Text from '@/components/components/text';
import toast from 'react-hot-toast';


export const saveContactQuery = createAsyncThunk(
    'save-contact-message',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await http.post("save-contact-message", doObjToFormData(formData));
            const { data } = response;
            if (data.validationErrors) {
                toast.error(<Text string={data?.validationErrors} />)
            } else if (data?.status === 1) {
                toast.success(data?.msg)

            } else {
                toast.error(data?.msg)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const saveNewsletter = createAsyncThunk(
    'save-newsletter',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await http.post("save-newsletter", doObjToFormData(formData));
            const { data } = response;
            if (data.validation_error) {
                toast.error(<Text string={data?.validation_error} />)
            } else if (data?.status === 1) {
                toast.success(data?.msg)

            } else {
                toast.error(data?.msg)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const updateContactForm = createAction('update-contact-form');

const initialState = {
    error: false,
    isFormProcessing: false,
    emptyFormData: false,
    isNewsLetterFormProcessing: false,
    isNewsletterSaved: false,
    isContactSaved: false,
};

const contactUsSlice = createSlice({
    name: 'contactUs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveContactQuery.pending, (state) => {
                state.isFormProcessing = true;
            })
            .addCase(saveContactQuery.fulfilled, (state, action) => {
                state.isFormProcessing = false;
                state.isContactSaved = true
            })
            .addCase(saveContactQuery.rejected, (state) => {
                state.isFormProcessing = false;
            })

            .addCase(saveNewsletter.pending, (state) => {
                state.isNewsLetterFormProcessing = true;
            })
            .addCase(saveNewsletter.fulfilled, (state, action) => {
                state.isNewsLetterFormProcessing = false;
                state.isNewsletterSaved = true
            })
            .addCase(saveNewsletter.rejected, (state) => {
                state.isNewsLetterFormProcessing = false;
            })
            .addCase(updateContactForm, (state, action) => {
                state.isContactSaved = false;
            });



    },
});

export default contactUsSlice.reducer;
