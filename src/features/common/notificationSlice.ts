// notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            let py: any = action.payload.notification
            const updatedNotifications = [...state.notifications, { ...py, viewed: false }];
            return {
                ...state,
                notifications: updatedNotifications
            }
        },
        // removeNotification: (state, action) => {
        //   state.notifications = state.notifications.filter((notification) => notification.id !== action.payload);
        // },
    },
});


export const { addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

