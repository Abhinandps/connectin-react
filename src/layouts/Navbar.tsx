import React from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const Navbar: React.FC = function () {

    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    


    return (
        <div className="shadow-md py-2 flex justify-between px-10">
            <div>logo</div>
            <div>
                <ul className="flex gap-5" key="auth-links">
                    {isAuthenticated ? (
                        <>
                            <li className="font-bold text-sm px-2 py-2 cursor-pointer">My Network</li>
                            <li className="font-bold text-sm px-2 py-2 cursor-pointer">sign out</li>
                        </>
                    ) : (
                        <>
                            <li className="bg-blue-600 text-sm px-2 cursor-pointer font-bold py-2 rounded-md ring-red-100 text-white" onClick={() => navigate('/sign-up')}>Join Now</li>
                            <li className="font-bold text-sm px-2 py-2 cursor-pointer" onClick={() => navigate('/sign-in')}>Sign In</li>
                        </>
                    )}

                </ul>
            </div>
        </div>
    );
}




export default Navbar;
