// reducers/contactSlice.js
import { createSlice } from '@reduxjs/toolkit';
import http from "../../helpers/http";
import { doObjToFormData } from "../../helpers/helpers";
import toast from 'react-hot-toast';
import Text from "@/components/components/text";

const initialState = {
    error: false,
    isFormProcessing: false,
    isNewsLetterFormProcessing: false,
};

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        saveContactQuery: (state) => {
            state.isFormProcessing = true;
        },
        saveContactQuerySuccess: (state) => {
            state.isFormProcessing = false;
        },
        saveContactQueryFailed: (state) => {
            state.isFormProcessing = false;
        },
        saveNewsletterQuery: (state) => {
            state.isNewsLetterFormProcessing = true;
        },
        saveNewsletterQuerySuccess: (state) => {
            state.isNewsLetterFormProcessing = false;
        },
        saveNewsletterQueryFailed: (state) => {
            state.isNewsLetterFormProcessing = false;
        },
    },
});

export const {
    saveContactQuery,
    saveContactQuerySuccess,
    saveContactQueryFailed,
    saveNewsletterQuery,
    saveNewsletterQuerySuccess,
    saveNewsletterQueryFailed,
} = contactSlice.actions;

export const saveContactQueryAsync = (formData) => (dispatch) => {
    dispatch(saveContactQuery());
    http
        .post("save-contact-message", doObjToFormData(formData))
        .then(({ data }) => {
            if (data.validationErrors) {
                toast.error(<Text string={data.validationErrors} parse={true} />)
            } else if (data?.status === 1) {
                toast.success(data?.msg)
            } else {
                toast.error(data?.msg)
            }
            dispatch(saveContactQuerySuccess(data));
        })
        .catch((error) => {
            dispatch(saveContactQueryFailed(error));
        });
};

export const saveNewsletterQueryAsync = (formData) => (dispatch) => {
    dispatch(saveNewsletterQuery());
    http
        .post("save-newsletter-message", doObjToFormData(formData))
        .then(({ data }) => {
            if (data.validationErrors) {
                toast.error(<Text string={data.validationErrors} parse={true} />)
            } else if (data?.status === 1) {
                toast.success(data?.msg)
            } else {
                toast.error(data?.msg)
            }
            dispatch(saveNewsletterQuerySuccess(data));
        })
        .catch((error) => {
            dispatch(saveNewsletterQueryFailed(error));
        });
};

export default contactSlice.reducer;
