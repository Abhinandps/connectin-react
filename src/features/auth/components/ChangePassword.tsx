import React, { useState, useCallback } from 'react'
import InputField from '../../../components/Form/InputField';
import Button from '../../../components/Form/Button';

import { useLocation, useNavigate } from 'react-router-dom';
import { changePassword, verifyRequestReset } from '../services/authService';


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
        <div className='w-full py-10   h-full flex items-center justify-center'>
            <div className='w-[300px] p-5 bg-white shadow-md rounded-lg'>
                Enter new password
                <form onSubmit={handleSubmit}>
                    <MInputFiled
                        Label='New Password'
                        placeholder=''
                        type='password'
                        onChange={v => onChange("newPassword", v)}
                        value={newPassword}
                        error=''
                    />
                    <MInputFiled
                        Label='Confrim New Password'
                        placeholder=''
                        type='password'
                        onChange={v => onChange("confirmNewPassword", v)}
                        value={confirmNewPassword}
                        error=''
                    />
                    <div className="text-red-600 font-bold text-xs my-2">{error}</div>
                    <Button
                        title="Submit"
                    />

                </form>
            </div>
        </div>

    )
}

export default ChangePassword;