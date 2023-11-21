import React from 'react'

const Header = ({ firstName, lastName, headline }) => {
    return (
        <div className='flex items-center gap-2 py-2'>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className='w-[50px] h-50px rounded-full ' />
            <div className=''>
                <h2 className='font-bold text-[13px] text-primaryColor capitalize'>{firstName} {lastName} <span className='font-light text-secondaryColor'> (He/Him)</span> </h2>
                <p className='font-light text-secondaryColor text-xs'>{headline || 'MERN Stack Developer at XYZ'}</p>
            </div>
        </div>
    )
}

export default Header