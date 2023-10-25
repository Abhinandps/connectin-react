import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";


import {
    TETabs,
    TETabsItem,
} from "tw-elements-react";
import { contentAdminManageList, navdata, superAdminManageList, usersManageList } from "../utils/navigationData";
import { logoutUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";


const Navbar: React.FC = function () {

    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    const [activeTab, setActiveTab] = useState(navdata[0].id);

    const handleTabClick = (value: string, path: string) => {
        if (value === activeTab) {
            return;
        }
        setActiveTab(value);
        navigate(path)
    };

    return (
        <div className={`w-full ${isAuthenticated && 'border-b border-borderColor'} `}>
            <div className={`wrapper mx-auto flex  ${isAuthenticated ? 'md:justify-start' : 'md:justify-between py-3'} justify-start items-center px-5 `}>
                <Logo isAuthenticated={isAuthenticated} />
                <div>
                    {isAuthenticated ? (
                        <TETabs className="flex !flex-nowrap items-center justify-between !mb-0 ml-[50px] ">

                            {/* FIXME: Search to seperate component */}
                            <div className="w-[50px] flex justify-center items-center cursor-pointer lg:mr-[200px] md:!pt-3 !pt-4">
                                <input
                                    type="search"
                                    className="relative bg-[#edf3f8] m-0 lg:block hidden flex-auto lg:flex-row rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-sm font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primaryColor dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primaryColor"
                                    placeholder="Search"
                                    aria-label="Search"
                                />

                                <div className="hidden lg:flex w-full justify-center flex-wrap items-stretch gap-1">
                                    {/* <!--Search icon--> */}
                                    <span
                                        className="text-[1.8em] input-group-text flex  items-center whitespace-nowrap rounded text-center font-normal text-neutral-700 dark:text-neutral-200"
                                        id="basic-addon2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5">
                                            <path
                                                fillRule="evenodd"
                                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </span>

                                    <span className="hidden lg:inline-block md:block text-xs text-secondaryColor hover:text-primaryColor">Search</span>
                                </div>
                            </div>

                            {/* Navigation list  */}
                            {navdata && navdata.map((data) => (
                                <NavItem key={data.id} data={data} handleTabClick={handleTabClick} activeTab={activeTab} />
                            ))}
                        </TETabs>
                    ) : (
                        <TETabs className="flex !flex-nowrap items-center justify-between gap-5 !mb-0 lg:ml-0 ml-[50px] ">
                            <li className="text-sm text-primaryColor cursor-pointer  hover:bg-slate-100 font-bold px-6 py-3 rounded-full ring-red-100  " onClick={() => navigate('/sign-up')}>Join Now</li>
                            <li className="font-bold border rounded-full border-blue-500  text-blue-500  hover:bg-blue-50 text-sm px-6 py-3 cursor-pointer" onClick={() => navigate('/sign-in')}>Sign In</li>
                        </TETabs>
                    )}
                </div>
            </div>
        </div>
    );
}

// FIXME: navitem into seperate component
const NavItem = React.memo(function ({ data, handleTabClick, activeTab }: { data: any, handleTabClick: any, activeTab: any }) {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
            <TETabsItem key={data?.id} onClick={() => data.modal ? setIsOpen(!isOpen) : handleTabClick(data.id, data.path)}
                active={activeTab === data.id}
                disabled={data.disabled}
                className={`relative text-sm !capitalize !mt-0 !mb-0 !px-0  md:w-[80px] w-[50px] md:!pb-1 md:!pt-3 !pb-4 !pt-4 cursor-pointer !hover:bg-none flex flex-col justify-center items-center gap-1 text-secondaryColor hover:text-primaryColor font-normal mx-1'
                disabled={data.disabled`}
            >
                {data.icon ? (
                    data.icon instanceof Function ? (
                        < data.icon className={`text-[1.8em] ${activeTab === data.id ? 'text-primaryColor' : 'text-secondaryColor'}  hover:text-primaryColor focus:text-primaryColor`} />
                    ) : (
                        <img className="w-[22px] h-[22px] rounded-full" src={data.icon} alt={data.title} />
                    )
                ) : null}

                <span className=" text-xs hidden md:block ">
                    <div className="flex items-center justify-center gap-1">
                        <p>{data.title}</p>
                        {data.subIcon && (
                            < data.subIcon className='text-[1em] text-secondaryColor hover:text-primaryColor' />
                        )}
                    </div>
                </span>
                {
                    data.modal && isOpen ? (

                        <Popup handleIsOpen={setIsOpen} isOpen={isOpen} />

                    ) : null
                }
            </TETabsItem>
        </>
    )


})


interface PopupProps {
    isOpen: boolean;
    handleIsOpen: (isOpen: boolean) => void;
}

// FIXME: popup into seperate component
const Popup: React.FC<PopupProps> = ({ isOpen, handleIsOpen }) => {

    const { user } = useAuth()
    const dispatch = useDispatch()

    const popupRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handler = (e) => {
            if (!popupRef.current?.contains(e.target)) {
                handleIsOpen(false)
            }
        };


        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [isOpen]);



    // FIXME: fix the function also remove unwanted code
    const handleLogout = async () => {
        try {
            // e.preventDefault();

            // FIXME: fix the typeError of function
            await dispatch(logoutUser());

            // if (loginUser.fulfilled.match(res)) {
            //     navigate('/')

            // } else if (loginUser.rejected.match(res)) {
            //     const error: any = res.payload
            //     setError(error);
            // }
        } catch (error) {
            // Handle errors if necessary
            console.error('Logout error:', error);
        }
    }


    return (
        <>
            {isOpen && (
                <div className="absolute top-[65px] right-0 z-40 bg-white  py-2 border w-[300px] border-borderColor rounded-md shadow-md"
                    ref={popupRef}
                >
                    <div className="border-b border-borderColor pb-3">
                        <div className="flex items-center">
                            <div className="w-[60px] h-[60px] m-2 ">
                                <img src='https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645719137?e=1703116800&v=beta&t=emx0qOZ_uF1VpGQGbBT_cLE9uE_Q7D5vov-PgRQXy1I' className="rounded-full" alt="" />
                            </div>
                            <div className="m-2">
                                <h2 className="text-[16px] text-primaryColor font-bold">Abhinand P S</h2>
                                <p className="text-xs">Full stack developer.</p>
                            </div>
                        </div>
                        <div className="px-3">
                            <button className=" w-full py-1 border border-blue-500 rounded-full text-blue-500 font-bold"> View Profile</button>
                        </div>
                    </div>

                    <div className="border-b border-borderColor">
                        <div className="m-2">
                            <h2 className="font-bold text-sm">Account</h2>
                            <span>Try Premium for ₹0</span>
                            <ul className="flex flex-col gap-1 mt-1">
                                <li>Settings & privacy</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-b border-borderColor">
                        <div className="m-2">
                            <h2 className="text-sm font-bold">Manage</h2>
                            <ul className="flex flex-col gap-1 mt-1">
                                {
                                    user.role === 'user' ? (
                                        usersManageList.map(({ id, title, path }: any) => (
                                            <li>
                                                <Link key={id} to={path}>{title}</Link>
                                            </li>
                                        ))
                                    ) : user.role === 'admin' ? (
                                        superAdminManageList.map(({ id, title, path }: any) => (
                                            <li>
                                                <Link key={id} to={path}>{title}</Link>
                                            </li>
                                        ))
                                    ) : (
                                        contentAdminManageList.map(({ id, title, path }: any) => (
                                            <li>
                                                <Link key={id} to={path}>{title}</Link>
                                            </li>
                                        ))
                                    )
                                }

                            </ul>
                        </div>
                    </div>

                    <div className="m-2">
                        <ul>
                            <li onClick={() => handleLogout()}>Sign Out</li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}


interface logoProps {
    isAuthenticated?: boolean;
}

export const Logo: React.FC<logoProps> = function ({ isAuthenticated }) {
    const navigate = useNavigate()
    return (
        <div className="md:w-16 me-2 h-7 relative cursor-pointer" onClick={() => navigate('/')}>
            {
                isAuthenticated ? (
                    <>
                        <div className="w-9 h-9 left-0 top-[1px] absolute bg-primaryColor bg-opacity-90 rounded-sm" />
                        <div className="tracking-tighter left-[5px] top-1 absolute text-white text-opacity-90 text-3xl font-bold font-['Poppins']">in</div>
                    </>
                ) : (
                    <>
                        <div className="tracking-tighter hidden md:block left-0 top-0 absolute text-primaryColor text-opacity-90 text-3xl font-bold font-['Poppins']">Connect</div>
                        <div className="w-6 h-7 md:left-[125px] top-0 absolute">
                            <div className="w-9 h-9 left-0 top-[1px] absolute bg-primaryColor bg-opacity-90 rounded-sm" />
                            <div className="tracking-tighter left-[5px] top-1 absolute text-white text-opacity-90 text-3xl font-bold font-['Poppins']">in</div>
                        </div></>
                )
            }

        </ div>
    )
}


export default Navbar;
