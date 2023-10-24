import React from 'react'
import { LoginForm } from '../features/auth';

const SignIn: React.FC = function () {
    return (
        <>
            <div className='md:bg-white'>
                <div className='wrapper h-full py-10  md:flex flex-col md:justify-center md:items-center'>
                    <LoginForm label={{ title: "Sign in", label: "Stay updated on your professional world" }} style='md:w-[400px] md:bg-white px-5 md:py-5 md:rounded-lg `' />
                </div>
            </div>
        </>
    )
}

export default SignIn;

