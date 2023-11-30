import { useEffect, useState } from 'react'
import { navdata } from '../../utils/navigationData';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Logo } from './Logo';
import { TETabs } from 'tw-elements-react';
import NavItem from '../ui/NavItem';
import useUserData from '../../hooks/useUserData';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { InvitationData, reciveInvitation } from '../../features/user/store/networkslice';

const NavBar = () => {


    const unviewedInvitations = useSelector((state: any) => state.user.invitations.filter((user: InvitationData) => !user.viewed))

    const { user } = useAuth()

    const dispatch = useDispatch()

    const socket = io('http://localhost:3000', {
        query: { userId: user?.userId }, reconnection: true,
        reconnectionDelay: 1000
    });


    useEffect(() => {
        socket.on('onEmitUser', (data: InvitationData) => {
            // console.log('Received notification:', data);
            dispatch(reciveInvitation(data))
        });

        return () => {
            socket.disconnect();
        };
    }, [socket, dispatch]);

    const { isAuthenticated } = useAuth()

    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState(navdata[0].id);

    const handleTabClick = (value: string, path: string) => {
        if (value === activeTab) {
            return;
        }
        setActiveTab(value);
        navigate(path)
    };
    return (
        <>
            <Logo isAuthenticated={isAuthenticated} />

            <div>
                {isAuthenticated ? (
                    <TETabs className="flex !flex-nowrap items-center justify-between !mb-0 ml-[50px] ">

                        {/* Navigation list  */}
                        {navdata && navdata.map((data) => (
                            <NavItem
                                isNewInvites={(data?.id === 'tab2' && unviewedInvitations.length > 0)}
                                unviewedInvitations={unviewedInvitations}
                                key={data.id}
                                data={data}
                                handleTabClick={handleTabClick}
                                activeTab={activeTab} />
                        ))}

                    </TETabs>
                ) : (
                    <TETabs className="flex !flex-nowrap items-center justify-between gap-5 !mb-0 lg:ml-0 ml-[50px] ">
                        <li className="text-sm text-primaryColor cursor-pointer  hover:bg-slate-100 font-bold px-6 py-3 rounded-full ring-red-100  " onClick={() => navigate('/sign-up')}>Join Now</li>
                        <li className="font-bold border rounded-full border-blue-500  text-blue-500  hover:bg-blue-50 text-sm px-6 py-3 cursor-pointer" onClick={() => navigate('/sign-in')}>Sign In</li>
                    </TETabs>
                )}
            </div>
        </>
    )
}

export default NavBar