


import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import apiCall from '../../services/apiCall'

const initialState: any = {
    posts: [],
    feed: [],
    userLikedPosts: [],
    postToEdit: null
}


export const createPost = createAsyncThunk(
    'data/createPost',
    async (formData, thunkAPI) => {
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
    'data/createPost',
    async (form, thunkAPI) => {
        const { postId, formData }: any = form
        console.log(form);

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
    async (_unknown, thunkAPI) => {
        try {
            const res = await apiCall({
                url: `/users/user/feed`
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

export const addCommentToPost = createAsyncThunk(
    'data/addComment',
    async (postData, thunkAPI) => {
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
    async (postData, thunkAPI) => {
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
    async (postData, thunkAPI) => {
        const { postId }: any = postData;

        // Now you can use 'postId' and 'content' in your thunk logic
        console.log('Received postId:', postId);

        try {
            const res = await apiCall({
                url: `/posts/delete/${postId}`,
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

// Asynx thunk of like a post

export const likePost = createAsyncThunk(
    'post/likePost',
    async (postId: any, thunkAPI) => {
        try {
            const response = await apiCall({
                url: `/posts/likes/${postId}`,
                method: 'PUT'
            })
            return { id: postId }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        enableCommenting(state, action) {
            const postId = action.payload;

            const updatedFeed = state.feed.map((post: any) => {
                if (post._id === postId) {
                    return {
                        ...post,
                        isCommenting: true
                    };
                }
                return post;
            });
            const updatedPosts = state.posts.map((post: any) => {
                if (post._id === postId) {
                    return {
                        ...post,
                        isCommenting: true
                    };
                }
                return post;
            });

            return {
                ...state,
                feed: updatedFeed,
                posts: updatedPosts
            };
        },
        toggleCommentOptions(state, action) {
            const { postId, commentId } = action.payload;

            const updatedFeed = state.feed.map((post: any) => {
                if (post._id === postId) {
                    const updatedComments = post.comments.map((comment: any) => {
                        if (comment._id === commentId) {
                            return {
                                ...comment,
                                isCommentOptions: !comment.isCommentOptions
                            };
                        }
                        return comment;
                    });

                    return {
                        ...post,
                        comments: updatedComments
                    };
                }
                return post;
            });

            const updatedPosts = state.posts.map((post: any) => {
                if (post._id === postId) {
                    const updatedComments = post.comments.map((comment: any) => {
                        if (comment._id === commentId) {
                            return {
                                ...comment,
                                isCommentOptions: !comment.isCommentOptions
                            };
                        }
                        return comment;
                    });

                    return {
                        ...post,
                        comments: updatedComments
                    };
                }
                return post;
            });

            return {
                ...state,
                feed: updatedFeed,
                posts: updatedPosts
            };

        },
        togglePostOptions(state, action) {
            const { postId } = action.payload;

            const updatedFeed = state.feed.map((post: any) => {
                if (post._id === postId) {
                    return {
                        ...post,
                        isPostOptions: !post.isPostOptions
                    };
                }
                return post;
            });

            const updatedPosts = state.posts.map((post: any) => {
                if (post._id === postId) {
                    return {
                        ...post,
                        isPostOptions: !post.isPostOptions
                    };
                }
                return post;
            });

            return {
                ...state,
                feed: updatedFeed,
                posts: updatedPosts
            };

        },
        fetchPostData(state, action) {
            const { postId } = action.payload
            const postData = state.posts.find((post: any) => post._id === postId)
            return {
                ...state,
                postToEdit: postData
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                let py = action.payload.res.data
                const PostsWithFlags = py.map((post: any) => {
                    const postWithFlags = {
                        ...post,
                        isCommenting: false,
                        isPostOptions: false
                    };

                    const commentsWithFlags = post.comments.map((c: any) => ({
                        ...c,
                        isCommentOptions: false,
                    }))

                    return {
                        ...postWithFlags,
                        comments: commentsWithFlags
                    }
                });

                state.posts = PostsWithFlags;
            })
            .addCase(fetchUserFeed.fulfilled, (state, action) => {
                let py = action.payload.res.data

                const feedWithFlags = py.map((post: any) => {
                    const postWithFlags = {
                        ...post,
                        isCommenting: false,
                        isPostOptions: false
                    };

                    const commentsWithFlags = (post.comments || []).map((c: any) => ({
                        ...c,
                        isCommentOptions: false,
                    }))



                    return {
                        ...postWithFlags,
                        comments: commentsWithFlags
                    }
                });

                console.log(feedWithFlags, '');


                state.feed = feedWithFlags;
            })
            .addCase(fetchUserFeed.rejected, (state, action) => {
                let py = action.payload
                state.feed = []
                console.log(state.feed);
            })
            .addCase(likePost.fulfilled, (state, action) => {
                let postId = action.payload.id
                console.log(postId)
                const likedPostInFeed = state.feed.find((post: any) => post._id === postId)

                if (likedPostInFeed) {
                    if (state.userLikedPosts.includes(postId)) {
                        state.userLikedPosts.splice(state.userLikedPosts.indexOf(postId), 1)
                    } else {
                        state.userLikedPosts.push(postId)
                    }
                }

                const likedPostInPosts = state.posts.find((post: any) => post._id === postId)

                if (likedPostInPosts) {
                    if (state.userLikedPosts.includes(postId)) {
                        state.userLikedPosts.splice(state.userLikedPosts.indexOf(postId), 1)
                    } else {
                        state.userLikedPosts.push(postId)
                    }
                }
            })

            .addCase(createPost.fulfilled, (state, action) => {
                const newPost = action.payload.res.data;

                // Update the feed
                const updatedFeed = [newPost, ...state.feed];

                // Update the posts
                const updatedPosts = [...state.posts, newPost];

                return {
                    ...state,
                    feed: updatedFeed,
                    posts: updatedPosts
                };

            })
            .addCase(addCommentToPost.fulfilled, (state, action) => {
                let py = action.payload
               
                const { postId, ...comment } = py
             
                const updatedFeed = state.feed.map((post: any) => {
                    if (post._id === postId) {
                        const updatedComments = [...post.comments, comment]
                        return {
                            ...post,
                            comments: updatedComments
                        };
                    }
                    return post;
                });

                const updatedPosts = state.posts.map((post: any) => {
                    if (post._id === postId) {
                        const updatedComments = [...post.comments, comment];
                        return {
                            ...post,
                            comments: updatedComments
                        };
                    }
                    return post;
                });


                return {
                    ...state,
                    feed: updatedFeed,
                    posts: updatedPosts
                };

            })
            .addCase(deleteCommentFromPost.fulfilled, (state, action) => {
                let { commentId, postId } = action.payload.res.data

                const updatedFeed = state.feed.map((post: any) => {
                    if (post._id === postId) {
                        const updatedComments = post.comments.filter((comment: any) => comment._id !== commentId)
                        return {
                            ...post,
                            comments: updatedComments
                        };
                    }
                    return post;
                });

                const updatedPosts = state.posts.map((post: any) => {
                    if (post._id === postId) {
                        const updatedComments = post.comments.filter((comment: any) => comment._id !== commentId)
                        return {
                            ...post,
                            comments: updatedComments
                        };
                    }
                    return post;
                });

                return {
                    ...state,
                    feed: updatedFeed,
                    posts: updatedPosts
                };

            })
            .addCase(deletePost.fulfilled, (state, action) => {
                let { postId } = action.payload.res

                const updatedFeed = state.feed.filter((post: any) => post._id !== postId)
                const updatedPosts = state.posts.filter((post: any) => post._id !== postId)

                return {
                    ...state,
                    feed: updatedFeed,
                    posts: updatedPosts
                };

            })
    }
})

export const { enableCommenting, toggleCommentOptions, togglePostOptions, fetchPostData } = postSlice.actions

export default postSlice.reducer;
