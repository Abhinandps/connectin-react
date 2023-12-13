import { useState, useEffect } from 'react'
import apiCall from '../../../services/apiCall'
import "@whereby.com/browser-sdk"

function ScheduledInterviews() {
    const [interviews, setInterviews] = useState([])
    const [isIframeVisible, setIframeVisible] = useState(false);
    const [meetingUrl, setMeetingUrl] = useState('')

    const handleEnableIframe = (roomUrl: any) => {
        setMeetingUrl(roomUrl);
        setIframeVisible(true);
    };

    useEffect(() => {
        (async () => {
            const res: any = await apiCall({
                url: `/jobs/scheduled-interviews`,
                method: 'POST'
            })
            setInterviews(res)
        })()
    }, [])



    function timeFinder(timestamp: any) {
        const date = new Date(timestamp);
        const formattedTime = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        }).format(date);

        return formattedTime
    }

    return (
        <div className="bg-white w-full h-screen border border-borderColor rounded-md shadow-md py-3">
            <div className="border-b border-borderColor px-5 pb-2">
                <h2 className="text-lg font-medium text-primaryColor">ScheduledInterviews</h2>
            </div>

            <div className='px-10 py-10 flex justify-start flex-wrap'>
                {
                    interviews.length > 0 ? (
                        interviews.map((data) => (
                            <div className='border border-blue-700 text-sm  w-[350px] px-5 py-3 rounded-md'>
                                <h2 className='text-primaryColor font-bold text-xl pt-5'>{data?.eventType}</h2>
                                <p className='text-xs text-secondaryColor pb-5'>One-on-One</p>
                                <div className='text-[14px] text-secondaryColor'>

                                    <div className='pb-2'>
                                        <p className='font-semibold'>Date : {data?.startDate.split('T')[0]}</p>
                                        <p className='font-semibold'>{timeFinder(data?.startDate)} - {timeFinder(data?.endDate)}</p>
                                    </div>

                                    <div className='text-primaryColor'>
                                        <h2 className='font-bold'>Meeting Details</h2>

                                        <div className='py-2'>
                                            <p>Meeting ID: 80507067</p>
                                            <p>Room Name: /25ec24e8-aedd-44f6-8b3b-7db6cd5beee3</p>
                                        </div>
                                    </div>

                                    <button className='w-full px-5 border-2 border-blue-600 py-1 rounded-full my-5 font-bold text-blue-800 hover:bg-blue-600 hover:text-white text-lg transition-all'
                                        onClick={() => handleEnableIframe(data?.roomUrl)}
                                    >Join</button>
                                </div>
                            </div>
                        ))
                    ) : (<>No Pending Interviews</>)
                }
            </div>

            {
                isIframeVisible && (
                    <div className='absolute top-0 left-0  z-[77777] w-full h-full '>
                        <MyComponent roomUrl={meetingUrl} />
                    </div>
                )
            }


        </div >
    )
}


export default ScheduledInterviews

const MyComponent = ({ roomUrl }: any) => {
    return <whereby-embed style={{ height: '100%', width: '100%' }} room={roomUrl} />
}