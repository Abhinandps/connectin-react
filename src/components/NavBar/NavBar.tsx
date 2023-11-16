import { useState } from 'react'
import { navdata } from '../../utils/navigationData';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Logo } from './Logo';
import { TETabs } from 'tw-elements-react';
import NavItem from '../ui/NavItem';
import useUserData from '../../hooks/useUserData';

const NavBar = () => {

    const { isAuthenticated } = useAuth()
  

    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState(navdata[0].id);

    const handleTabClick = (value: string, path: string) => {
        if (value === activeTab) {
            return;
        }
        setActiveTab(value);
        navigate(path)
    };
    return (
        <>
            <Logo isAuthenticated={isAuthenticated} />

            <div>
                {isAuthenticated ? (
                    <TETabs className="flex !flex-nowrap items-center justify-between !mb-0 ml-[50px] ">

                        {/* Navigation list  */}
                        {navdata && navdata.map((data) => (
                            <NavItem
                                key={data.id}
                                data={data}
                                handleTabClick={handleTabClick}
                                activeTab={activeTab} />
                        ))}

                    </TETabs>
                ) : (
                    <TETabs className="flex !flex-nowrap items-center justify-between gap-5 !mb-0 lg:ml-0 ml-[50px] ">
                        <li className="text-sm text-primaryColor cursor-pointer  hover:bg-slate-100 font-bold px-6 py-3 rounded-full ring-red-100  " onClick={() => navigate('/sign-up')}>Join Now</li>
                        <li className="font-bold border rounded-full border-blue-500  text-blue-500  hover:bg-blue-50 text-sm px-6 py-3 cursor-pointer" onClick={() => navigate('/sign-in')}>Sign In</li>
                    </TETabs>
                )}
            </div>
        </>
    )
}

export default NavBar