import { useEffect, useState } from 'react';
import Card from './Card'
import List from './List'
import Row from './Row'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { acceptConnectionRequest, fetchConnections, fetchConnectionsRequests, fetchRecommendations, rejectConnectionRequest, sendConnectionRequest } from '../store/thunks';
import { useToaster } from '../../../context/toastContext';
import { successSvg } from '../../../components/ui/svgs';
import { FaClock, FaEnvelope, FaUserPlus } from 'react-icons/fa';

function Main() {
    const Invitations = useSelector((state: any) => state.user.invitations)
    const Recommended = useSelector((state: any) => state.user.recommendations)
    const [isLoading, setIsLoading] = useState(false)
    const { setToastDetails } = useToaster()

    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchConnectionsRequests())
        dispatch(fetchRecommendations())
        setIsLoading(false)
    }, [dispatch])


    // useEffect(() => {
    //     (async () => {
    //         const res = await apiCall({ url: `/users/user/${id}`, method: 'POST' })
    //         const result = await apiCall({ url: `/users/${id}` })
    //         setProfile(res.data)
    //         setProfileMoreProfile(result.data)
    //         setFormData({
    //             firstName: result.data?.firstName || "",
    //             lastName: result.data?.lastName || "",
    //             headline: result.data?.headline || "",
    //             profileImage: result.data?.profileImage || "",
    //             coverImage: result.data?.coverImage || ""
    //         });
    //     })()
    // }, [id])


    const ConnectoinStatusFinder = (status: string): { status: string; icon: JSX.Element } => {
        if (status === 'connected') {
            return { status: 'message', icon: <FaEnvelope /> };
        }
        if (status === 'pending') {
            return { status: 'pending', icon: <FaClock /> };
        }
        if (status === 'connect') {
            return { status: 'connect', icon: <FaUserPlus /> };
        }
        return { status: '', icon: <></> };
    };


    const sendRequest = (userId: string) => {
        setTimeout(() => {
            dispatch(sendConnectionRequest(userId))

            // setProfile((prev: any) => {
            //     return {
            //         ...prev,
            //         connectionStatus: 'pending'
            //     };
            // });

            // setToastDetails({ title: "Request Sented", content: `Connection Request sented to ${profile.firstName} ${profile.lastName} successfully`, isActive: true, svgProp: successSvg })

        }, 1000)
    }


    const handleAcceptConnectionRequest = (userId: string) => {
        if (userId) {
            alert(`${userId} is a connection. you can message now`)
            dispatch(acceptConnectionRequest(userId))
            dispatch(fetchConnections())
        }
    }


    const handleRejectConnectionRequest = (userId: string) => {
        if (userId) {
            dispatch(rejectConnectionRequest(userId))
        }
    }


    return (
        <>
            <Row title="Pending invitations" >
                {
                    isLoading ? (<div className='flex justify-center'><LoadingSpinner /></div>) : Invitations.map((user: any) => (
                        <List
                            user={user}
                            onReject={handleRejectConnectionRequest}
                            onAccept={handleAcceptConnectionRequest}
                        />))
                }
            </Row>

            <Row title="Software Engineers you may know">
                <div className='flex flex-wrap gap-4 px-5'>
                    {isLoading ? ((<div className='flex justify-center'><LoadingSpinner /></div>)) :
                        Recommended.map((user: any) =>
                        (
                            <Card
                                user={user}
                            />
                        )
                        )
                    }
                </div>
            </Row>

        </>
    )
}

export default Main