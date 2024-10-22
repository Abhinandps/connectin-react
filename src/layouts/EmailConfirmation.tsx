// EmailConfirmation.js
import { useState, useEffect } from 'react';
import { useNavigate, } from 'react-router-dom';
import apiCall from '../services/apiCall';

const EmailConfirmation = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    const [loading, setLoading] = useState(true);
    const [confirmationError, setConfirmationError] = useState('');



    useEffect(() => {
        const confirmEmail = async () => {
            try {
                if (token) {
                    // const response = await fetch(`https://serverapponline.cloud/auth/email-confirmation/confirm`, {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({ token: token }),
                    //     credentials: 'include'
                    // });

                    await apiCall({
                        url: `/auth/email-confirmation/confirm`,
                        method: 'POST',
                        data: { token: token }
                    })

                    setTimeout(() => {
                        setLoading(false);
                    }, 2000)

                    // if (response.ok) {
                       
                    // }
                    //  else {
                    //     // Email confirmation failed
                    //     setConfirmationError('Email confirmation failed. Please try again.');
                    //     setLoading(false);
                    // }
                } else {
                    setConfirmationError('');
                    // setLoading(false);
                }
            } catch (error) {
                // setConfirmationError('An error occurred while confirming the email.');
                // setLoading(false);
            }
        };

        confirmEmail();

    }, [token]);


    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div>
                        {confirmationError ? (
                            <p>{confirmationError}</p>
                        ) : (
                            <>
                                <div>
                                    <h1>Congratulations! Your account has been confirmed.</h1>
                                    <p>Please login to access all the features of ConnectIn and connect with your friends and colleagues.</p>
                                </div>

                                <button className='bg-blue-500 rounded-e-full text-white' onClick={() => navigate('/sign-in')}>Sign In</button>
                            </>
                        )}

                    </div>
                </>
            )}

        </div>
    );
};

export default EmailConfirmation;
