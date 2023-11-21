
import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'

import {
    enableCommentingReducer,
    fetchPostDataReducer,
    toggleCommentOptionsReducer,
    togglePostOptionsReducer
} from './reducers'
import { addCommentToPostFullfilledReducer, createPostFullfilledReducer, deleteCommentFromPostFullfilledReducer, fetchUserFeedFullfilledReducer, fetchUserFeedRejectedReducer, fetchUserPostsFullfilledReducer, likePostFullfilledReducer } from './reducers/extraReducers'
import { addCommentToPost, createPost, deleteCommentFromPost, deletePost, fetchUserFeed, fetchUserPosts, likePost } from './thunks'


const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        enableCommenting: enableCommentingReducer,
        toggleCommentOptions: toggleCommentOptionsReducer,
        togglePostOptions: togglePostOptionsReducer,
        fetchPostData: fetchPostDataReducer
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPosts.fulfilled, fetchUserPostsFullfilledReducer)
            .addCase(fetchUserFeed.fulfilled, fetchUserFeedFullfilledReducer)
            .addCase(fetchUserFeed.rejected, fetchUserFeedRejectedReducer)
            .addCase(likePost.fulfilled, likePostFullfilledReducer)
            .addCase(createPost.fulfilled, createPostFullfilledReducer)
            .addCase(addCommentToPost.fulfilled, addCommentToPostFullfilledReducer)
            .addCase(deleteCommentFromPost.fulfilled, deleteCommentFromPostFullfilledReducer)
            .addCase(deletePost.fulfilled, deleteCommentFromPostFullfilledReducer)
    }
})

export const { enableCommenting, toggleCommentOptions, togglePostOptions, fetchPostData } = postSlice.actions

export default postSlice.reducer;


