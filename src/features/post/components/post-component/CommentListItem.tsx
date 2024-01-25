import { toggleCommentOptions } from '../../store/postSlice'
import { useDispatch } from 'react-redux'

function CommentListItem({ uId, postId, _id, content, userId, isCommentOptions, firstName, lastName, headline, handleDeleteComment }: any) {
    const dispatch = useDispatch()
    return (
        <>
            <div className='flex items-start gap-2 py-2 px-3 relative'>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className='w-[35px] h-50px rounded-full ' />

                <div className='w-full'>
                    <div className='bg-secondaryColor/5  w-full  rounded-b-md px-2 min-h-fit py-2'>
                        <h2 className='font-bold text-[13px] text-primaryColor capitalize'>{firstName} {lastName} <span className='font-light text-xs text-secondaryColor'> (He/Him)</span> {uId === userId && (<span className='bg-gray-700 text-white text-[10px] px-2 py-1 ml-5 rounded-md'>Author</span>)}</h2>
                        <p className='font-light text-secondaryColor text-[11px]'>{headline || 'MERN Stack Developer at XYZ'}</p>
                        <h2 className='mt-1 text-[13px] capitalize font-light '> {content} </h2>
                    </div>
                    <button className='text-xs px-1 rounded-sm text-secondaryColor hover:bg-secondaryColor/5'>Like</button>
                    <span className='text-secondaryColor mx-2'>|</span>
                    <button className='text-xs px-1 rounded-sm text-secondaryColor hover:bg-secondaryColor/5'>Reply</button>
                </div>

                <div className='text-[3px] absolute top-5 right-5 z-[100] text-pirmaryColor cursor-pointer p-1'
                    onClick={() => dispatch(toggleCommentOptions({ postId: postId, commentId: _id }))}
                >⚫ ⚫ ⚫</div>


                {
                    isCommentOptions && (
                        <div className='rounded-md bg-white shadow-md w-[150px] min-h-[50px] absolute top-10 right-5'>
                            <button
                                onClick={() => handleDeleteComment(postId, _id)}
                                className='hover:bg-secondary-50 w-full py-2 text-xs my-1 text-secondaryColor hover:text-primaryColor'>❌ Delete</button>
                        </div>
                    )
                }

            </div>


        </>
    )
}

export default CommentListItem