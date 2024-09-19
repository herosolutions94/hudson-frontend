import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from "../../helpers/http";
import { doObjToFormData } from "../../helpers/helpers";
import { authToken } from "../../helpers/authToken";
import { removeCookies } from 'cookies-next';
import * as links from "../../constants/link";
import toast from 'react-hot-toast';
import Text from '@/components/components/text';

export const postBuyerRequestConfirmation = createAsyncThunk(
    'confirm-buyer-request',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await http.post('confirm-buyer-request', doObjToFormData({ ...formData, token: authToken() }));
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
export const updateMessagesFromReceivedData = createAsyncThunk(
    'member/update_received_messages_State',
    async (newMessage, { rejectWithValue }) => {
        return newMessage;
    }
);
export const updateMessagesStatusDelivered = createAsyncThunk(
    'member/update_received_messages_delivered_status',
    async (newMessage, { rejectWithValue }) => {
        return newMessage;
    }
);
export const updateMessagesStatusSeen = createAsyncThunk(
    'member/update_received_messages_seen_status',
    async (newMessage, { rejectWithValue }) => {
        return newMessage;
    }
);

export const updateNotifications = createAsyncThunk(
    'member/update-notifications-state',
    async (newNotification, { rejectWithValue }) => {
        return newNotification;
    }
);
export const emptyNotificationObj = createAsyncThunk(
    'member/empty-notifications-state',
    async (newNotification, { rejectWithValue }) => {
        return newNotification;
    }
);
export const zeroNotificationObj = createAsyncThunk(
    'member/zero-notifications-state',
    async (newNotification, { rejectWithValue }) => {
        return newNotification;
    }
);
export const emptyZeroNotificationObj = createAsyncThunk(
    'member/empty-zero-notifications-state',
    async (newNotification, { rejectWithValue }) => {
        return newNotification;
    }
);
export const updateMessageNotifications = createAsyncThunk(
    'member/update-message-notifications-state',
    async (newNotification, { rejectWithValue }) => {
        return newNotification;
    }
);
export const emptyMessageNotificationObj = createAsyncThunk(
    'member/empty-message-notifications-state',
    async (newNotification, { rejectWithValue }) => {
        return newNotification;
    }
);
export const updateHeaderMessageDot = createAsyncThunk(
    'member/update-message-header-state',
    async (newNotification, { rejectWithValue }) => {
        return newNotification;
    }
);
export const emptyHeaderMessageDot = createAsyncThunk(
    'member/empty-message-header-state',
    async (newNotification, { rejectWithValue }) => {
        return newNotification;
    }
);
export const updateSideBarUserMessage = createAsyncThunk(
    'member/update_sidebar_received_messages_State',
    async (newMessage, { rejectWithValue }) => {
        return newMessage;
    }
);
export const emptyMessagesStatusDelivered = createAsyncThunk(
    'member/emptyMessagesStatusDelivered',
    async (newMessage, { rejectWithValue }) => {
        return newMessage;
    }
);
export const emptyMessagesStatusSeen = createAsyncThunk(
    'member/emptyMessagesStatusSeen',
    async (newMessage, { rejectWithValue }) => {
        return newMessage;
    }
);

export const postBookingExtensionConfirmation = createAsyncThunk(
    'booking-extension-request',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await http.post('booking-extension-request', doObjToFormData({ ...formData, token: authToken() }));
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
export const emptySideBarUsersObj = createAsyncThunk(
    'member/empty-sidebar-users-status',
    async (sidebar_receive_message_obj, { rejectWithValue }) => {
        return sidebar_receive_message_obj;
    }
);
const initialState = {
    isFormProcessing: false,
    chat_msgs: [],
    is_confirmed: false,
    is_extension_confirmed: false,
    receive_message_obj: null,
    receive_message_obj_status: null,
    receive_message_obj_status_seen: null,
    sidebar_receive_message_obj: null,
    new_notification_obj:null,
    new_msg_notification_obj:null,
    header_message_dot:false,
    zero_notification:false
};

const listingSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postBuyerRequestConfirmation.pending, (state) => {
                state.isFormProcessing = true;
                state.is_confirmed = false;
            })
            .addCase(postBuyerRequestConfirmation.fulfilled, (state, action) => {
                if (action?.payload?.status === 1) {
                    state.chat_msgs = action?.payload?.chat_msgs
                    state.is_confirmed = true
                }

                state.isFormProcessing = false;
            })
            .addCase(postBuyerRequestConfirmation.rejected, (state) => {
                state.isFormProcessing = false;
            })
            .addCase(postBookingExtensionConfirmation.pending, (state) => {
                state.isFormProcessing = true;
                state.is_extension_confirmed = false;
            })
            .addCase(postBookingExtensionConfirmation.fulfilled, (state, action) => {
                if (action?.payload?.status === 1) {
                    state.chat_msgs = action?.payload?.chat_msgs
                    state.is_extension_confirmed = true
                }

                state.isFormProcessing = false;
            })
            .addCase(postBookingExtensionConfirmation.rejected, (state) => {
                state.isFormProcessing = false;
            })
            .addCase(updateMessagesFromReceivedData.fulfilled, (state, action) => {
                state.receive_message_obj = action?.payload;
            })
            .addCase(updateMessagesStatusDelivered.fulfilled, (state, action) => {
                state.receive_message_obj_status = action?.payload;
            })
            .addCase(updateMessagesStatusSeen.fulfilled, (state, action) => {
                state.receive_message_obj_status_seen = action?.payload;
            })
            .addCase(updateNotifications.fulfilled, (state, action) => {
                state.new_notification_obj = action?.payload;
            })
            .addCase(emptyNotificationObj.fulfilled, (state, action) => {
                state.new_notification_obj = null;
            })
            .addCase(zeroNotificationObj.fulfilled, (state, action) => {
                state.zero_notification = true;
            })
            .addCase(emptyZeroNotificationObj.fulfilled, (state, action) => {
                state.zero_notification = false;
            })
            .addCase(updateMessageNotifications.fulfilled, (state, action) => {
                state.new_msg_notification_obj = action?.payload;
            })
            .addCase(emptyMessageNotificationObj.fulfilled, (state, action) => {
                state.new_msg_notification_obj = null;
            })
            .addCase(updateHeaderMessageDot.fulfilled, (state, action) => {
                state.header_message_dot = true;
            })
            .addCase(emptyHeaderMessageDot.fulfilled, (state, action) => {
                state.header_message_dot = false;
            })
            .addCase(updateSideBarUserMessage.fulfilled, (state, action) => {
                state.sidebar_receive_message_obj = action?.payload;
            })
            .addCase(emptySideBarUsersObj.fulfilled, (state, action) => {
                state.sidebar_receive_message_obj = null;
            })
            .addCase(emptyMessagesStatusDelivered.fulfilled, (state, action) => {
                state.receive_message_obj_status = null;
            })
            .addCase(emptyMessagesStatusSeen.fulfilled, (state, action) => {
                state.receive_message_obj_status_seen = null;
            })


    },
});

export default listingSlice.reducer;
