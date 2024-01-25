import { useDispatch, useSelector } from "react-redux"
import List from "./List"
import { useEffect, useState } from "react"
import { fetchFollowers } from "../store/thunks"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"

function Followers() {

    const followers = useSelector((state: any) => state.user.followers)

    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchFollowers() as any)
        setIsLoading(false)
    }, [dispatch])


    // const FollowStatusFinder = (status: string): { status: string; icon: JSX.Element, color?: string } => {
    //     if (status === 'following') {
    //         return { status: 'following..', icon: <></>, color: 'transparent' };
    //     }
    //     if (status === 'follow') {
    //         return { status: 'follow', icon: <FaUserPlus /> };
    //     }
    //     if (status === 'not followed') {
    //         return { status: 'follow', icon: <FaPlus /> };
    //     }
    //     return { status: '', icon: <></> };
    // };

    return (
        <>
            {
                isLoading ? (<div className='flex justify-center'><LoadingSpinner /></div>) :
                    followers && followers.map((user: any) =>
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

export default Followers