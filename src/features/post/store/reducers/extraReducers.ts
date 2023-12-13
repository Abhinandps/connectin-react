


export const fetchUserPostsFullfilledReducer = (state, action) => {
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
}

export const fetchUserLikesPostIdsFullfilledReducer = (state, action) => {
    let py = action.payload.res
    state.userLikedPosts = py
}


export const fetchUserFeedFullfilledReducer = (state, action) => {
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
}

export const fetchUserFeedRejectedReducer = (state, action) => {
    let py = action.payload
    state.feed = []
    console.log(state.feed);
}


export const likePostFullfilledReducer = (state, action) => {
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
}



export const createPostFullfilledReducer = (state, action) => {
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

}



export const addCommentToPostFullfilledReducer = (state, action) => {
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

}



export const deleteCommentFromPostFullfilledReducer = (state, action) => {
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

}


export const deletePostFullfilledReducer = (state, action) => {
    let { postId } = action.payload.res

    const updatedFeed = state.feed.filter((post: any) => post._id !== postId)
    const updatedPosts = state.posts.filter((post: any) => post._id !== postId)

    return {
        ...state,
        feed: updatedFeed,
        posts: updatedPosts
    };

}