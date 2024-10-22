import React from 'react'

interface InputFieldProps {
    Label: string;
    placeholder: string;
    type?: string;
    onChange: (value: string) => void;
    value: string;
    error: string;
    globalError?: string | null;
    outline?: boolean
    ref?: any
    handleSearchChange?: any
}

const InputField: React.FC<InputFieldProps> = function ({ Label, placeholder, type = "text", onChange, value, error, globalError, outline = true, ref, handleSearchChange }) {
    return (
        <div className='mt-[1em]'>
            <label className={`${error || globalError ? 'text-danger' : 'text-black/[.62] '} block text-sm font-semibold leading-6 mb-2 `}>{Label}</label>
            <input
                className={`${error || globalError ? 'border-danger' : ' border-neutral-400'} block w-full flex-1 ${outline && 'border  rounded-md'}  bg-transparent py-4 px-4 text-gray-900 placeholder:text-gray-400 text-[14px] font-regular outline-none  sm:text-sm sm:leading-6`}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={e => {
                    if (onChange) {
                        onChange(e.target.value);
                    }
                    if (handleSearchChange) {
                        handleSearchChange(e.target.value);
                    }
                }}
                disabled={!onChange}
                ref={ref}
            />
            <p className='text-danger font-medium text-xs mt-3'>{error}</p>
        </div>
    )
}

export default InputField;

