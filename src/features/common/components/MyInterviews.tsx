
import { useState, useEffect } from 'react'
import apiCall from '../../../services/apiCall';
import "@whereby.com/browser-sdk"

function MyInterviews() {
    const [interviews, setInterviews] = useState([])
    const [isIframeVisible, setIframeVisible] = useState(false);
    const [meetingUrl, setMeetingUrl] = useState('')

    const handleEnableIframe = (roomUrl: any) => {
        setMeetingUrl(roomUrl);
        setIframeVisible(true);
    };

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



    useEffect(() => {
        (async () => {
            const res: any = await await apiCall({
                url: `/jobs/my-interviews`,
                method: 'POST'
            })
            setInterviews(res)
        })()
    }, [])

    console.log(interviews)
    return (
        <div className="w-full h-screen  rounded-md  py-3">
            <div className="px-5 pb-2">
                <h2 className="text-lg font-medium text-primaryColor">MyInterviews</h2>
            </div>
            {
                interviews.length > 0 ? (
                    interviews.map((data: any) => (
                        <div className='bg-white w-full flex items-center justify-between px-5  rounded-md border border-borderColor mb-2'>
                            <h2>{data?.eventType}</h2>
                            <p>{data?.startDate.split('T')[0]}</p>
                            <p className='font-semibold'>{timeFinder(data?.startDate)} - {timeFinder(data?.endDate)}</p>
                            <button className='px-5 border-2 border-blue-600 py-1 rounded-full my-5 font-bold text-blue-800 hover:bg-blue-600 hover:text-white text-lg transition-all'
                                onClick={() => handleEnableIframe(data?.hostRoomUrl)}
                            >Join</button>
                        </div>
                    ))) : (<>No Pending Interviews</>)
            }

            {
                // 
                isIframeVisible && (
                    <div className='absolute top-0 left-0  z-[77777] w-full h-full'>
                        <MyComponent roomUrl={meetingUrl} />
                    </div>
                )
            }

        </div >
    )
}



export default MyInterviews


declare global {
    namespace JSX {
      interface IntrinsicElements {
        'whereby-embed': any;
      }
    }
  }
  

const MyComponent: React.FC<any> = ({ roomUrl }: any) => {
    return <whereby-embed style={{ height: '100%', width: '100%' }} room={roomUrl} />
}
