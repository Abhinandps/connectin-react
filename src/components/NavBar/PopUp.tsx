import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useDispatch } from 'react-redux';
import ProfileInfo from './ProfileInfo';
import AccountInfo from './AccountInfo';
import ManageInfo from './ManageInfo';
import SignOut from './SignOut';
import useUserData from '../../hooks/useUserData';
import LoadingSpinner from '../ui/LoadingSpinner';


interface PopupProps {
    isOpen: boolean;
    handleIsOpen: (isOpen: boolean) => void;

}

const Popup: React.FC<PopupProps> = ({ isOpen, handleIsOpen }) => {

    const { user } = useAuth()
    const { userData, loading, error }: any = useUserData(user.userId)
    console.log(userData, 'data')

    const dispatch = useDispatch()
    const navigate = useNavigate()

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

            // FIXME: fix the typeError of function
            const res = dispatch(logoutUser());

            if (logoutUser.fulfilled.match(res)) {
                navigate('/')

            } else if (logoutUser.rejected.match(res)) {
                // const error: any = res.payload
                // setError(error);
            }
        } catch (error) {
            // Handle errors if necessary
            console.error('Logout error:', error);
        }
    }

    return (
        <>
            {isOpen && (
                <div className="absolute top-[65px] right-0 z-[777] bg-white  py-2 border w-[300px] border-borderColor rounded-md shadow-md"
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

                                <SignOut handleLogout={handleLogout} /></>
                        )
                    }
                </div>
            )}
        </>
    );
}

export default Popup


