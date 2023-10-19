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
        <div className='w-full py-10   h-full flex items-center justify-center'>

            <div className='w-[300px] p-5 bg-white shadow-md rounded-lg'>
                Forgot Password
                <form onSubmit={handleSubmit}>
                    <MInputFiled
                        Label='Email or phone'
                        placeholder=''
                        onChange={v => onChange("email", v)}
                        value={email}
                        error={errorData.email}
                    />
                    <Button
                        title="Next"
                    />
                    <Button
                        title="Back"
                        type='button'
                    />
                </form>
            </div>
        </div>
    )
}

export default PasswordForgot;