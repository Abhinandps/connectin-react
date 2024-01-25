import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import apiCall from '../../services/apiCall';

const Search = () => {

    const [isOpen, setIsOpen] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')

    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        if (searchTerm) {
            setTimeout(async () => {
                const res = await apiCall({
                    url: `/users/?search=${searchTerm}`,
                })
                setSearchData(res.data)
            }, 1000)
        }
    }, [searchTerm])



    const popupRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handler = (e: any) => {
            if (!popupRef.current?.contains(e.target)) {
                setIsOpen(false)
            }
        };
        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [isOpen]);


    return (
        <>
            {/* FIXME: Search to seperate component */}
            <div className="flex justify-center items-center cursor-pointer lg:ms-[45px] md:!pt-3 !pt-4 relative">
                <input
                    type="search"
                    className="relative bg-[#edf3f8] m-0 lg:block hidden flex-auto lg:flex-row rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-sm font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primaryColor dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primaryColor focus:w-[400px] "
                    placeholder="Search"
                    aria-label="Search"
                    onClick={() => setIsOpen(true)}
                    onChange={(e) => setSearchTerm(e.target.value)}
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

                {
                    isOpen && (
                        <div
                            className="bg-white absolute top-12 left-0 z-[777] w-[500px] shadow-lg border border-borderColor rounded-md  transition duration-300 ease-in-out "
                            style={{ opacity: isOpen ? 1 : 0 }}
                            ref={popupRef}
                        >
                            {
                                searchData.map((data: any) => (<List {...data} />))
                            }

                        </div >
                    )
                }
            </div>

        </>
    )
}

export default Search



function List({ firstName, lastName, userId, profileImage, headline }: any) {
    const navigate = useNavigate()
    const handleClick = (userId: string) => {
        setTimeout(() => {
            navigate(`/in/${userId}`);
        }, 0);
    };
    return (

        <button className="flex items-center justify-between w-full hover:bg-sky-100 cursor-pointer px-3 py-1" onClick={() => handleClick(userId)}>

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
            <div className="m-2 flex items-center">
                <h2 style={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} className="text-[13px] text-primaryColor font-medium px-1 capitalize">{firstName} <span className='lowercase'>{lastName}</span>
                </h2>
                <p className='text-secondaryColor px-1 text-xs'>▪ 3rd+ ▪</p>
                <p className="text-xs text-secondaryColor" style={{ width: '230px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {headline}
                </p>
            </div>
            <div className=" m-2 ">
                <img src={profileImage || 'https://picsum.photos/200'}
                    className="rounded-full w-[40px] h-[40px]" alt="" />
            </div>
        </button>


    )
}