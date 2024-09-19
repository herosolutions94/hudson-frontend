// slices/authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from "../../helpers/http";
import { doObjToFormData } from "../../helpers/helpers";
import { setCookie } from "cookies-next";
import Text from "@/components/components/text";
import toast from 'react-hot-toast';


export const saveSignupQuery = createAsyncThunk(
    'saveSignupQuery',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await http.post("create-account", doObjToFormData(formData));
            const { data } = response;
            if (data.validationErrors) {
                toast.error(<Text string={data?.validationErrors} />)
            } else if (data?.status === 1) {
                toast.success(data?.msg)
                setTimeout(() => {
                    // Redirect logic
                }, 2000);
            } else {
                toast.error(data?.msg)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const saveLoginQuery = createAsyncThunk(
    'saveLoginQuery',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await http.post("save-login", doObjToFormData(formData));
            let { data } = response;
            data = { ...data, explore_page: formData?.explore_page, explore_product_url: data?.explore_product_url, prev_ul: formData?.prev_ul }
            if (data.validationErrors) {
                toast.error(<Text string={data.validationErrors} />)
            } else if (parseInt(data?.deactivated)) {
                toast.error('Account deactivated!')
                setTimeout(() => {
                    // Redirect logic
                }, 1000);
            } else if (data.not_verified) {
                toast.error('Email verification required!')
                setTimeout(() => {
                    if (formData?.explore_page) {
                        window.location.reload()
                    }
                    // Redirect logic
                }, 2000);
            } else if (data?.status === 1) {
                toast.success('Login successfully!')

            } else {
                toast.error(data?.msg)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const postForgot = createAsyncThunk(
    'postForgot',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await http.post("forgot-password", doObjToFormData(formData));
            const { data } = response;
            if (data.status) {
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

export const postReset = createAsyncThunk(
    'postReset',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await http.post("reset-password/" + formData?.token, doObjToFormData(formData));
            const { data } = response;
            if (data.status) {
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
    isFormProcessing: false,
    isComplete: false,
    emptyFormData: false,
    hideLoginPopup: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveSignupQuery.pending, (state) => {
                state.isFormProcessing = true;
            })
            .addCase(saveSignupQuery.fulfilled, (state, action) => {
                if (action?.payload?.status === 1) {
                    setCookie("authToken", action?.payload?.authToken);
                    setCookie("mem_type", action?.payload?.mem_type);
                    if (action?.payload?.google_account_status === 1) {
                        setTimeout(() => {
                            window.location.replace("/dashboard/complete-profile");
                        }, 2000);
                    }
                    else{
                        setTimeout(() => {
                            window.location.replace("/dashboard/email-verification");
                        }, 2000);
                    }
                    
                    
                }

                state.isFormProcessing = false;
                state.isComplete = true;
            })
            .addCase(saveSignupQuery.rejected, (state) => {
                state.isFormProcessing = false;
            })
            .addCase(saveLoginQuery.pending, (state) => {
                state.isFormProcessing = true;
            })
            .addCase(saveLoginQuery.fulfilled, (state, action) => {
                state.isFormProcessing = false;
                if (action.payload?.status === 1) {
                    setCookie("authToken", action.payload.authToken);
                    setCookie("mem_type", action.payload.mem_type);
                    setCookie("authentication_required", action.payload?.authentication_required);
                    if (action?.payload?.explore_page) {
                        state.hideLoginPopup = true
                    }
                    else if (action?.payload?.prev_ul) {
                        setTimeout(() => {
                            window.location.href = action?.payload?.prev_ul
                        }, 2000);
                    }
                    else if (action?.payload?.status) {
                        setTimeout(() => {
                            window.location.href = "/dashboard"
                        }, 2000);
                    }
                }



            })
            .addCase(saveLoginQuery.rejected, (state) => {
                state.isFormProcessing = false;
            })
            .addCase(postForgot.pending, (state) => {
                state.isFormProcessing = true;
            })
            .addCase(postForgot.fulfilled, (state) => {
                state.isFormProcessing = false;
                state.emptyFormData = true;
            })
            .addCase(postForgot.rejected, (state) => {
                state.isFormProcessing = false;
                state.error = true;
            })
            .addCase(postReset.pending, (state) => {
                state.isFormProcessing = true;
            })
            .addCase(postReset.fulfilled, (state) => {
                state.isFormProcessing = false;
                state.emptyFormData = true;
                setTimeout(() => {
                    window.location.href = "/login"
                }, 2000);
            })
            .addCase(postReset.rejected, (state) => {
                state.isFormProcessing = false;
                state.error = true;
            });
    },
});

export default authSlice.reducer;
