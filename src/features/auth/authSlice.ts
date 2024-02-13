
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import apiCall from '../../services/apiCall';


export type User = {
    userId: string;
    email: string;
    role: string;
}

interface AuthState {
    user: null | User;
    token: string | null;
    status: 'idle' | 'loading' | 'authenticated' | 'failed';
    error: any | null;
}


const initialState: AuthState = {
    user: null,
    token: null,
    status: 'idle',
    error: null
}


// Define the type for login data
interface LoginData {
    email: string;
    password: string;
}


// Async thunk for logging in
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (loginData: LoginData, thunkAPI) => {
        try {
            // const response = await fetch('http://localhost:3000/auth/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(loginData),
            //     credentials: 'include'
            // });

            // const data = await response.json();

            const res = await apiCall({
                url: `/auth/login`,
                method: 'POST',
                data: loginData
            })

            console.log(res)

            if (res.message && typeof res.message != typeof []) {
                throw new Error(res.message)
            }


            if (!res) {
                throw new Error('Invalid username or password.')
            }

            const user = {
                userId: res?.user?.userId,
                email: res?.user?.email,
                role: res?.user?.role
            }

            console.log(user)

            return { user, token: res?.access_token };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


// Async thunk for logout 
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_data, thunkAPI) => {
        try {

            const response = await fetch('https://serverapponline.cloud/auth/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();

            // console.log(data);


            if (data.message && typeof data.message != typeof []) {
                throw new Error(data.message)
            }


            if (!response.ok) {
                throw new Error('Invalid username or password.')
            }


            // const user = {
            //     userId: data?.user?.userId,
            //     email: data?.user?.email,
            //     role: data?.user?.role
            // }

            // console.log(user,"user data", data,"response");

            // return { user, token: data?.access_token };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk for registering
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (registerData: { firstName: string; lastName: string; email: string; password: string; }, thunkAPI) => {
        try {
            const response = await fetch('https://serverapponline.cloud/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });


            const data = await response.json();

            if (data.error) {
                throw new Error(data.message);
            }


            const user = {
                userId: data?.user?.userId,
                email: data?.user?.email,
                role: data?.user?.role
            }
            return { user: user, token: data.token };
        } catch (error: any) {


            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchUserDetails = createAsyncThunk(
    'data/fetchUserData',
    async (_token, thunkAPI) => {
        try {
            // const response = await fetch('http://localhost:3000/validate-token', {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     credentials: 'include'
            // });

            // if (!response.ok) {
            //     throw new Error('validation failed');
            // }

            // const data = await response.json();

            const res = await apiCall({
                url: '/validate-token'
            })


            const user = {
                userId: res?._id,
                email: res?.email,
                role: res?.role
            }


            return { user }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

// Async thunk for fetch access_token based on refresh_token
export const getAccessToken = createAsyncThunk(
    'data/getAccessToken',
    async (_token: string, thunkAPI) => {
        try {
            const response = await apiCall({
                url: '/auth/refresh',
                method: 'POST',
                data: {}
            })

            if (!response.ok) {
                throw new Error('validation failed');
            }

            // const data = await response.json();
            console.log(response, 'response')

            // return { token: data.access_token };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{ user: any, token: string }>) => {
            state.status = 'authenticated';
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        loginFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.status = 'idle';
        },

        registerStart: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<{ user: any, token: string }>) => {
            state.status = 'authenticated';
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        registerFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload, 'payload')
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = 'authenticated'
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = 'authenticated'
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.status = 'authenticated'
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.status = 'idle';
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            })
    }
})


export const { loginStart, loginSuccess, loginFailure, logout, registerStart, registerSuccess, registerFailure } = authSlice.actions;

export default authSlice.reducer;






