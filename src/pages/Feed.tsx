import React from 'react'
import { useAuth } from '../features/auth/hooks/useAuth';

const Feed: React.FC = function () {
    const { isAuthenticated, user } = useAuth()

    return (
        <div className='bg-background py-3 h-[100vh]'>
            <div className='wrapper  mx-auto md:px-5 flex flex-col md:flex-row md:justify-center md:gap-7 '>

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
                        <div className='flex justify-between w-full px-14 py-3'>
                            <div className='flex gap-2 '>
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


                    {/* // post feed  */}
                    <div className='bg-white rounded-lg border border-borderColor py-3 h-[500px]'>

                    </div>
                </div>


                <div className='lg:block md:hidden sm:hidden xs:hidden hidden w-[300px] max-h-[500px]'>
                    <div className='bg-white w-full h-[200px] border border-borderColor rounded-lg'></div>
                </div>
            </div>


        </div>
    )
}

export default Feed;

