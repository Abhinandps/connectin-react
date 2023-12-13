import { useDispatch, useSelector } from 'react-redux'
import FeedContainer from '../layouts/FeedContainer'
import { InlineWidget, PopupButton, PopupWidget } from "react-calendly";
import { useEffect, useRef, useState } from 'react'
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { changeNotificationStatus } from '../features/common/notificationSlice';
import { useNavigate } from 'react-router-dom';


function Notifications() {
    const [loading, setLoading] = useState(true);
    const notifications = useSelector((state: any) => state.notifications.notifications)
    const rootElementRef = useRef<HTMLElement | null>(null);

    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            rootElementRef.current = document.getElementById('root')
        }, 500);
    }, []);



    return (
        <FeedContainer>
            <div className='bg-white border border-borderColor rounded-md w-[600px] h-screen overflow-scroll'
                ref={(element) => {
                    rootElementRef.current = element;
                    console.log('rootElementRef.current:', rootElementRef.current);
                }}
            >
                {
                    loading ? (<div className='flex justify-center pt-5'><LoadingSpinner /></div>) :
                        notifications.map((notification: any, index: number) => (
                            <>
                                {
                                    (
                                        <div key={notification}
                                            className={`px-3 py-5 border-b border-borderColor ${!notification.viewed && 'bg-sky-100'} hover:bg-sky-200 cursor-pointer `}
                                            onClick={() => {
                                                dispatch(changeNotificationStatus(index));
                                                notification.data.postId && navigate(`/?postId=${notification?.data?.postId}`)
                                            }}
                                        >

                                            <div className='flex  items-start gap-2 cursor-pointer'>
                                                <div className={`${!notification.viewed ? 'opacity-1' : 'opacity-0'} rounded-full w-[10px] h-[10px] bg-sky-600 border border-borderColor shadow-sm`}></div >
                                                {notification?.data?.profileImgae == null && (
                                                    <img className='w-[50px] h-[50px] rounded-full' src="https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645719137?e=1703116800&v=beta&t=emx0qOZ_uF1VpGQGbBT_cLE9uE_Q7D5vov-PgRQXy1I" alt="" />
                                                )}

                                                <p className='text-sm font-medium text-primaryColor'>{notification?.message}</p>
                                            </div>


                                            {notification?.actionLink && (

                                                rootElementRef.current && (
                                                    <PopupButton
                                                        key={`popup-${notification}`}
                                                        className='mx-5 border-2 border-blue-600 text-blue-600 font-bold hover:bg-sky-100 transition text-sm px-3 py-1 rounded-full mt-5'
                                                        url={notification?.actionLink}
                                                        rootElement={rootElementRef.current}
                                                        text="Schedule Interview!"

                                                    />
                                                )

                                            )}

                                            {
                                                notification?.thumbnail && (
                                                    <div className='mx-5 w-[100px] h-[120px] border my-2 border-borderColor rounded-lg flex items-center'>
                                                        <img className='object-cover rounded-lg w-full h-full' src={notification?.thumbnail} alt="" />
                                                    </div>
                                                )
                                            }

                                        </div >
                                    )
                                }

                            </>
                        ))
                }
            </div >
        </FeedContainer >
    )
}

export default Notifications