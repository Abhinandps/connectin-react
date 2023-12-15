
import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'

import {
    enableCommentingReducer,
    fetchPostDataReducer,
    removeReportedPostReducer,
    toggleCommentOptionsReducer,
    togglePostOptionsReducer
} from './reducers'
import { addCommentToPostFullfilledReducer, createPostFullfilledReducer, deleteCommentFromPostFullfilledReducer, deletePostFullfilledReducer, fetchUserFeedFullfilledReducer, fetchUserFeedRejectedReducer, fetchUserLikesPostIdsFullfilledReducer, fetchUserPostsFullfilledReducer, likePostFullfilledReducer } from './reducers/extraReducers'
import { addCommentToPost, createPost, deleteCommentFromPost, deletePost, fetchUserFeed, fetchUserLikedPosts, fetchUserPosts, likePost } from './thunks'


const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        enableCommenting: enableCommentingReducer,
        toggleCommentOptions: toggleCommentOptionsReducer,
        togglePostOptions: togglePostOptionsReducer,
        fetchPostData: fetchPostDataReducer,
        removeReportedPost: removeReportedPostReducer
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPosts.fulfilled, fetchUserPostsFullfilledReducer)
            .addCase(fetchUserFeed.fulfilled, fetchUserFeedFullfilledReducer)
            .addCase(fetchUserLikedPosts.fulfilled, fetchUserLikesPostIdsFullfilledReducer)
            .addCase(fetchUserFeed.rejected, fetchUserFeedRejectedReducer)
            .addCase(likePost.fulfilled, likePostFullfilledReducer)
            .addCase(createPost.fulfilled, createPostFullfilledReducer)
            .addCase(addCommentToPost.fulfilled, addCommentToPostFullfilledReducer)
            .addCase(deleteCommentFromPost.fulfilled, deleteCommentFromPostFullfilledReducer)
            .addCase(deletePost.fulfilled, deletePostFullfilledReducer)
    }
})

export const { enableCommenting, toggleCommentOptions, togglePostOptions, fetchPostData, removeReportedPost } = postSlice.actions

export default postSlice.reducer;


