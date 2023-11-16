import { useEffect, useState } from 'react';
import apiCall from '../services/apiCall';
import data from '../data/data.json'

const useUserData = (userId: any) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const [updatedData, setUpdatedData] = useState(data)
    const [daysLeft, setDaysLeft] = useState<number>()



    const calculateDaysLeft = (expirationDateString: string | number | Date) => {
        const expirationDate = new Date(expirationDateString);
        const timeDifference = expirationDate.getTime() - Date.now();
        const calculatedDaysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return calculatedDaysLeft;
    };


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);

                const res = await apiCall({
                    url: `/users/${userId}`,
                });
                setUserData(res.data);
                const responseBillingCycle = res.data.premium_subscription[0].billingCycle
                setUpdatedData(updatedData
                    .map((d) => ({ ...d, isActive: d.label === responseBillingCycle ? true : false }))
                    .filter((d) => d.isActive)
                );

                if (res.data && res.data.premium_subscription && res.data.premium_subscription.length > 0) {
                    const expirationDateString = res.data.premium_subscription[0].expiration;
                    const calculatedDaysLeft = calculateDaysLeft(expirationDateString);
                    setDaysLeft(calculatedDaysLeft);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);


    return {
        userData,
        loading,
        error,
        updatedData,
        daysLeft
    };
};

export default useUserData;