import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './NavigationLayout';
import Footer from './Footer';
import { ToastContextProvider } from '../context/toastContext';


const HomeContainer: React.FC = function () {
    return (
        <>
            <ToastContextProvider>
                <Navbar />
                <Outlet />
                <Footer />
            </ToastContextProvider>
        </>
    )
}

export default HomeContainer;

