
import { configureStore, } from '@reduxjs/toolkit' // combineReducers - @reduxjs/toolkit
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';
import authSlice from './features/auth/authSlice';
import postSlice from './features/post/store/postSlice';
import jobslice from './features/job/jobslice';
// import socketMiddleware from './middleware/socketMiddleware';
// import SocketClient from './api/ServiceClient';
import networkslice from './features/user/store/networkslice';
import notificationSlice from './features/common/notificationSlice';


// const rootPersistConfig = {
//     key: 'root',
//     verstion: 1,
//     storage: storageSession,
// }

const userPersistConfig = {
    key: 'user',
    version: 1,
    storage: storageSession,
}

const postPersistConfig = {
    key: 'post',
    version: 1,
    storage: storageSession,
}


const networksPersistConfig = {
    key: 'networks',
    version: 1,
    storage: storageSession,
}

const notificationPersistConfig = {
    key: 'notification',
    version: 1,
    storage: storageSession,
}

const persistedReducer = persistReducer(userPersistConfig, authSlice)
const persistedPostReducer = persistReducer(postPersistConfig, postSlice);
const persistedNetworksReducer = persistReducer(networksPersistConfig, networkslice)
const persistedNotificationReducer = persistReducer(notificationPersistConfig, notificationSlice)

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        post: persistedPostReducer,
        job: jobslice,
        user: persistedNetworksReducer,
        notifications: persistedNotificationReducer
    }
})

export const persistor = persistStore(store)


// const socket = new SocketClient()
// middleware: [socketMiddleware(socket)]
