import React from "react"
import { useAuth } from "../features/auth/hooks/useAuth";
import NavBar from "../components/NavBar/NavBar";
import useUserData from "../hooks/useUserData";

const NavigationLayout: React.FC = function () {

    const { isAuthenticated } = useAuth()

  

    return (
        <div className={`w-full ${isAuthenticated && 'border-b border-borderColor'} `}>
            <div className={`wrapper mx-auto flex  ${isAuthenticated ? 'md:justify-between' : 'md:justify-between py-3'} justify-start items-center px-5 `}>
                <NavBar/>
            </div>
        </div>
    );
}


export default NavigationLayout;
