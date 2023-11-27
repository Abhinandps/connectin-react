import { createSlice } from "@reduxjs/toolkit";
import { initialState } from './initialState'

const networkSlice = createSlice({
    name: 'networks',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
    }
})

export const { } = networkSlice.actions

export default networkSlice.reducer
