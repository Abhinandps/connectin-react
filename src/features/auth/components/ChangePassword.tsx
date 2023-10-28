import React, { useState, useCallback } from 'react'
import InputField from '../../../components/Form/InputField';
import Button from '../../../components/Form/Button';

import { useLocation, useNavigate } from 'react-router-dom';
import { changePassword } from '../services/authService';


interface FormData {
    email: string;
    newPassword: string;
    confirmNewPassword: string;
}

const MInputFiled = React.memo(InputField)

const ChangePassword: React.FC = function () {

    const location = useLocation();

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>(
        {
            email: location.state.email || "",
            newPassword: '',
            confirmNewPassword: ''
        }
    );

    const [error, setError] = useState<string | null>("")

    const onChange = useCallback((key: string, value: string | number) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }, [formData])



    const { email, newPassword, confirmNewPassword } = formData;

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setError('')

            const res = await changePassword(email, newPassword, confirmNewPassword)
            if (res.message === 'Password changed successfully') {
                navigate("/sign-in");
            }

            return res;
        } catch (error: any) {
            setError(error)
        }
    }

    return (
        <div className='md:bg-[white]'>
            <div className='container h-full py-10 md:flex md:justify-center md:items-center'>
                <div className='md:w-[400px] md:bg-white px-5 md:py-5 md:rounded-lg md:shadow-xl'>
                    <form onSubmit={handleSubmit}>

                        <h2 className='text-[1.6em] md:text-[1.8em] font-medium py-2'>Enter new password</h2>
                        <MInputFiled
                            Label='New Password'
                            placeholder=''
                            type='password'
                            onChange={v => onChange("newPassword", v)}
                            value={newPassword}
                            error=''
                            globalError={error}
                        />
                        <MInputFiled
                            Label='Confrim New Password'
                            placeholder=''
                            type='password'
                            onChange={v => onChange("confirmNewPassword", v)}
                            value={confirmNewPassword}
                            error=''
                            globalError={error}
                        />
                        <div className={`text-danger font-regualr text-xs my-2`}>{error}</div>
                        <Button
                            title="Submit"
                        />

                    </form>
                </div>
            </div>
        </div>

    )
}

export default ChangePassword;