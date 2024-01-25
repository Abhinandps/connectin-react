import { TERipple } from 'tw-elements-react'

function CommentBox({ _id, content, setContent, handleSubmitComment }: any) {
    return (
        <div>
            <div className='flex w-full justify-between items-center py-3 px-3 gap-2'>
                <img className='w-[35px] h-[35px] rounded-full' src="https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645719137?e=1703116800&v=beta&t=emx0qOZ_uF1VpGQGbBT_cLE9uE_Q7D5vov-PgRQXy1I" alt="" />

                <input
                    value={content}
                    type="text"
                    className='w-full border border-[#727272] h-[50px] rounded-full text-sm px-4'
                    placeholder='Add a comment'
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            {content.length > 1 &&
                <TERipple rippleColor="light">
                    <button
                        onClick={() => handleSubmitComment(_id)}
                        className='shadow-md bg-primaryColor rounded-full text-xs p-2 px-3 text-white' >Post</button>
                </TERipple>
            }
        </div>
    )
}

export default CommentBox