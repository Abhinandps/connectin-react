import React, { useEffect, useState } from 'react'
import FeedContainer from '../layouts/FeedContainer';
import { addCommentToPost, createPost, deleteCommentFromPost, enableCommenting, fetchUserFeed, likePost, toggleCommentOptions } from '../features/post/postSlice';


const Feed: React.FC = function () {
    const { user } = useAuth()
    const [content, setContent] = useState('')

    const { feed, userLikedPosts } = useSelector((state: any) => state.post)
    console.log(feed)
    const [showModalLg, setShowModalLg] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserFeed());
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

    const handleDeleteComment = (postId: any, commentId: any) => {
        dispatch(deleteCommentFromPost({ postId, commentId }))
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
            <div className='md:mt-0 lg:w-[655px] md:w-[500px] min-h-screen'>
                {/* add post  */}
                <div className='bg-white flex flex-col h-[115px] justify-center items-center w-full border border-borderColor rounded-lg'>
                    <div className='flex w-full justify-between items-center py-3 px-3 gap-2'>
                        <img className='w-[45px] h-[45px] rounded-full' src="https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645719137?e=1703116800&v=beta&t=emx0qOZ_uF1VpGQGbBT_cLE9uE_Q7D5vov-PgRQXy1I" alt="" />
                        <input type="text" className='w-full border border-[#727272] h-[50px] rounded-full text-sm px-4' placeholder='Start a Post' />
                    </div>
                    <div className='flex justify-between w-full px-14 py-3 cursor-pointer'>
                        <div className='flex gap-2 ' onClick={() => setShowModalLg(true)}>
                            <i>📸</i>
                            <p className='text-sm text-slate-500'>Media</p>
                        </div>

                        <div className='flex gap-2 '>
                            <i>🔖</i>
                            <p className='text-sm text-slate-500'>Job</p>
                        </div>

                        <div className='flex gap-2 '>
                            <i>📝</i>
                            <p className='text-sm text-slate-500'>Write Article</p>
                        </div>
                    </div>
                </div>

                {/* filter */}
                <div className='my-5 relative'>
                    <hr />
                    <button className='absolute top-[-7px] right-0 md:bg-background px-2 text-xs text-color'>Sort By: <span className='font-bold text-primaryColor'>Top 🔽</span> </button>
                </div>

                {feed && (feed).map((post: any) => {

                    // const likedUsers = post.likes.map((u: any) => (u.creator.userId))

                    const postWithIsLiked = {
                        ...post,
                        isLiked: userLikedPosts.includes(post._id)
                    };

                    console.log(post, 'test')
                    const { userId, firstName, lastName, profileImage, headline } = post.creator
                    const { _id, title, contentBody, attachments, isLiked, isCommenting, comments } = postWithIsLiked


                    return (
                        < div key={_id} className='bg-white rounded-lg border  border-borderColor py-3 min-h-[500px] px-5' >

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
                                    {contentBody}</p>
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

                        </div>


                    )
                })}
                {/* // post feed  */}
                {/* <div className='bg-white rounded-lg border border-borderColor py-3 h-[500px]'>

                </div> */}
            </div>

            {/* extra  */}
            <div className='lg:block md:hidden sm:hidden xs:hidden hidden w-[300px] max-h-[500px]'>
                <div className='bg-white w-full h-[250px] border border-borderColor rounded-lg p-5 flex flex-col items-center justify-center'>
                    <p className='text-xs leading-relaxed text-secondaryColor font-light'>Abhinand, unlock your full potential with ConnectIn Premium</p>
                    <div className='my-3 flex items-center gap-2 justify-center'>
                        <img className='w-[65px] h-[65px] rounded-full' src="https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645719137?e=1703116800&v=beta&t=emx0qOZ_uF1VpGQGbBT_cLE9uE_Q7D5vov-PgRQXy1I" alt="" />
                        <img className='w-[65px] h-[65px]' src="https://media.licdn.com/dms/image/C4E0EAQElWt4fvMOIcQ/rightRail-logo-shrink_200_200/0/1631008652608?e=1700571600&v=beta&t=jMdf9xG-vjNF0JF5vVvXBb8bOtH-dfy7ZRlhWSP_ptk" alt="" />
                    </div>
                    <p className='text-xs leading-relaxed  text-secondaryColor font-light'>See who's viewd your profile</p>
                    <Link to={'/premium'} className='p-2  text-xs font-medium px-3 border-2 mt-2 border-blue-400 rounded-full  text-blue-400'>Subscribe</Link>
                </div>
            </div>

            <Editor showModalLg={showModalLg} setShowModalLg={setShowModalLg} />

        </FeedContainer >

    )
}

export default Feed;





export const ContentWithTags = ({ contentBody }: any) => {
    // Regular expression to find #tags in the text
    const tagRegex = /#(\w+)/g;

    // Split the contentBody into parts separated by #tags
    const parts = contentBody.split(tagRegex);



    return (
        <p className="font-light leading-6 text-[12px] py-2">
            {parts.map((part: any, index: any) => {


                console.log(part, tagRegex);
                // if (part.match(tagRegex)) {
                // console.log(tagRegex);

                // If it's a #tag, render it as a clickable link
                const tag = part.replace('#', '');
                return (
                    <a key={index} href={`/tags/${tag}`} className="text-blue-800 font-medium underline">
                        #{tag}
                    </a>
                );
                // } else {
                // If it's not a #tag, render it as plain text
                // return <span key={index}>{part}</span>;
                // }
            })}
        </p>
    );
};


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



interface EditorProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    showModalLg: boolean;
    setShowModalLg: (value: boolean) => void;
}

import {
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TERipple,
} from "tw-elements-react";
import { FileUpload } from '../components/Form/FileUpload';
import Button from '../components/Form/Button';
import InputField from '../components/Form/InputField';
import apiCall from '../services/apiCall';
import { Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../features/auth/hooks/useAuth';






const Editor: React.FC<EditorProps> = function ({ showModalLg, setShowModalLg }) {

    // page 1
    const [data, setData] = useState({
        currentPage: 1,
        attachments: null
    })


    const { attachments }: any = data;




    const onChange = (key: string, value: any) => {
        setData(prev => ({
            ...prev,
            [key]: value
        }))
    }


    // FIXME: url 

    const submit = async (e: any) => {
        try {
            e.preventDefault();

            const res = await fetch(`http://localhost:3000/posts/utils/upload-files`, {
                method: "POST",
                body: attachments
            });

            if (res.ok) {
                const data = await res.json()
                onChange('attachments', data)
                onChange("currentPage", 2)
            }

        } catch (err) { }
    }



    const goBack = () => {
        onChange("currentPage", 1)
    }

    if (data.currentPage === 2) return (
        <AddContents
            {...data}
            goBack={goBack}
            showModalLg={showModalLg} setShowModalLg={setShowModalLg}
        />
    )

    return (
        <FormLayout title='Editor' showModalLg={showModalLg} setShowModalLg={setShowModalLg} >
            <form onSubmit={submit} encType='multipart/form-data'>
                <img src="" alt="image" />
                <h2>Select files to begin</h2>
                <p>Share images or a single video in your post.</p>
                <FileUpload
                    Label="Select Files"
                    value={attachments}
                    onChange={v => onChange("attachments", v)}
                    error={''}
                    multiple
                />
                <Button
                    title='Next'
                />
            </form>
        </FormLayout >
    );
}






const AddContents: React.FC<any> = ({ goBack, showModalLg, setShowModalLg, attachments }) => {

    const dispatch = useDispatch()
    const emptyFormData = {
        title: "",
        contentType: "text",
        contentBody: "",
        attachments
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

            const createPostAction = await dispatch(createPost(formData));

            if (createPost.fulfilled.match(createPostAction)) {
                setShowModalLg(false)
            }

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








// Form Layout 

export const FormLayout: React.FC<EditorProps> = ({ showModalLg, setShowModalLg, children, title }) => {
    return (
        <div>
            <TEModal show={showModalLg} setShow={setShowModalLg}>
                <TEModalDialog size="lg">
                    <TEModalContent>
                        <TEModalHeader>
                            {/* <!--Modal title--> */}
                            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                {title}
                            </h5>
                            {/* <!--Close button--> */}
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={() => setShowModalLg(false)}
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </TEModalHeader>
                        {/* <!--Modal body--> */}
                        <TEModalBody>
                            {children}
                        </TEModalBody>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>

        </div>
    )
}


