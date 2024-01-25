import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import InputField from '../../../components/Form/InputField';
import Button from '../../../components/Form/Button';

import { loginUser } from '../authSlice';
import { Link, useNavigate } from 'react-router-dom';


interface FormData {
    email: string;
    password: string;
}

interface label {
    title: string;
    label: string;
}

interface LoginProps {
    style?: string;
    label?: label;
}

const MInputFiled = React.memo(InputField)


const Login: React.FC<LoginProps> = function ({ style, label }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                navigate('/')
            } else if (loginUser.rejected.match(res)) {
                const error: any = res.payload
                setError(error);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }


    return (
        <div className={`${style && style} rounded-lg`}>
            {
                label && (
                    <div className='mb-5'>
                        <h2 className='text-[1.8em] font-medium'>{label.title}</h2>
                        <p className='text-xs my-1'>Stay updated on your professinal world</p>
                    </div>
                )
            }
            <form onSubmit={handleSubmit}>
                <MInputFiled
                    Label='Email or phone'
                    placeholder=''
                    onChange={v => onChange("email", v)}
                    value={email}
                    error=''
                    globalError={error}
                />

                <MInputFiled
                    Label='Password'
                    placeholder=''
                    type='password'
                    onChange={v => onChange("password", v)}
                    value={password}
                    error=''
                    globalError={error}
                />

                <div className={`text-danger font-regualr text-xs my-2`}>{error}</div>
                <div className='my-5'><Link className='text-blue-500 font-bold text-sm ' to='/request-password-reset'>Forgot Password?</Link></div>

                <Button
                    title="Sign in"
                />
                <div className='relative my-5'>
                    <hr />
                    <span className='bg-white px-3 absolute top-[-13px] left-[50%] translate-x-[-50%]'>or</span>
                </div>

                <Button
                    title="New to ConnectIn? Join now"
                    outlineOnly={true}
                    type='button'
                    onClick={() => { navigate('/sign-up'); return {}; }}
                />

            </form>
        </div>
    )
}



export default Login;