
type POST = {
    posts: [],
    feed: [],
    userLikedPosts: string[],
    postToEdit: null | string
}

export const initialState: POST = {
    posts: [],
    feed: [],
    userLikedPosts: [],
    postToEdit: null
}

