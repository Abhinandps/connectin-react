// notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

interface Notification {

}

const initialState:{notifications: Notification[]} = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            let py: any = action.payload.notification
            const updatedNotifications = [{ ...py, viewed: false }, ...state.notifications];
            return {
                ...state,
                notifications: updatedNotifications
            }
        },
        changeNotificationStatus: (state, action) => {
            // let py: any = action.payload;
            const indexToChange = action.payload;

            const updatedNotifications = state.notifications.map((notification: any, index) => {
                if (index === indexToChange) {
                    return { ...notification, viewed: true }
                }
                return notification
            })

            return {
                ...state,
                notifications: updatedNotifications
            }
        },
        removeNotification: (state, action) => {
            const indexToRemove = action.payload;

            const updatedNotifications = [...state.notifications];

            updatedNotifications.splice(indexToRemove, 1);

            return {
                ...state,
                notifications: updatedNotifications
            };
        },
    },
});


export const { addNotification, changeNotificationStatus } = notificationSlice.actions;

export default notificationSlice.reducer;

