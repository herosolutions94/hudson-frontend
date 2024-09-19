import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from "../../helpers/http";
import { doObjToFormData } from "../../helpers/helpers";
import { authToken } from "../../helpers/authToken";
import { removeCookies } from 'cookies-next';
import * as links from "../../constants/link";
import toast from 'react-hot-toast';
import Text from '@/components/components/text';

export const postListing = createAsyncThunk(
    'add-listing',
    async (formData, { rejectWithValue, dispatch }) => {
        let postUrl = "add-listing"
        if (formData?.encoded_id !== undefined && formData?.encoded_id !== null && formData?.encoded_id !== '') {
            postUrl = "edit-listing/" + formData?.encoded_id
        }

        try {
            const response = await http.post(postUrl, doObjToFormData({ ...formData, token: authToken() }));
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
export const deleteListing = createAsyncThunk(
    'deleteListing',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await http.post("delete-listing/" + formData, doObjToFormData({ ...formData, token: authToken() }));
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
export const searchExploreLocation = createAsyncThunk(
    'search-location',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await http.post("search-location/", doObjToFormData({ ...formData, token: authToken() }));
            const { data } = response;
            if (data.status) {
                // toast.success(data?.msg)

            } else {
                toast.error(data?.msg)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const postRequestMessage = createAsyncThunk(
    'send-msg-owner',
    async (formData, { rejectWithValue, dispatch }) => {
        
        try {
            const response = await http.post('send-msg-owner', doObjToFormData({ ...formData, token: authToken() }));
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
            let new_data={...data,previousUrl:formData?.previousUrl}
            return new_data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const initialState = {
    isFormProcessing: false,
    isReqSubmitted:false,
    states: []
};

const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchExploreLocation.pending, (state) => {
                state.isFormProcessing = true;
            })
            .addCase(searchExploreLocation.fulfilled, (state, action) => {
                state.states = action?.states
                state.isFormProcessing = false;
            })
            .addCase(searchExploreLocation.rejected, (state) => {
                state.isFormProcessing = false;
            })
            .addCase(postRequestMessage.pending, (state) => {
                state.isFormProcessing = true;
            })
            .addCase(postRequestMessage.fulfilled, (state, action) => {
                state.isReqSubmitted = true;
                if (action?.payload?.status === 1) {
                    setTimeout(() => {
                        window.location.replace("/explore/thankyou?previousUrl="+encodeURIComponent(action?.payload?.previousUrl));
                    }, 500);
                }

                state.isFormProcessing = false;
               
            })
            .addCase(postRequestMessage.rejected, (state) => {
                state.isFormProcessing = false;
            })
            .addCase(postListing.pending, (state) => {
                state.isFormProcessing = true;
            })
            .addCase(postListing.fulfilled, (state, action) => {
                if (action?.payload?.status === 1) {
                    setTimeout(() => {
                        window.location.replace("/dashboard/listings");
                    }, 2000);
                }

                state.isFormProcessing = false;
            })
            .addCase(postListing.rejected, (state) => {
                state.isFormProcessing = false;
            })
            .addCase(deleteListing.pending, (state) => {
                state.isFormProcessing = true;
            })
            .addCase(deleteListing.fulfilled, (state, action) => {
                if (action?.payload?.status === 1) {
                    setTimeout(() => {
                        window.location.replace("/dashboard/listings");
                    }, 2000);
                }

                state.isFormProcessing = false;
            })
            .addCase(deleteListing.rejected, (state) => {
                state.isFormProcessing = false;
            })

    },
});

export default listingSlice.reducer;
