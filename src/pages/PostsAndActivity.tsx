
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCommentToPost, deleteCommentFromPost, deletePost, enableCommenting, fetchPostData, fetchUserPosts, likePost, toggleCommentOptions, togglePostOptions, updatePost } from '../features/post/postSlice';
import FeedContainer from '../layouts/FeedContainer';
import { TERipple } from 'tw-elements-react';
import { FormLayout } from './Feed';
import InputField from '../components/Form/InputField';
import Button from '../components/Form/Button';
import { useAuth } from '../features/auth/hooks/useAuth';

const PostsAndActivity = () => {
    const { user } = useAuth()
    const [content, setContent] = useState('')
    const { posts, userLikedPosts, postToEdit } = useSelector((state: any) => state.post)
    const [showModalLg, setShowModalLg] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserPosts(user.userId));
    }, [dispatch]);


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
        <FeedContainer>

            {/* Profile analytics */}
            <div className='md:w-[255px] sm:w-full relative md:min-h-[20vh] rounded-t-lg '>
                <div className='h-[60px] '>
                    <img className='w-full h-full object-cover rounded-t-lg' src="https://media.licdn.com/dms/image/D5616AQHktpTLduijkQ/profile-displaybackgroundimage-shrink_200_800/0/1693821120930?e=1703116800&v=beta&t=9vZRAGoIwVBs2xvunIYtWdwy-_MubfoQNF0pRv2v3bE" alt="" />
                </div>
                <div className='absolute w-[68px] h-[68px] top-5 left-[50%] translate-x-[-50%] '>
                    <img className='w-full h-full rounded-full' src="https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645719137?e=1703116800&v=beta&t=emx0qOZ_uF1VpGQGbBT_cLE9uE_Q7D5vov-PgRQXy1I" alt="" />
                </div>
                <div className='bg-white pt-12 pb-3 px-10 flex justify-center flex-col items-center border-b border-l border-r border-borderColor rounded-b-lg'>
                    <h2 className='font-semibold text-sm my-1'>Abhinand P S</h2>
                    <p className='text-xs text-center font-light leading-3 text-gray-500'>Full-stack Developer experienced working with front-end and back-end frameworks including, JavaScript, React</p>
                </div>

                <div className='md:hidden sm:block text-center py-2 text-sm text-slate-500'>
                    Show more
                </div>

            </div>

            {/* Feed  */}
            <div className='md:mt-0 lg:w-[660px] md:w-[520px] min-h-screen bg-white px-5'>
                {/* add post  */}
                <div className='bg-white flex flex-col h-[115px] justify-center items-center w-full'>
                    <h2 className='w-full font-bold text-lg py-2'>All activity</h2>
                    <div className='text-sm text-secondaryColor flex gap-2 w-full'>
                        <TERipple rippleColor='light'><button className='bg-green-800 p-2 px-3 text-white rounded-full'>Posts</button></TERipple>
                        <TERipple rippleColor='light'><button className='border border-borderColor px-3 rounded-full p-2'>Comments</button></TERipple>
                        <TERipple rippleColor='light'><button className='border border-borderColor p-2 px-3 rounded-full'>Likes</button></TERipple>
                    </div>
                </div>
                {posts && posts?.map((post: any) => {

                    // const likedUsers = post.likes.map((u: any) => (u.creator.userId))

                    const postWithIsLiked = {
                        ...post,
                        isLiked: userLikedPosts.includes(post._id)
                    };
                    const { userId, firstName, lastName, profileImage, headline } = post.creator
                    const { _id, title, contentBody, attachments, isLiked, isCommenting, comments, isPostOptions } = postWithIsLiked


                    return (
                        < div key={_id} className='bg-white rounded-lg border  border-borderColor py-3 min-h-[500px] px-5 relative' >

                            {/* header  */}
                            <div className='flex items-center gap-2 py-2'>
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className='w-[50px] h-50px rounded-full ' />
                                <div className=''>
                                    <h2 className='font-bold text-[13px] text-primaryColor capitalize'>{firstName} {lastName} <span className='font-light text-secondaryColor'> (He/Him)</span> </h2>
                                    <p className='font-light text-secondaryColor text-xs'>{headline || 'MERN Stack Developer at XYZ'}</p>
                                </div>
                            </div>

                            {/* content */}

                            <div className=''>
                                <p className='font-light text-[12px] py-2 ' >{title}</p>
                                <p className='font-light leading-6 text-[12px] py-2 ' >
                                    {/* <ContentWithTags contentBody={contentBody} /> */}
                                    {contentBody}
                                </p>
                            </div>


                            {/* thumbnail  */}
                            <div>
                                <img src={attachments[0]} alt="" className='h-[400px] w-full object-cover' />
                            </div>

                            {/* user actions  */}
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

                            {
                                isCommenting &&
                                (
                                    <>

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

                                        {/* comments list  */}

                                        {comments.map((comment) => {
                                            const { content, likes, isCommentOptions } = comment
                                            const { firstName, lastName, profileImage, headline } = comment.creator



                                            return (
                                                <>
                                                    <div className='flex items-start gap-2 py-2 px-3 relative'>
                                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className='w-[35px] h-50px rounded-full ' />

                                                        <div className='w-full'>
                                                            <div className='bg-secondaryColor/5  w-full  rounded-b-md px-2 min-h-fit py-2'>
                                                                <h2 className='font-bold text-[13px] text-primaryColor capitalize'>{firstName} {lastName} <span className='font-light text-xs text-secondaryColor'> (He/Him)</span> {userId === comment?.creator?.userId && (<span className='bg-gray-700 text-white text-[10px] px-2 py-1 ml-5 rounded-md'>Author</span>)}</h2>
                                                                <p className='font-light text-secondaryColor text-[11px]'>{headline || 'MERN Stack Developer at XYZ'}</p>
                                                                <h2 className='mt-1 text-[13px] capitalize font-light '> {content} </h2>
                                                            </div>
                                                            <button className='text-xs px-1 rounded-sm text-secondaryColor hover:bg-secondaryColor/5'>Like</button>
                                                            <span className='text-secondaryColor mx-2'>|</span>
                                                            <button className='text-xs px-1 rounded-sm text-secondaryColor hover:bg-secondaryColor/5'>Reply</button>
                                                        </div>

                                                        <div className='text-[3px] absolute top-5 right-5 z-[100] text-pirmaryColor cursor-pointer p-1'
                                                            onClick={() => dispatch(toggleCommentOptions({ postId: _id, commentId: comment._id }))}
                                                        >⚫ ⚫ ⚫</div>

                                                        {

                                                            isCommentOptions && (
                                                                <div className='rounded-md bg-white shadow-md w-[150px] min-h-[50px] absolute top-10 right-5'>
                                                                    <button
                                                                        onClick={() => handleDeleteComment(_id, comment._id)}
                                                                        className='hover:bg-secondary-50 w-full py-2 text-xs my-1 text-secondaryColor hover:text-primaryColor'>❌ Delete</button>
                                                                </div>
                                                            )
                                                        }

                                                    </div>


                                                </>
                                            )
                                        })}
                                    </>


                                )
                            }

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

                        </div>


                    )
                })}
                {/* // post feed  */}
                {/* <div className='bg-white rounded-lg border border-borderColor py-3 h-[500px]'>

                </div> */}
            </div>

            {/* extra  */}
            <div className='lg:block md:hidden sm:hidden xs:hidden hidden w-[300px] max-h-[500px]'>
                <div className='bg-white w-full h-[200px] border border-borderColor rounded-lg'></div>
            </div>

            <AddContents
                showModalLg={showModalLg}
                setShowModalLg={setShowModalLg}
                postData={postToEdit}
            />

        </FeedContainer >

    )
}

export default PostsAndActivity





const AddContents: React.FC<any> = ({ goBack, showModalLg, setShowModalLg, postData }) => {
    console.log(postData);

    const dispatch = useDispatch()
    const emptyFormData = {
        title: postData?.title || "",
        contentType: "text",
        contentBody: postData?.contentBody || "",
    }
    // page 2 
    const [formData, setFormData] = useState(
        emptyFormData,
    );

    const { title, contentBody }: any = formData

    const onChange = (key: string, value: any) => {

        setFormData(prev => ({
            ...prev,
            [key]: value
        }))
    }


    const submit = async (e: any) => {
        try {
            e.preventDefault();

            // dispatch(updatePost({ postId: postData._id, formData }));

            // if (updatePost.fulfilled.match(createPostAction)) {
            //     setShowModalLg(false)
            // }

        } catch (err) { }
    }

    const clear = () => {
        setFormData(emptyFormData)
    }


    return (
        <FormLayout title='Editor' showModalLg={showModalLg} setShowModalLg={setShowModalLg} >
            <form onSubmit={submit}>

                <InputField
                    Label={''}
                    placeholder={'Post Title'}
                    onChange={(v) => onChange("title", v)}
                    value={title}
                    error={''}
                    outline={false}
                />
                <InputField
                    Label={''}
                    placeholder={'What do you want to talk about?'}
                    onChange={(v) => onChange("contentBody", v)}
                    value={contentBody}
                    error={''}
                    outline={false}
                />

                <img src={postData?.attachments[0]} alt="" className='w-full ' />

                <Button
                    title='prev'
                    onClick={goBack}
                    outlineOnly={true}
                />
                <Button
                    title='publish'
                />
            </form>
        </FormLayout >
    )
}

// post content user actions 

const Action = ({ title, postId, isLiked, onclick }: any) => {
    return (

        <TERipple rippleColor="light" className='w-full'>
            <button
                onClick={() => onclick(postId)}
                className={`${isLiked ? 'text-primaryColor' : 'text-secondaryColor hover:text-primaryColor'}  w-full transition delay-75 ease-in-out rounded-md hover:bg-secondary-200 p-3 my-2 mx-2 text-sm font-medium  `}>
                {title}
            </button>
        </TERipple>

    )
}
