
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';

import authSlice from './features/auth/authSlice';
import postSlice from './features/post/postSlice';
import jobslice from './features/job/jobslice';


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

const persistedReducer = persistReducer(userPersistConfig, authSlice)
const persistedPostReducer = persistReducer(postPersistConfig, postSlice);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        post: persistedPostReducer,
        job : jobslice
    },
})

export const persistor = persistStore(store)

