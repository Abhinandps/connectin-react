import React from 'react'
import { RegisterForm } from '../features/auth';

const SignUp: React.FC = function () {
    return (
        <>
            <div className='w-full py-10   h-full flex items-center justify-center'>
                <RegisterForm />
            </div>
        </>
    )
}

export default SignUp;

