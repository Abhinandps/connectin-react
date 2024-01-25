import { useEffect, useState } from 'react';
import Card from './Card'
import List from './List'
import Row from './Row'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { acceptConnectionRequest, fetchConnections, fetchConnectionsRequests, fetchRecommendations, rejectConnectionRequest, sendConnectionRequest } from '../store/thunks';
// import { useToaster } from '../../../context/toastContext';

function Main() {
    const Invitations = useSelector((state: any) => state.user.invitations)
    const Recommended = useSelector((state: any) => state.user.recommendations)
    const [isLoading, setIsLoading] = useState(false)
    // const { setToastDetails } = useToaster()

    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchConnectionsRequests())
        dispatch(fetchRecommendations())
        setIsLoading(false)
    }, [dispatch])


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