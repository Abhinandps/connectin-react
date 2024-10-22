import { useEffect, useMemo, useState } from 'react'
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
import { addNotification } from '../../features/common/notificationSlice';
import Chat from '../../pages/Chat';
import { apiUrl } from '../../config/apiUrl';

const NavBar = () => {

    const { user } = useAuth()
    const { userData }: any = useUserData(user?.userId)


    const unviewedInvitations = useSelector((state: any) => state.user.invitations.filter((user: InvitationData) => !user.viewed))
    const unviewedNotifications = useSelector((state: any) => state.notifications.notifications.filter((notification: any) => !notification.viewed))

    // Memoize selectors
    const memoizedUnviewedInvitations = useMemo(() => unviewedInvitations, [unviewedInvitations]);
    const memoizedUnviewedNotifications = useMemo(() => unviewedNotifications, [unviewedNotifications]);

    // console.log(unviewedNotifications)

    // TODO:online users state update soon
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    const dispatch = useDispatch()

    const socket = io(apiUrl, {
        query: { userId: user?.userId }, reconnection: true,
        reconnectionDelay: 1000
    });


    useEffect(() => {
        socket.on('onEmitUser', (data: InvitationData) => {
            dispatch(reciveInvitation(data))
        });

        socket.on('onScheduleToUser', (data: InvitationData) => {
            console.log('Received notification:', data);
            dispatch(addNotification(data))
        });

        // socket.on("get-users", (users) => {
        // setOnlineUsers();
        // });

        if (sendMessage !== null) {
            socket.emit("send-message", sendMessage);
        }

        socket.on("recieve-message", (data) => {
            setReceivedMessage(data);
            setSendMessage(null)
        })

        return () => {
            socket.disconnect();
        };
    }, [socket, dispatch, sendMessage]);




    const { isAuthenticated } = useAuth()

    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState(navdata[0].id);
    console.log(activeTab, 'active tab')

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
                                isNewInvites={(data?.id === 'tab2' && memoizedUnviewedInvitations.length > 0)}
                                isNewNotifications={(data?.id === 'tab5' && unviewedNotifications.length > 0)}
                                profilePic={(data?.id === 'tab6' ? userData?.profileImage : data?.icon)}
                                unviewedInvitations={unviewedInvitations}
                                unviewedNotifications={memoizedUnviewedNotifications}
                                key={data.id}
                                data={data}
                                handleTabClick={handleTabClick}
                                activeTab={activeTab} />
                        ))}

                    </TETabs>
                ) : (
                    <TETabs className="flex !flex-nowrap items-center justify-between gap-5 !mb-0 lg:ml-0 ml-[50px] ">
                        <li className="text-sm text-primaryColor cursor-pointer hover:bg-slate-100 font-bold px-6 py-3 rounded-full ring-red-100  " onClick={() => navigate('/sign-up')}>Join Now</li>
                        <li className="font-bold border rounded-full border-blue-500  text-blue-500  hover:bg-blue-50 text-sm px-6 py-3 cursor-pointer" onClick={() => navigate('/sign-in')}>Sign In</li>
                    </TETabs>
                )}
            </div>
            {
                isAuthenticated &&
                <Chat
                    onlineUsers={undefined}
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage}
                />
            }

        </>
    )
}

export default NavBar