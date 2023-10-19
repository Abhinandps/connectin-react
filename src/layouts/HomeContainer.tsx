import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';


const HomeContainer: React.FC = function () {
    return (
        <>
            <div className='w-full h-full'>HomeContainer</div>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default HomeContainer;

