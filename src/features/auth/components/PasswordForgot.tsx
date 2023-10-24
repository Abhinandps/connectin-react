import React, { useState, useCallback } from 'react'
import InputField from '../../../components/Form/InputField';
import Button from '../../../components/Form/Button';

import { useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '..';


interface FormData {
    email: string;
}

interface verifyFormData {
    email: string;
    otp: string;
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

const PasswordForgot: React.FC = function () {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>(
        {
            email: "",
        }
    );

    const [errorData, setErrorData] = useState({
        email: "",
    })

    const onChange = useCallback((key: string, value: string | number) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }, [formData])


    const onError = useCallback((key: string, value: string | number) => {
        setErrorData(prev => ({
            ...prev,
            [key]: value
        }))
    }, [formData])




    const { email } = formData;

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setErrorData({
                email: ""
            })
            const res = await requestPasswordReset(email)
            navigate("/checkpoint/verify", { state: { email: formData.email } });
            return res;
        } catch (error: any) {
            error.split(',').forEach((err: string) => {
                const inputFieldName = err.split(" ")[0];
                onError(inputFieldName, err.toLowerCase())
            });
        }
    }

    return (
        <div className='md:bg-[white]'>
            <div className='container h-full py-10 md:flex md:justify-center md:items-center'>
                <div className='md:w-[400px] md:bg-white px-5 md:py-5 md:rounded-lg md:shadow-xl'>
                    <form onSubmit={handleSubmit}>
                        <h2 className='text-[1.8em] font-medium py-2'>Forgot Password</h2>
                        <MInputFiled
                            Label=''
                            placeholder='Email or phone'
                            onChange={v => onChange("email", v)}
                            value={email}
                            error={errorData.email}
                        />
                        <p className='text-xs py-5 leading-relaxed'>We’ll send a verification code to this email or phone number if it matches an existing ConnectIn account.</p>
                        <Button
                            title="Next"
                        />
                        <div className='py-1'></div>
                        <Button
                            title="Back"
                            type='button'
                            outlineOnly={true}
                            onClick={()=>navigate('/sign-in')}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PasswordForgot;