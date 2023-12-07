import { useSelector } from 'react-redux'
import FeedContainer from '../layouts/FeedContainer'
import { InlineWidget, PopupButton, PopupWidget } from "react-calendly";
import { useEffect, useRef, useState } from 'react'
import LoadingSpinner from '../components/ui/LoadingSpinner';


function Notifications() {
    const [loading, setLoading] = useState(true);
    const notifications = useSelector((state: any) => state.notifications.notifications)
    const rootElementRef = useRef<HTMLElement | null>(null);


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            rootElementRef.current = document.getElementById('root')
        }, 500);
    }, []);



    return (
        <FeedContainer>
            <div className='bg-white border border-borderColor rounded-md w-[600px] h-screen'
                ref={(element) => {
                    rootElementRef.current = element;
                    console.log('rootElementRef.current:', rootElementRef.current);
                }}
            >
                {
                    notifications.map((notification: string) => (
                        <>
                            {
                                loading ? (<div className='flex justify-center pt-5'><LoadingSpinner /></div>) : (
                                    <div key={notification} className=' px-3 py-5 bg-sky-100 hover:bg-sky-200 '>
                                        <div className='flex  items-start gap-2 cursor-pointer'>
                                            <div className='rounded-full w-[13px] h-[10px] bg-sky-600 border border-borderColor shadow-sm'></div >
                                            <p className='text-sm font-medium text-primaryColor'>{notification?.message}</p>
                                        </div>

                                        {rootElementRef.current && (
                                            <PopupButton
                                                key={`popup-${notification}`}
                                                className='mx-5 border-2 border-blue-600 text-blue-600 font-bold hover:bg-sky-100 transition text-sm px-3 py-1 rounded-full mt-5'
                                                url={notification?.actionLink}
                                                rootElement={rootElementRef.current}
                                                text="Schedule Interview!"
                                            />
                                        )}
                                    </div>
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