import { useDispatch, useSelector } from "react-redux"
import List from "./List"
import { useEffect, useState } from "react"
import { fetchFollowing } from "../store/thunks"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"

function Following() {
    const following = useSelector((state: any) => state.user.following)

    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchFollowing() as any)
        setIsLoading(false)
    }, [dispatch])
    return (
        <>
            {
                isLoading ? (<div className='flex justify-center'><LoadingSpinner /></div>) :
                    following && following.map((user: any) =>
                    (
                        <List
                            user={user}
                            follow={user?.connectionStatus === 'following'}
                            follows={user?.connectionStatus !== 'following'}
                        />)
                    )
            }
        </>
    )
}

export default Following