


export const fetchUserPostsFullfilledReducer = (state:any, action:any) => {
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

export const fetchUserLikesPostIdsFullfilledReducer = (state:any, action:any) => {
    let py = action.payload.res
    state.userLikedPosts = py
}


export const fetchUserFeedFullfilledReducer = (state:any, action:any) => {
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

    // console.log(feedWithFlags, '');


    state.feed = feedWithFlags;
}

export const fetchUserFeedRejectedReducer = (state:any, _action:any) => {
    // let py = action.payload
    state.feed = []
    // console.log(state.feed);
}


export const likePostFullfilledReducer = (state:any, action:any) => {
    let postId = action.payload.id
    // console.log(postId)
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



export const createPostFullfilledReducer = (state:any, action:any) => {
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



export const addCommentToPostFullfilledReducer = (state:any, action:any) => {
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



export const deleteCommentFromPostFullfilledReducer = (state:any, action:any) => {
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


export const deletePostFullfilledReducer = (state:any, action:any) => {
    let { postId } = action.payload.res.data
    // console.log(postId,'post id id ')

    const updatedFeed = state.feed.filter((post: any) => post._id !== postId)
    const updatedPosts = state.posts.filter((post: any) => post._id !== postId)

    return {
        ...state,
        feed: updatedFeed,
        posts: updatedPosts
    };

}