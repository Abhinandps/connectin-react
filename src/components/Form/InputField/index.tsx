import React from 'react'

interface InputFieldProps {
    Label: string;
    placeholder: string;
    type?: string;
    onChange: (value: string) => void;
    value: string;
    error: string;
}

const InputField: React.FC<InputFieldProps> = function ({ Label, placeholder, type = "text", onChange, value, error }) {
    return (
        <div>
            <label className='block text-sm font-medium leading-6 text-gray-900'>{Label}</label>
            <input
                className='block w-full flex-1 border border-neutral-400 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={e => onChange && onChange(e.target.value)}
            // disabled={!onChange}
            />
            <p className='text-red-600 font-bold text-xs my-2'>{error}</p>
        </div>
    )
}

export default InputField;

