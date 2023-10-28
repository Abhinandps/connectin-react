import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";


interface PopupProps {
    isOpen: boolean;
    handleIsOpen: (isOpen: boolean) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, handleIsOpen }) => {

    const popupRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handler = (e: any) => {
            if (!popupRef.current?.contains(e.target)) {
                handleIsOpen(false)
            }
        };


        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div className="absolute top-[38px] right-[20px] z-40 bg-white  border w-[300px] border-borderColor rounded-md shadow-md"
                    ref={popupRef}
                >
                    <div className="">
                        <h2 className="font-bold text-sm bg-sky-100 py-2 text-left px-4">Settings</h2>
                        <ul className="flex flex-col gap-1 my-4 px-4 text-sm">
                            <li>
                                <NavLink
                                    className='text-secondaryColor hover:text-primaryColor'
                                    style={({ isActive }) => ({
                                        color: isActive ? '#121212ed' : '#00000099',
                                    })}
                                    to={'/manage-admins'}>Mange Admin</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className='text-secondaryColor hover:text-primaryColor'
                                    style={({ isActive }) => ({
                                        color: isActive ? '#121212ed' : '#00000099',
                                    })}
                                    to={'/manage-users'}>Mange Users</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default Popup
