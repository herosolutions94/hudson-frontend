// slices/authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from "../../helpers/http";
import {  doObjToFormData } from "../../helpers/helpers";
import { setCookie } from "cookies-next";
import Text from "@/components/components/text";
import toast from 'react-hot-toast';
import { authToken } from '@/components/helpers/authToken';


export const createPaymentIntent = createAsyncThunk(
    'auth/create-payment-intent',
    async (formData, { rejectWithValue, dispatch }) => {
        formData = { ...formData, token: authToken() }
        try {
            const response = await http.post("checkout/create-payment-intent", doObjToFormData(formData));
            const { data } = response;

            if (data.validationErrors) {
                toast.error(<Text string={data?.validationErrors} />)
            }
            else if (data?.error) {
                toast.error(<Text string={data?.error} />)
            }
            else if (data?.status === 1) {

            } else {
                toast.error(data?.msg)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const saveSubscription = createAsyncThunk(
    'save-subscription',
    async (formData, { rejectWithValue, dispatch }) => {
        formData = { ...formData, token: authToken() }
        try {
            const response = await http.post("checkout/save-subscription", doObjToFormData(formData));
            const { data } = response;
            if (data.validationErrors) {
                toast.error(<Text string={data?.validationErrors} />)
            }
            else if (data?.error) {
                toast.error(<Text string={data?.error} />)
            }
            else if (data?.status === 1) {
                toast.success(data?.msg)
            } else {
                toast.error(data?.msg)
            }
            return data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data);
        }
    }
);
export const updateSubscription = createAsyncThunk(
    'update-subscription',
    async (formData, { rejectWithValue, dispatch }) => {
        formData = { ...formData, token: authToken() }
        try {
            const response = await http.post("checkout/update-subscription", doObjToFormData(formData));
            const { data } = response;

            if (data.validationErrors) {
                toast.error(<Text string={data?.validationErrors} />)
            }
            else if (data?.error) {
                toast.error(<Text string={data?.error} />)
            }
            else if (data?.status === 1) {
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
export const cancelSubscription = createAsyncThunk(
    'cancel-subscription',
    async (formData, { rejectWithValue, dispatch }) => {
        formData = { ...formData, token: authToken() }
        try {
            const response = await http.post("checkout/cancel-subscription", doObjToFormData(formData));
            const { data } = response;
            if (data.validationErrors) {
                toast.error(<Text string={data?.validationErrors} />)
            }
            else if (data?.error) {
                toast.error(<Text string={data?.error} />)
            }
            else if (data?.status === 1) {
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


const initialState = {
    error: false,
    isFormIntentProcessing: false,
    isFormProcessing: false,
    intent_data: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPaymentIntent.pending, (state) => {
                state.isFormIntentProcessing = true;
            })
            .addCase(createPaymentIntent.fulfilled, (state, action) => {
                state.isFormIntentProcessing = false;
                state.intent_data = action?.payload;
            })
            .addCase(createPaymentIntent.rejected, (state) => {
                state.isFormIntentProcessing = false;
            })
            .addCase(saveSubscription.pending, (state) => {
                state.isFormIntentProcessing = true;
            })
            .addCase(saveSubscription.fulfilled, (state, action) => {
                state.isFormIntentProcessing = false;
                if (action?.payload?.status) {
                    window.location.href = "/dashboard/subscriptions"
                }
            })
            .addCase(saveSubscription.rejected, (state) => {
                state.isFormIntentProcessing = false;
            })
            .addCase(updateSubscription.pending, (state) => {
                state.isFormProcessing = true;
            })
            .addCase(updateSubscription.fulfilled, (state, action) => {
                state.isFormProcessing = false;
                if (action?.payload?.status) {
                    window.location.href = "/dashboard/subscriptions"
                }
            })
            .addCase(updateSubscription.rejected, (state) => {
                state.isFormProcessing = false;
            })
            .addCase(cancelSubscription.pending, (state) => {
                state.isFormProcessing = true;
            })
            .addCase(cancelSubscription.fulfilled, (state, action) => {
                state.isFormProcessing = false;
                if (action?.payload?.status) {
                    window.location.href = "/dashboard/subscriptions"
                }
            })
            .addCase(cancelSubscription.rejected, (state) => {
                state.isFormProcessing = false;
            })
    },
});

export default authSlice.reducer;
