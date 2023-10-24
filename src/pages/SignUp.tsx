import React from 'react'
import { RegisterForm } from '../features/auth';

const SignUp: React.FC = function () {
    return (
        <div className='md:bg-white'>
            <div className='wrapper  h-full py-10 md:flex flex-col md:justify-center md:items-center'>
                <h2 className='px-5 text-[1.8em] py-5'>Join now - oppourtunity awaits</h2>
                <RegisterForm />
            </div>
        </div>
    )
}

export default SignUp;

