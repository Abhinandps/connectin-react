import React from "react";
import { TERipple } from "tw-elements-react";

interface ButtonProps {
    title: string;
    type?: any;
    color?: string;
    onClick?: (e) => {};
    width?: string;
    outlineOnly?: boolean;
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = function ({ title, type = "submit", color = "#1F5D6A", onClick, width, outlineOnly, disabled }) {
    return (
        <div>
            <TERipple className={` ${disabled && 'opacity-[0.3]'} ${outlineOnly ? 'bg-none border border-primaryColor ' : 'bg-primaryColor shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'} my-2  w-full text-white font-medium px-3 py-4 text-base rounded-full  `} rippleColor="light">
                <button className={`w-full ${outlineOnly && 'text-black/[.62] '}`} type={type} onClick={(e) => onClick && onClick(e)}
                    disabled={disabled && disabled}
                >
                    {title}
                </button>
            </TERipple>
        </div>
    )
}

export default Button