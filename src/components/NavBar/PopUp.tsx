import React, { useEffect } from 'react'
import { logoutUser } from "../../features/auth/authSlice";
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useDispatch } from 'react-redux';
import ProfileInfo from './ProfileInfo';
import AccountInfo from './AccountInfo';
import ManageInfo from './ManageInfo';
import SignOut from './SignOut';
import useUserData from '../../hooks/useUserData';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useLoading } from '../../context/LoadingContext';


interface PopupProps {
    isOpen: boolean;
    handleIsOpen: (isOpen: boolean) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, handleIsOpen }) => {

    const { user } = useAuth()
    const { setLoading } = useLoading();
    const { userData, loading }: any = useUserData(user.userId)

    const dispatch = useDispatch()

    const popupRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handler = (e: any) => {
            if (!popupRef.current?.contains(e.target)) {
                handleIsOpen(false)
            }
        };
        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [isOpen]);


    const handleLogout = async () => {
        try {
            // const res: any = () => 
            dispatch(logoutUser() as any);
            setLoading(true)

        } catch (error) {
            // Handle errors if necessary
            console.error('Logout error:', error);
        }
    }

    return (
        <>
            {isOpen && (
                <div className="absolute top-[65px] right-0 z-[777] text-[13px] text-secondaryColor bg-white capitalize py-2 px-1 border w-[300px] border-borderColor rounded-md shadow-md"
                    ref={popupRef}
                >
                    {
                        loading ? (
                            <div className="grid place-content-center h-full">
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <>
                                <ProfileInfo data={userData} />

                                <AccountInfo />

                                <ManageInfo user={user} />

                                <SignOut handleLogout={handleLogout} />

                                {/* <div className='m-2 cursor-pointer hover:text-red-900' onClick={() => handleLogout()}>signout</div> */}
                            </>


                        )
                    }
                </div>
            )}
        </>
    );
}

export default Popup


