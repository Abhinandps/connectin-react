import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import InputField from '../../../components/Form/InputField';
import Button from '../../../components/Form/Button';

import { loginUser } from '../authSlice';
import { Link, useNavigate } from 'react-router-dom';
import PasswordForgot from './PasswordForgot';


interface FormData {
    email: string;
    password: string;
}

const MInputFiled = React.memo(InputField)

const Login: React.FC = function () {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [formData, setFormData] = useState<FormData>(
        {
            email: "",
            password: ""
        }
    );

    const [error, setError] = useState<string | null>("")

    const onChange = useCallback((key: string, value: string | number) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }, [formData])


    const { email, password } = formData;

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setError("")

            // Dispatch the loginUser action with loginData as the argument
            const res = await dispatch(loginUser(formData));

            if (loginUser.fulfilled.match(res)) {
                // console.log('User is logged in : ', res.payload?.user);
                navigate('/')

            } else if (loginUser.rejected.match(res)) {
                const error: any = res.payload
                setError(error);
            }
        } catch (error) {
            // Handle errors if necessary
            console.error('Login error:', error);
        }
    }



    return (
        <div className='w-[300px] p-5 bg-white shadow-md rounded-lg'>
            <form onSubmit={handleSubmit}>
                <MInputFiled
                    Label='Email or phone'
                    placeholder=''
                    onChange={v => onChange("email", v)}
                    value={email}
                    error=''
                />
                <MInputFiled
                    Label='Password'
                    placeholder=''
                    type='password'
                    onChange={v => onChange("password", v)}
                    value={password}
                    error=''
                />
                <div className="text-red-600 font-bold text-xs my-2">{error}</div>
                <div className='my-2'><Link className='text-blue-400 font-bold text-sm underline' to='/request-password-reset'>Forgot Password?</Link></div>
                <Button
                    title="Sign In"
                />
            </form>
        </div>
    )
}

export default Login;