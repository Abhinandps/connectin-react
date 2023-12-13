import React from 'react'
import { LoginForm } from '../features/auth';

const Home: React.FC = function () {
    return (
        <>
            <div className='wrapper py-10 px-5 flex flex-col md:flex-row items-center'>
                <div className='lg:w-[750px] h-full'>
                    <p className='text-highlight font-extralight
                    text-[1.3rem] md:text-[2rem] lg:text-[3rem] pb-5 mb-5'>Welcome to your professional community</p>
                    <div className='lg:w-[450px]'>
                        <LoginForm />
                    </div>
                </div>
                <div className='py-5'>
                    <img src="https://res.cloudinary.com/ds7fy5acd/image/upload/v1702224453/image_folder/rvgbuzxywleu3cs6obha.svg" alt="" />
                </div>
            </div>
        </>
    )
}

export default Home;

