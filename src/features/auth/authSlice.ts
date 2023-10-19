
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'


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
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Invalid username or password.')
            }
            const data = await response.json();

            const user = {
                userId: data?.user?.userId,
                email: data?.user?.email,
                role: data?.user?.role
            }
            return { user, token: data?.access_token };
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
            const response = await fetch('http://localhost:3000/auth/register', {
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



// Async thunk for fetch access_token based on refresh_token
export const getAccessToken = createAsyncThunk(
    'data/getAccessToken',
    async (_token, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:3000/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('validation failed');
            }

            const data = await response.json();

            return { token: data.access_token };
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
    }
})


export const { loginStart, loginSuccess, loginFailure, logout, registerStart, registerSuccess, registerFailure } = authSlice.actions;

export default authSlice.reducer;






