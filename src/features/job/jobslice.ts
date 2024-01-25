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
                url: '/jobs/posted-jobs'
            })
            return { res }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const fetchRecentJobs = createAsyncThunk(
    'fetchRecentJobs',
    async ({ searchterm, select }: { searchterm?: string; select?: string }, thunkAPI) => {
        try {
            console.log(`/jobs/${searchterm ? `?s=${searchterm}` : ''}${select ? `?select=${select}` : ''}`)
            const res = await apiCall({
                url: `/jobs/${searchterm ? `?s=${searchterm}` : ''}${select ? `?select=${select}` : ''}`

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
            console.log(data)
            const res = await apiCall({
                url: '/jobs/create',
                method: "POST",
                data,
            })

            console.log(res)

            return { res }
        } catch (err: any) {
            // console.log(err)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


export const updateJob = createAsyncThunk(
    'updateJob',
    async (data: any, thunkAPI) => {
        try {
            const { jobId, body } = data
            const res = await apiCall({
                url: `${jobId}`,
                method: "PUT",
                data: body
            })

            const response = await res.json();

            return { response }
        } catch (err:any) {
            // console.log(err)
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
                const py = action.payload.res
                if (py.message) {
                    state.managedJobs.error = py.message
                }
            })
            .addCase(createJobs.rejected, (_state, _action) => {

            })
            .addCase(fetchManagedJobs.fulfilled, (state, action) => {
                const py = action.payload.res.data
                state.managedJobs.list = py
            })
            .addCase(updateJob.fulfilled, (_state, action) => {
                const py = action.payload.response
                console.log(py)
            })
            .addCase(fetchRecentJobs.fulfilled, (state, action) => {
                const py = action.payload.res.data
                state.recentJobs.list = py
            })
    }
})

export const { } = jobSlice.actions

export default jobSlice.reducer