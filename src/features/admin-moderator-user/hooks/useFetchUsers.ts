import { useState, useEffect } from 'react';
import apiCall from '../../../services/apiCall';

function useFetchUsers(url: string) {

    const [requestId, setRequestId] = useState<string>('')
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        async function fetchData() {
            try {
                const data = await apiCall({ url: url })

                if (data.error) {
                    throw new Error(data.message);
                }

                setUsers(data.data)
                setLoading(false)

            } catch (error: any) {
                // setUsers([])
                setError(error)
                setLoading(false)
            }
        }

        fetchData()

    }, [requestId && requestId] || [users] || []);

    return { users, loading, error, setRequestId, setUsers, setLoading };
}

export default useFetchUsers;
