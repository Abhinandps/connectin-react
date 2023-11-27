import { createAsyncThunk } from '@reduxjs/toolkit'
import apiCall from '../../../../services/apiCall';


export const connectionRequest = createAsyncThunk(
    'send/connection-request',
    async (sender, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/users/${sender}/send-connection-request`,
                method: 'POST'
            })

            return 
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
