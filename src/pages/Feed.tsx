import React from 'react'
import { useAuth } from '../features/auth/hooks/useAuth';

const Feed: React.FC = function () {
    const { isAuthenticated } = useAuth()
    return (
        <div className='flex justify-between px-5 py-10 gap-4 w-min-[1200px] mx-auto'>
            <div className='bg-gray-300 rounded-lg text-white md:block hidden p-3 w-[200px] h-screen'>profile analytics</div>
            <div className='bg-gray-300 rounded-lg text-white md:block w-[550px] p-3 h-screen mx-auto'>Feed</div>
            <div className='bg-gray-300 rounded-lg text-white md:block hidden p-3 w-[200px] h-screen'>more</div>
        </div>
    )
}

export default Feed;

