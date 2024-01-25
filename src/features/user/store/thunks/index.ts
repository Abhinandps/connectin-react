import { createAsyncThunk } from '@reduxjs/toolkit'
import apiCall from '../../../../services/apiCall';

// Invitations
// ===================

export const sendConnectionRequest = createAsyncThunk(
    'send/connection-request',
    async (sender:any, thunkAPI) => {
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

export const fetchFollowers = createAsyncThunk(
    'fetch/followers',
    async (_unknown, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/users/followers`,
                method: 'POST'
            })

            return { res }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
export const fetchFollowing = createAsyncThunk(
    'fetch/following',
    async (_unknown, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/users/following`,
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
    async (userId:any, thunkAPI) => {
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
    async (userId:any, thunkAPI) => {
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

export const removeConnectionReducer = createAsyncThunk(
    'remove/removeConnection',
    async (userId:any, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/users/${userId}/remove-connection`,
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
            console.log(res, 'res.......................')

            return { res }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

// FOLLOWS

export const followUserReducer = createAsyncThunk(
    'follow/follow-user',
    async (sender:any, thunkAPI) => {
        try {

            const res = await apiCall({
                url: `/users/${sender}/follow`,
                method: 'POST'
            })

            return { ...res, sender }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


export const unFollowUserReducer = createAsyncThunk(
    'unfollow/unfollow-user',
    async (sender:any, thunkAPI) => {
        try {

            const res = await apiCall({
                url: `/users/${sender}/unfollow`,
                method: 'DELETE'
            })

            return { ...res, sender }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


