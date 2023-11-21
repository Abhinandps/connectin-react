
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FeedContainer from '../layouts/FeedContainer';
import { TERipple } from 'tw-elements-react';

import { useAuth } from '../features/auth/hooks/useAuth';
import { AddContents } from '../features/post/components/AddContents';
import PostItem from '../features/post/components/PostItem';
import { fetchUserPosts } from '../features/post/store/thunks';
import { MainView } from '../layouts/MainVIew';
import { LeftPanel } from '../layouts/LeftPanel';
import ProfileAnalytics from '../features/common/components/ProfileAnalytics';
import { RightPanel } from '../layouts/RightPanel';

const PostsAndActivity = () => {
    const { user } = useAuth()
    const { posts, userLikedPosts, postToEdit } = useSelector((state: any) => state.post)
    const [showModalLg, setShowModalLg] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserPosts(user.userId));
    }, [dispatch]);


    return (
        <FeedContainer>

            <LeftPanel>
                <ProfileAnalytics />
            </LeftPanel>

            <MainView>
                <FilterPost />
                {
                    posts && posts?.map((post: any) => (
                        <PostItem
                            post={post}
                            userLikedPosts={userLikedPosts}
                            setShowModalLg={setShowModalLg} />
                    ))
                }
            </MainView>

            <RightPanel />

            <AddContents
                showModalLg={showModalLg}
                setShowModalLg={setShowModalLg}
                postData={postToEdit}
            />

        </FeedContainer >

    )
}

export default PostsAndActivity


export const FilterPost = () => {
    return (
        <>
            {/* add post  */}
            <div className='bg-white flex flex-col h-[115px] justify-center items-center w-full'>
                <h2 className='w-full font-bold text-lg py-2'>All activity</h2>
                <div className='text-sm text-secondaryColor flex gap-2 w-full'>
                    <TERipple rippleColor='light'><button className='bg-green-800 p-2 px-3 text-white rounded-full'>Posts</button></TERipple>
                    <TERipple rippleColor='light'><button className='border border-borderColor px-3 rounded-full p-2'>Comments</button></TERipple>
                    <TERipple rippleColor='light'><button className='border border-borderColor p-2 px-3 rounded-full'>Likes</button></TERipple>
                </div>
            </div></>
    )
}


