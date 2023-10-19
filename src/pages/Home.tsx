import React from 'react'
import { LoginForm } from '../features/auth';

const Home: React.FC = function () {
    return (
        <>
            <div className='w-full py-10   h-full flex items-center justify-center'>
                <LoginForm />
            </div>
        </>
    )
}

export default Home;

