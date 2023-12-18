import { createAsyncThunk } from '@reduxjs/toolkit'
import apiCall from '../../../../services/apiCall';

// Invitations
// ===================

export const sendConnectionRequest = createAsyncThunk(
    'send/connection-request',
    async (sender, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/users/${sender}/send-connection-request`,
                method: 'POST'
            })

            return { ...res, sender }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const fetchConnectionsRequests = createAsyncThunk(
    'fetch/connection-request',
    async (_unknown, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/users/invitations`,
                method: 'POST'
            })

            return { res }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const acceptConnectionRequest = createAsyncThunk(
    'accept/connection-request',
    async (userId, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/users/${userId}/accept-connection`,
                method: 'POST'
            })
            return { ...res, userId }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const rejectConnectionRequest = createAsyncThunk(
    'reject/connection-request',
    async (userId, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/users/${userId}/reject-connection`,
                method: 'POST'
            })

            return { ...res, userId }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


// Connections
// ===================

export const fetchConnections = createAsyncThunk(
    'fetch/connections',
    async (_unknown, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/users/my-connections`,
                method: 'POST'
            })

            return { res }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


export const fetchRecommendations = createAsyncThunk(
    'fetch/recommened',
    async (_unknown, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/users/recommendations`,
                method: 'POST'
            })
            console.log(res,'res.......................')

            return { res }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


