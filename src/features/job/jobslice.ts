import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apiCall from "../../services/apiCall"


const initialState = {
    recommendedJobs: {
        list: [],
        loading: false,
        error: null
    },
    recentJobs: {
        list: [],
        loading: false,
        error: null
    },
    savedJobs: {
        list: [],
        loading: false,
        error: null
    },
    managedJobs: {
        list: [],
        loading: false,
        error: null
    },
}


export const fetchManagedJobs = createAsyncThunk(
    'fetchManagedJobs',
    async (_unknown, thunkAPI) => {
        try {
            const res = await apiCall({
                url: '/jobs/'
            })
            return { res }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)



export const createJobs = createAsyncThunk(
    'createJobs',
    async (data: any, thunkAPI) => {
        try {
            const res = await fetch(`http://localhost:3006/api/v1/jobs/create`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: data ? JSON.stringify(data) : undefined,
                credentials: 'include'
            });

            const response = await res.json();

            return { response }
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createJobs.fulfilled, (state, action) => {
                const py = action.payload.response
                if (py.message) {
                    state.managedJobs.error = py.message
                }
            })
            .addCase(createJobs.rejected, (state, action) => {
            })
            .addCase(fetchManagedJobs.fulfilled, (state, action) => {
                const py = action.payload.res.data
                state.managedJobs.list = py
            })
    }
})

export const { } = jobSlice.actions

export default jobSlice.reducer