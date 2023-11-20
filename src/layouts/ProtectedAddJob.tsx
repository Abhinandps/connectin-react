import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import useUserData from '../hooks/useUserData';
import LoadingSpinner from '../components/ui/LoadingSpinner';
const ProtectedAddJob = ({ element }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { userData, loading }: any = useUserData(user.userId);

    useEffect(() => {
        const checkSubscription = async () => {
            // Wait until user data is loaded
            if (loading) {
                return;
            }

            console.log(userData,'from')

            // Your logic to check if the user has a premium subscription
            const hasPremiumSubscription = userData.isPremium;

            if (!hasPremiumSubscription) {
                navigate('/premium');
            }
        };

        checkSubscription();
    }, [loading, navigate, userData]);

    return <>{loading? <LoadingSpinner/> : element}</>;
};

export default ProtectedAddJob