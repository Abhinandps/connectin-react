import React, { useState, useCallback } from 'react'
import InputField from '../../../components/Form/InputField';
import Button from '../../../components/Form/Button';

import { useLocation, useNavigate } from 'react-router-dom';
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


            const res = await verifyRequestReset(email, otp) // parseInt ?
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
        <div className='md:bg-[white]'>
            <div className='container h-full py-10 md:flex md:justify-center md:items-center'>

                <div className='md:w-[400px] md:bg-white px-5 md:py-5 md:rounded-lg md:shadow-xl'>

                    <h2 className='text-[1.8em] font-medium py-2'>Enter the 6-digit code</h2>
                    <p className='text-xs py-1'>Check <span className='font-bold'>psabhinand333s@gmail.com</span> for a verification code.</p>
                    <form onSubmit={handleSubmit}>
                        <MInputFiled
                            Label='verification code'
                            placeholder=''
                            type='number'
                            onChange={v => onChange("otp", v)}
                            value={otp.toString()}
                            error={errorData.otp}
                        />
                        <div className=' mb-4'> <span className=' text-xs text-blue-500 hover:bg-blue-50 py-1 rounded-full px-1 cursor-pointer font-bold' onClick={() => { }}>Resend code</span> </div>
                        <Button
                            title="Submit"
                        />

                        <p className='text-xs py-5 text-slate-400 leading-relaxed font-normal'>
                            If you don't see a code in your inbox, check your spam folder. If it's not there, the email address may not be confirmed, or it may not match an existing LinkedIn account.</p>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Verify;