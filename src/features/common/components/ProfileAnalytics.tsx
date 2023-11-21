


const ProfileAnalytics = () => {
    return (
        <>
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
        </>
    )
}

export default ProfileAnalytics