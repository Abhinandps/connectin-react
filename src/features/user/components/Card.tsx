import { GiLinkedRings } from "react-icons/gi"
import { FaUserPlus } from "react-icons/fa6";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function Card({ minimalistData, isLoading, onRequestSent, user ,onFollows}: any) {

    const navigate = useNavigate()

    return (
        minimalistData ? (
            <div className="w-full sm:mx-0 transition flex gap-3  border-b border-borderColor pb-5">
                <div className=' flex items-center justify-center w-[100px]'>
                    <img className='w-[68px] h-[68px] object-cover rounded-full' src={user?.profileImage} alt="" />
                </div>
                <div className='flex w-full flex-col items-start justify-center '>
                    <h2
                        onClick={() => navigate(`/in/${user?.userId}`)}
                        className='font-semibold text-md my-1 capitalize hover:underline cursor-pointer'>{user?.firstName} {user?.lastName}</h2>
                    <p className='text-xs font-light leading-3 text-gray-500'>{user?.headline}</p>
                    <div className="mt-3">
                        <Button icon={<FaUserPlus />} title="Connect" Border />
                    </div>
                </div>
            </div>
        ) : (
            <div className="relative xs:w-[200px] xs:mx-auto sm:w-[190px] sm:mx-0  hover:shadow-lg transition">
                <div className='h-[60px] '>
                    <img className='w-full h-full object-cover rounded-t-lg' src={user?.coverImage || 'https://picsum.photos/820/300'} alt="" />
                </div >
                <div className='absolute w-[68px] h-[68px] top-5 left-[50%] translate-x-[-50%] '>
                    <img className='w-full object-fill h-full rounded-full' src={user?.profileImage} alt="" />
                </div>
                <div className='h-[200px] pt-10 pb-3 px-5 flex justify-center flex-col items-center border-b border-l border-r border-borderColor rounded-b-lg'>
                    <h2 className='font-semibold text-md my-1 capitalize hover:underline cursor-pointer'
                        onClick={() => navigate(`/in/${user?.userId}`)}
                    >{user?.firstName} {user?.lastName}</h2>
                    <p className='text-xs text-center font-light leading-3 text-gray-500'>{user?.headline.slice(0,50)}...</p>
                    <p className="text-[10px] flex items-center gap-2 text-secondaryColor mt-2">
                        <GiLinkedRings className='text-primaryColor text-xs' /> Ana Fara and 79 others
                    </p>
                    <div className="mt-3">
                        {isLoading ? <LoadingSpinner /> : <Button onRequestSent={onRequestSent} icon={<FaUserPlus />} title="Connect" Border />}

                    </div>
                </div>

            </div >
        )
    )
}

export default Card



interface BProps {
    title: string;
    Border?: boolean
    icon?: any
    onRequestSent?: any
    disabled?: any
}

function Button({ title, Border, icon, onRequestSent, disabled }: BProps) {
    return (
        <button className={`flex items-center gap-1 px-4 py-2 hover:bg-sky-50 transition text-sm bg-transparent ${Border ? 'border-2 border-blue-500 text-blue-500' : 'text-secondaryColor'
            } font-bold rounded-full  `}
            onClick={() => onRequestSent()}
            disabled
        >{icon}{title}</button>
    )
}
