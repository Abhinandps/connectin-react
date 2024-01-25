

export const enableCommentingReducer = (state: any, action: any) => {
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
}



export const toggleCommentOptionsReducer = (state: any, action: { payload: { postId: any; commentId: any; }; }) => {
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

}


export const togglePostOptionsReducer = (state: any, action: { payload: { postId: any; }; }) => {
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

}


export const fetchPostDataReducer = (state: any, action: { payload: any; }) => {
    const { postId }: any = action.payload

    const postData = state.posts.find((post: any) => post._id === postId)
    return {
        ...state,
        postToEdit: postData
    }
}


export const removeReportedPostReducer = (state: any, action: any) => {
    const { post_id } = action.payload

    const updatedFeed = state.feed.filter((post: any) => post._id !== post_id)

    return {
        ...state,
        feed: updatedFeed
    }
}


// export const fetchOnePostFromFeedReducer = (state, action) => {
//     const { postId } = action.payload

//     console.log(state, 'state')


//     const updatedFeed = state.feed.filter((post: any) => post._id === postId);

//     return {
//         ...state,
//         feed: [],
//     }
// }




