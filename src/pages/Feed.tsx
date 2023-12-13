import React, { useEffect, useState } from 'react'
import FeedContainer from '../layouts/FeedContainer';

import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '../features/post/components/Editor';
import PostItem from '../features/post/components/PostItem';
import { fetchUserFeed, fetchUserLikedPosts } from '../features/post/store/thunks';
import { LeftPanel } from '../layouts/LeftPanel';
import ProfileAnalytics from '../features/common/components/ProfileAnalytics';
import { MainView } from '../layouts/MainVIew';
import { RightPanel } from '../layouts/RightPanel';
import { fetchOnePostData } from '../features/post/store/postSlice';


const Feed: React.FC = function () {

    const { feed, userLikedPosts } = useSelector((state: any) => state.post)
    const [showModalLg, setShowModalLg] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const postId = queryParams.get('postId');

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserLikedPosts())
        dispatch(fetchUserFeed(postId));
    }, [dispatch]);




    return (
        <FeedContainer>

            <LeftPanel>
                <ProfileAnalytics />
            </LeftPanel>

            <MainView feed>
                <AddPost setShowModalLg={setShowModalLg} />
                <FilterFeed />
                {
                    feed && (feed).map((post: any) => (
                        <PostItem post={post} userLikedPosts={userLikedPosts} setShowModalLg={setShowModalLg} />
                    ))
                }
            </MainView>

            <RightPanel />

            <Editor showModalLg={showModalLg} setShowModalLg={setShowModalLg} />

        </FeedContainer >

    )
}

export default Feed;

export const AddPost = ({ setShowModalLg }: boolean | any) => {
    return (
        <>
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
        </>
    )
}

export const FilterFeed = () => {
    return (<>
        {/* filter */}
        <div className='my-5 relative'>
            <hr />
            <button className='absolute top-[-7px] right-0 md:bg-background px-2 text-xs text-color'>Sort By: <span className='font-bold text-primaryColor'>Top 🔽</span> </button>
        </div>
    </>)
}



