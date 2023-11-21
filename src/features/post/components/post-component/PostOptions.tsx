import { useDispatch } from 'react-redux'
import { togglePostOptions } from '../../store/postSlice'

function PostOptions({ _id, handlePostEdit, handleDeletePost, isPostOptions }: any) {
    const dispatch = useDispatch()
    return (
        <>
            <div className='text-[4px] absolute top-5 right-5 z-[200] text-pirmaryColor cursor-pointer p-1'
                onClick={() => dispatch(togglePostOptions({ postId: _id }))}
            >⚫ ⚫ ⚫</div>

            {
                isPostOptions && (
                    <div className='rounded-md bg-white shadow-md min-w-[60%] min-h-[50px] font-medium absolute top-10 right-5 border border-borderColor'>
                        <button
                            // onClick={() => handleDeleteComment(_id, comment._id)}
                            className='hover:bg-secondary-50 w-full  py-2 px-5 text-[13px] text-left my-1 text-secondaryColor hover:text-primaryColor'>📁 &nbsp; Save</button>
                        <button
                            onClick={() => handlePostEdit(_id)}
                            className='hover:bg-secondary-50 w-full py-2 px-5 text-[13px] text-left my-1 text-secondaryColor hover:text-primaryColor'>🖋  &nbsp;  &nbsp; Edit</button>
                        <button
                            onClick={() => handleDeletePost(_id)}
                            className='hover:bg-secondary-50 w-full py-2 px-5 text-[13px] text-left my-1 text-secondaryColor hover:text-primaryColor'>❌ &nbsp; Delete</button>
                        <button
                            // onClick={() => handleDeleteComment(_id, comment._id)}
                            className='hover:bg-secondary-50 w-full py-2 px-5 text-[13px] text-left my-1 text-secondaryColor hover:text-primaryColor'>🔴 &nbsp; Report</button>
                    </div>
                )
            }
        </>
    )
}

export default PostOptions