import { useEffect, useState } from 'react';
import Card from './Card'
import List from './List'
import Row from './Row'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { acceptConnectionRequest, fetchConnections, fetchConnectionsRequests, rejectConnectionRequest } from '../store/thunks';

function Main() {
    const Invitations = useSelector((state: any) => state.user.invitations)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchConnectionsRequests())
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
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </Row>
        </>
    )
}

export default Main