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

            const res = await dispatch(registerUser(formData));

            if (registerUser.fulfilled.match(res)) {
                navigate('/feed')
            } else if (registerUser.rejected.match(res)) {
                const errors: any = res.payload
                errors.split(',').forEach((error: string) => {
                    const inputFieldName = error.split(" ")[0];
                    onError(inputFieldName, error.toLowerCase())
                });
            }
        } catch (error) { }
    }

    return (
        <div className='w-[300px] p-5 bg-white shadow-md rounded-lg'>Register Form
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
                <Button
                    title="Sign Up"
                />
            </form>

        </div>
    )
}

export default Register;


