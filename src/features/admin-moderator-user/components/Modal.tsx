
import React, { useEffect, useState } from "react";
import { TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter } from "tw-elements-react";
import SearchInput from "./SearchInput";
import apiCall from "../../../services/apiCall";


const Modal = ({ isOpen, handleCloseModal, setRequestId, title, setLoading }: any) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);


    useEffect(() => {
        async function fetchSuggestions() {
            const response = await apiCall({
                url: `/users/12345/search-suggestion?s=${searchTerm}`
            })
            console.log(response)
            setSuggestions(response.data);
        }

        if (searchTerm) {
            fetchSuggestions();
        }
    }, [searchTerm]);


    const handleOnChange = (event: { target: { value: any; }; }) => {
        const searchTerm = event.target.value;

        setSearchTerm(searchTerm);
    };

    const handleChangeToAdmin = async (requestId: string) => {
        try {
            const response = await apiCall({ url: `/users/${requestId}/add-admin`, method: "POST" })

            if (response.data.message === 'success') {
                setLoading(false)
                setRequestId(requestId);
                handleCloseModal()
                // window.alert('The user has been successfully changed to an admin.');
            }
        } catch (err) { }
    }

    return (
        <>
            <TEModal show={isOpen} onClose={handleCloseModal}>
                <TEModalDialog>
                    <TEModalContent>
                        <TEModalHeader className='flex flex-col px-10'>
                            <h2 className='w-full font-bold py-2 text-lg text-secondaryColor'>{title}</h2>
                            <SearchInput
                                searchTerm={searchTerm}
                                placeholder="Search for a member to assign roles"
                                handleOnChange={handleOnChange}
                            />
                        </TEModalHeader>

                        <TEModalBody className='px-10'>
                            {
                                suggestions && suggestions.length > 0 ? (
                                    <ul className="max-h-40 overflow-auto">
                                        {suggestions.map((user: any) => (
                                            <li onClick={() => handleChangeToAdmin(user._id)} key={user._id} className="cursor-pointer hover:bg-gray-200">
                                                <div className='flex justify-center items-center gap-2 py-3'>
                                                    <img className='w-[70px] h-[70px] rounded-full ' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
                                                    <div className='text-left'>
                                                        <h2 className='text-sm capitalize'>{user?.firstName} {user?.lastName}</h2>
                                                        <p className='text-xs text-secondaryColor font-normal'>{user?.headline} || Bookeeper | content Creator | <br />
                                                            Virtual Assistent</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <>
                                        <h2 className='text-secondaryColor font-semibold text-sm underline pb-3'>Content admin</h2>
                                        <p className='text-xs text-secondaryColor italic'>This role manages content, comments, messages as the app, and export analytics</p>
                                    </>
                                )
                            }

                        </TEModalBody>

                        <TEModalFooter>
                            <button onClick={handleCloseModal}>Close</button>
                        </TEModalFooter>

                    </TEModalContent>
                </TEModalDialog>
            </TEModal >
        </>
    );
};


export default React.memo(Modal)

