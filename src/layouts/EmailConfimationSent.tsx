// EmailConfirmation.js
import { useState, useEffect } from 'react';

const EmailConfirmationSent = () => {

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, []);


    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2>Email Confirmation sent !</h2>
                </>
            )}

        </div>
    );
};

export default EmailConfirmationSent;
