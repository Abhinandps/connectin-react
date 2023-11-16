import React, { useState } from 'react'
import { TETabsItem } from 'tw-elements-react';
import Popup from '../NavBar/PopUp';


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

                        <Popup  handleIsOpen={setIsOpen} isOpen={isOpen} />

                    ) : null
                }
            </TETabsItem>
        </>
    )


})

export default NavItem