import React, { useState, useCallback } from 'react'
import InputField from '../../../components/Form/InputField';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../authSlice';
import Button from '../../../components/Form/Button';

interface FormData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const MInputFiled = React.memo(InputField)

const Register: React.FC = function () {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [formData, setFormData] = useState<FormData>(
        {
            email: "",
            password: "",
            firstName: "",
            lastName: ""
        }
    );

    const [errorData, setErrorData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
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

    const { email, password, firstName, lastName } = formData;

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setErrorData({
                email: "",
                password: "",
                firstName: "",
                lastName: ""
            })

            const res = await dispatch(registerUser(formData) as any);

            if (registerUser.fulfilled.match(res)) {
                navigate('/email-confirmation/sent')
            } else if (registerUser.rejected.match(res)) {
                const errors: any = res.payload
                const errorArray = errors.split(',')
                const formattedErrors = errorArray.map((error: any) => error.trim().replace(/^data\./, ''));
                formattedErrors.forEach((error: any) => {
                    const inputFieldName = error.split(" ")[0];
                    onError(inputFieldName, error.toLowerCase())
                });
            }
        } catch (error) { }
    }


    return (
        <div className='md:w-[400px] md:bg-white px-5 md:py-5 md:shadow-xl md:rounded-lg'>
            <form onSubmit={handleSubmit}>
                <MInputFiled
                    Label='Email or phone'
                    placeholder=''
                    onChange={v => onChange("email", v)}
                    value={email}
                    error={errorData.email}
                />
                <MInputFiled
                    Label='Password'
                    placeholder=''
                    type='password'
                    onChange={v => onChange("password", v)}
                    value={password}
                    error={errorData.password}
                />
                <MInputFiled
                    Label='First Name'
                    placeholder=''
                    onChange={v => onChange("firstName", v)}
                    value={firstName}
                    error={errorData.firstName}
                />
                <MInputFiled
                    Label='Last Name'
                    placeholder=''
                    onChange={v => onChange("lastName", v)}
                    value={lastName}
                    error={errorData.lastName}
                />

                <div className='text-xs text-center text-slate-500 leading-relaxed py-3'>
                    By clicking Agree & Join, you agree to the ConnectIn <span className='font-bold text-blue-500'>User Agreement, Privacy Policy</span>, and <span className='font-bold text-blue-500'>Cookie Policy.</span>
                </div>
                <Button
                    title="Agree & Join"
                />
                <div className='relative my-5'>
                    <hr />
                    <span className='bg-white px-3 absolute top-[-13px] left-[50%] translate-x-[-50%]'>or</span>
                </div>
                <Button
                    title="Already on ConnectIn? Sign In"
                    outlineOnly={true}
                    type='button'
                    onClick={() => { navigate('/sign-in'); return {} }}
                />
            </form>

        </div>
    )
}

export default Register;


