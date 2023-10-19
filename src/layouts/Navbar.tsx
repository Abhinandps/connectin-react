import React from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const Navbar: React.FC = function () {

    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()



    return (
        <div className="w-full py-1 ">
            <div className="container py-2 flex justify-between items-center px-5">
                <Logo />
                <div>
                    <ul className="flex items-center justify-between gap-5" key="auth-links">
                        {isAuthenticated ? (
                            <>
                                <li className="font-bold text-sm px-2 py-2 cursor-pointer">My Network</li>
                                <li className="font-bold text-sm px-2 py-2 cursor-pointer">sign out</li>
                            </>
                        ) : (
                            <>
                                <li className="text-sm text-primaryColor cursor-pointer  hover:bg-slate-100 font-bold px-6 py-3 rounded-full ring-red-100 " onClick={() => navigate('/sign-up')}>Join Now</li>
                                <li className="font-bold border border-primaryColor rounded-full border-blue-500  text-blue-500  hover:bg-blue-100 text-sm px-6 py-3 cursor-pointer" onClick={() => navigate('/sign-in')}>Sign In</li>
                            </>
                        )}

                    </ul>
                </div>
            </div>
        </div>
    );
}



function Logo() {
    return (
        <div className="w-28 h-7 relative">
            <div className="tracking-tighter left-0 top-0 absolute text-primaryColor text-opacity-90 text-3xl font-bold font-['Poppins']">Connect</div>
            <div className="w-6 h-7 left-[125px] top-0 absolute">
                <div className="w-8 h-8 left-0 top-[2px] absolute bg-primaryColor bg-opacity-90 rounded-sm" />
                <div className="tracking-tighter left-[2px] top-0 absolute text-white text-opacity-90 text-3xl font-bold font-['Poppins']">in</div>
            </div>
        </div>
    )
}



export default Navbar;
