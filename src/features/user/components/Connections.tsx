import { useDispatch, useSelector } from "react-redux"
import List from "./List"
import Row from "./Row"
import { useEffect, useState } from "react"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import { fetchConnections } from "../store/thunks"


function Connections() {
    const Connections = useSelector((state: any) => state.user.connections)

    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchConnections())
        setIsLoading(false)
    }, [dispatch])


    const removeConnection = (userId:string) => {
        console.log(userId)
    }


    return (
        <>
            <Row title={`Connections`} >
                {
                    isLoading ? (<div className='flex justify-center'><LoadingSpinner /></div>) : Connections.map((user: any) => (
                        <List
                            user={user}
                            connected
                            onRemove={removeConnection}
                        />))
                }
            </Row>
        </>
    )
}

export default Connections