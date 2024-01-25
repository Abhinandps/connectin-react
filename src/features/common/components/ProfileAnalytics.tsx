import useUserData from "../../../hooks/useUserData"
import { useAuth } from "../../auth/hooks/useAuth"



const ProfileAnalytics = () => {
    const { user } = useAuth()
    const { userData }: any = useUserData(user.userId)

    return (
        <>
            <div className='h-[60px] '>
                <img className='w-full h-full object-cover rounded-t-lg'
                    src={userData?.coverImage || 'https://picsum.photos/500/300'} alt="" />
            </div>
            <div className='absolute w-[68px] h-[68px] top-5 left-[50%] translate-x-[-50%] '>
                <img className='w-full h-full rounded-full'
                    src={userData?.profileImage} alt="" />
            </div>
            <div className='bg-white pt-12 pb-3 px-10 flex justify-center flex-col items-center border-b border-l border-r border-borderColor rounded-b-lg'>
                <h2 className='font-semibold text-sm my-1 capitalize'>{userData?.firstName} {userData?.lastName}</h2>
                <p className='text-xs text-center font-light leading-3 text-gray-500'>{userData?.headline}</p>
            </div>

            <div className='md:hidden sm:block text-center py-2 text-sm text-slate-500'>
                Show more
            </div>
        </>
    )
}

export default ProfileAnalytics