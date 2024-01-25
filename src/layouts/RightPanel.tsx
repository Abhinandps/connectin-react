import { Link } from "react-router-dom"
import { useAuth } from "../features/auth/hooks/useAuth"
import useUserData from "../hooks/useUserData"

export const RightPanel = () => {
    const { user } = useAuth()
    const { userData }: any = useUserData(user.userId)
    return (
        < div className='lg:block md:hidden sm:hidden xs:hidden hidden w-[300px] max-h-[500px]' >
            <div className='bg-white w-full h-[250px] border border-borderColor rounded-lg p-5 flex flex-col items-center justify-center'>
                <p className='text-xs leading-relaxed text-secondaryColor font-light'><span className="capitalize">{userData?.firstName}</span>, unlock your full potential with ConnectIn Premium</p>
                <div className='my-3 flex items-center gap-2 justify-center'>
                    <img className='w-[65px] h-[65px] rounded-full' src={userData?.profileImage} alt="" />
                    <img className='w-[65px] h-[65px]' src="https://media.licdn.com/dms/image/C4E0EAQElWt4fvMOIcQ/rightRail-logo-shrink_200_200/0/1631008652608?e=1700571600&v=beta&t=jMdf9xG-vjNF0JF5vVvXBb8bOtH-dfy7ZRlhWSP_ptk" alt="" />
                </div>
                <p className='text-xs leading-relaxed  text-secondaryColor font-light'>See who's viewd your profile</p>
                <Link to={'/premium'} className='p-2  text-xs font-medium px-3 border-2 mt-2 border-blue-400 rounded-full  text-blue-400'>Subscribe</Link>
            </div>
        </div >
    )
}