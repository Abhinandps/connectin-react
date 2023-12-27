import { useDispatch, useSelector } from "react-redux"
import List from "./List"
import Row from "./Row"
import { useEffect, useState } from "react"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import { fetchConnections, fetchFollowers, removeConnectionReducer } from "../store/thunks"
import { useToaster } from "../../../context/toastContext"
import { successSvg } from "../../../components/ui/svgs"


function Connections() {
    const Connections = useSelector((state: any) => state.user.connections)

    const { setToastDetails } = useToaster()


    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchConnections())
        dispatch(fetchFollowers())
        setIsLoading(false)
    }, [dispatch])


    const removeConnection = (userId: string) => {
        dispatch(removeConnectionReducer(userId))

        setToastDetails({ title: "Connection Removed", content: `Connection Removed Successfully `, isActive: true, svgProp: successSvg })

    }


    return (
        <>
            <Row title={`Connections`} >
                {
                    isLoading ? (<div className='flex justify-center'><LoadingSpinner /></div>) : Connections && Connections.map((user: any) => (
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