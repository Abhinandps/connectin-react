import { createAsyncThunk } from '@reduxjs/toolkit'
import apiCall from '../../../../services/apiCall';


export const createPost = createAsyncThunk(
    'data/createPost',
    async (formData: any, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/posts/create`,
                method: 'POST',
                data: formData
            })
            if (res.statusCode === 403) {
                // Handle the "Forbidden" error
                throw new Error('Forbidden resource');
            }
            return { res }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const updatePost = createAsyncThunk(
    'data/updatePost',
    async (form: any, thunkAPI) => {
        const { postId, formData }: any = form

        try {
            const res = await apiCall({
                url: `/posts/edit/${postId}`,
                method: 'PUT',
                data: formData
            })
            if (res.statusCode === 403) {
                // Handle the "Forbidden" error
                throw new Error('Forbidden resource');
            }
            return { res }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const fetchUserPosts = createAsyncThunk(
    'data/fetchUserPosts',
    async (_unknown, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/posts/all`
            })
            if (res.statusCode === 403) {
                // Handle the "Forbidden" error
                throw new Error('Forbidden resource');
            }
            return { res }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

// Asynx thunk of fetch user feed

export const fetchUserFeed = createAsyncThunk(
    'data/fetchFeed',
    async (postId: string | null, thunkAPI) => {
        try {
            console.log(postId)
            const res = await apiCall({
                url: `/users/user/feed?${postId ? `postId=${postId}` : ''}`
            })

            console.log(res);

            if (res.statusCode === 403) {
                // Handle the "Forbidden" error
                throw new Error('Forbidden resource');
            }
            return { res }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const fetchUserLikedPosts = createAsyncThunk(
    'data/fetchUserLikedPosts',
    async (_unknown, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/posts/liked-posts`,
                method: 'POST'
            })

            console.log(res, 'user liked posts');

            if (res.statusCode === 403) {
                // Handle the "Forbidden" error
                throw new Error('Forbidden resource');
            }
            return { res }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)



export const addCommentToPost = createAsyncThunk(
    'data/addComment',
    async (postData: any, thunkAPI) => {
        const { postId, content }: any = postData;

        // Now you can use 'postId' and 'content' in your thunk logic
        console.log('Received postId:', postId);
        console.log('Received content:', content);

        try {
            const res = await apiCall({
                url: `/posts/comment/${postId}`,
                method: 'POST',
                data: { content }
            })
            if (res.statusCode === 403) {
                // Handle the "Forbidden" error
                throw new Error('Forbidden resource');
            }

            return { ...res.data, postId }

        } catch (err: any) {
            console.log(err.message);

            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const deleteCommentFromPost = createAsyncThunk(
    'data/deleteComment',
    async (postData: any, thunkAPI) => {
        const { postId, commentId }: any = postData;

        // Now you can use 'postId' and 'content' in your thunk logic
        console.log('Received postId:', postId);
        console.log('Received commentId:', commentId);

        try {
            const res = await apiCall({
                url: `/posts/comment/${postId}/${commentId}`,
                method: 'DELETE',
            })
            if (res.statusCode === 403) {
                // Handle the "Forbidden" error
                throw new Error('Forbidden resource');
            }

            return { res }

        } catch (err: any) {
            console.log(err.message);

            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const deletePost = createAsyncThunk(
    'data/deletePost',
    async (postData: any, thunkAPI) => {
        const { postId }: any = postData;
        console.log(postId, 'from reducer')
        try {
            const res = await apiCall({
                url: `/posts/delete/${postId}`,
                method: 'DELETE',
            })
            if (res.statusCode === 403) {
                throw new Error('Forbidden resource');
            }



            return { res }

        } catch (err: any) {
            console.log(err.message);

            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

// Asynx thunk of like a post

export const likePost = createAsyncThunk(
    'post/likePost',
    async (postId: any, thunkAPI) => {
        try {
             await apiCall({
                url: `/posts/likes/${postId}`,
                method: 'PUT'
            })
            return { id: postId }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)