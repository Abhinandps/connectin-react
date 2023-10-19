import React, { useState, useCallback } from 'react'
import InputField from '../../../components/Form/InputField';
import Button from '../../../components/Form/Button';

import { useLocation, useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '..';
import { verifyRequestReset } from '../services/authService';


interface FormData {
    email: string;
    otp: number;
}


const MInputFiled = React.memo(InputField)

const Verify: React.FC = function () {

    const location = useLocation();

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>(
        {
            email: location.state.email || "",
            otp: 0,
        }
    );

    const [errorData, setErrorData] = useState({
        otp: "",
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


    const { email, otp } = formData;

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setErrorData({
                otp: ""
            })


            const res = await verifyRequestReset(email, parseInt(otp))
            if (res.message === 'OTP verified') {
                navigate("/changepassword/verify", { state: { email: formData.email } });
            }

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
                Enter the 6 digit code
                <form onSubmit={handleSubmit}>
                    <MInputFiled
                        Label='verification code'
                        placeholder=''
                        type='number'
                        onChange={v => onChange("otp", v)}
                        value={otp}
                        error={errorData.otp}
                    />
                    <span onClick={() => { }}>Resend Code</span>
                    <Button
                        title="Submit"
                    />

                </form>
            </div>
        </div>
    )
}

export default Verify;