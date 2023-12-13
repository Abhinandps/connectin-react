
import { useState } from 'react'
import { addCommentToPost, deleteCommentFromPost, deletePost, likePost } from '../store/thunks';
import { enableCommenting, fetchPostData, toggleCommentOptions, togglePostOptions } from '../store/postSlice';
import { useDispatch } from 'react-redux';
import Header from './post-component/Header';
import ContentBody from './post-component/ContentBody';
import Thumbnail from './post-component/Thumbnail';
import UserAction from './post-component/UserAction';
import CommentBox from './post-component/CommentBox';
import CommentListItem from './post-component/CommentListItem';
import PostOptions from './post-component/PostOptions';

const PostItem = ({ post, userLikedPosts, setShowModalLg }: any) => {
    const dispatch = useDispatch()

    const [content, setContent] = useState('')

    const postWithIsLiked = {
        ...post,
        isLiked: userLikedPosts.includes(post._id)
    };

    const { userId } = post.creator

    const { _id, isCommenting, comments, isPostOptions } = postWithIsLiked

    const handleLikeClick = (postId: any) => {
        dispatch(likePost(postId))
    }

    const handleEnableCommenting = (postId: any) => {
        dispatch(enableCommenting(postId))
    }

    const handleSubmitComment = (postId: any) => {
        dispatch(addCommentToPost({ postId, content }))
        setContent('')
    }

    const handlePostEdit = (postId: any) => {
        dispatch(fetchPostData({ postId }))
        setShowModalLg(true)
    }

    const handleDeleteComment = (postId: any, commentId: any) => {
        dispatch(deleteCommentFromPost({ postId, commentId }))
    }

    const handleDeletePost = (postId: any) => {
        dispatch(deletePost({ postId }))
    }

    return (
        <div key={_id} className='bg-white rounded-lg border mb-3 border-borderColor py-3 min-h-[500px] px-5 relative' >

            <Header {...post.creator} />

            <ContentBody {...postWithIsLiked} />

            <Thumbnail {...postWithIsLiked} />

            <UserAction {...postWithIsLiked} handleLikeClick={handleLikeClick} handleEnableCommenting={handleEnableCommenting} />

            {
                isCommenting &&
                (
                    <>
                        <CommentBox {...postWithIsLiked} content={content} setContent={setContent} handleSubmitComment={handleSubmitComment} />
                        {comments.map((comment: any) => {
                            return (
                                <CommentListItem {...comment.creator} {...comment} uId={userId} postId={postWithIsLiked._id} handleDeleteComment={handleDeleteComment} />
                            )
                        })}
                    </>
                )
            }

            <PostOptions {...postWithIsLiked} handlePostEdit={handlePostEdit} handleDeletePost={handleDeletePost} isPostOptions={isPostOptions} />
            
        </div>
    )
}

export default PostItem



