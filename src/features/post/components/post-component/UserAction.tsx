import { Action } from '../Action'

function UserAction({ isLiked, _id, handleLikeClick, handleEnableCommenting }: any) {
    return (
        <div className='flex justify-between border-t mt-6'>

            <Action
                isLiked={isLiked}
                title={isLiked ? '👍 Liked' : 'Like'}
                postId={_id}
                onclick={handleLikeClick} />

            <Action
                postId={_id}
                title='💭 Comments'
                onclick={handleEnableCommenting} />
        </div>
    )
}

export default UserAction