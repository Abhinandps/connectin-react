
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';

import authSlice from './features/auth/authSlice';




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



const persistedReducer = persistReducer(userPersistConfig, authSlice)

export const store = configureStore({
    reducer: {
        auth: persistedReducer
    },
})

export const persistor = persistStore(store)

