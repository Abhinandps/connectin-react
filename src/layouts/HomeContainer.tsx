import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './NavigationLayout';
import Footer from './Footer';
import Chat from '../pages/Chat';


const HomeContainer: React.FC = function () {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default HomeContainer;

