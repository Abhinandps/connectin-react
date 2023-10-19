import React from "react";

interface ButtonProps {
    title: string;
    type?: any;
    color?: string;
    onClick?: () => void;
    width?: string;
}

const Button: React.FC<ButtonProps> = function ({ title, type = "submit", color = "#1F5D6A", onClick, width }) {
    return (
        <div>
            <button className="my-1 bg-sky-600 w-full text-white px-3 py-2 text-sm font-bold rounded-md" type={type} onClick={() => onClick && onClick()}>
                {title}
            </button>
        </div>
    )
}

export default Button