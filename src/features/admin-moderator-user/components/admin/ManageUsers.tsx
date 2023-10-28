
import React from 'react';
import Header from './Header';
import Popup from '../Popup';
import Modal from '../Modal';
import useFetchUsers from '../../hooks/useFetchUsers';
import AdminTable from './AdminTable';


interface ManageUsersProps {
    isOpen: boolean;
    isModalOpen: boolean;
    setIsOpen: (value: boolean) => void;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
}

const ManageUsers: React.FC<ManageUsersProps> = function (props) {

    const { users, setUsers, loading, setLoading, setRequestId } = useFetchUsers('/users/user')

    const { isOpen, isModalOpen, setIsOpen, handleOpenModal, handleCloseModal } = props

    const toggleOpen = (): void => {
        setIsOpen(!isOpen)
    }


    return (
        <div className='w-full '>

            <Header toggleOpen={toggleOpen} />
            <Popup isOpen={isOpen} handleIsOpen={setIsOpen} />

            <div className='py-5'>
                <AdminTable
                    handleOpenModal={handleOpenModal}
                    users={users}
                    setUsers={setUsers}
                    loading={loading}
                    setLoading={setLoading}
                    setRequestId={setRequestId}
                />
            </div>

            {/* FIXME: */}
            <Modal isOpen={isModalOpen} setRequestId={setRequestId} handleCloseModal={handleCloseModal} />

        </div>

    )
}

export default ManageUsers;



// interface PopupProps {
//     isOpen: boolean;
//     handleIsOpen: (isOpen: boolean) => void;
// }


// // FIXME: popup into seperate component
// const Popup: React.FC<PopupProps> = ({ isOpen, handleIsOpen }) => {

//     // const { user } = useAuth()
//     // const dispatch = useDispatch()

//     const popupRef = React.useRef<HTMLDivElement | null>(null);

//     useEffect(() => {
//         const handler = (e) => {
//             if (!popupRef.current?.contains(e.target)) {
//                 handleIsOpen(false)
//             }
//         };


//         document.addEventListener('mousedown', handler)

//         return () => {
//             document.removeEventListener('mousedown', handler)
//         }
//     }, [isOpen]);


//     return (
//         <>
//             {isOpen && (
//                 <div className="absolute top-[38px] right-[20px] z-40 bg-white  border w-[300px] border-borderColor rounded-md shadow-md"
//                     ref={popupRef}
//                 >
//                     <div className="">
//                         <h2 className="font-bold text-sm bg-sky-100 py-2 text-left px-4">Settings</h2>
//                         <ul className="flex flex-col gap-1 my-4 px-4 text-sm">
//                             <li>
//                                 <NavLink
//                                     className='text-secondaryColor hover:text-primaryColor'
//                                     style={({ isActive }) => ({
//                                         color: isActive ? '#121212ed' : '#00000099',
//                                     })}
//                                     to={'/manage-admins'}>Mange Admin</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink
//                                     className='text-secondaryColor hover:text-primaryColor'
//                                     style={({ isActive }) => ({
//                                         color: isActive ? '#121212ed' : '#00000099',
//                                     })}
//                                     to={'/manage-users'}>Mange Users</NavLink>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }



// import { TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter } from "tw-elements-react";
// import useFetchUsers from '../../hooks/useFetchUsers';
// import Header from './Header';



// const Modal = ({ isOpen, handleCloseModal, setRequestId }: any) => {

//     const [searchTerm, setSearchTerm] = useState("");
//     const [suggestions, setSuggestions] = useState([]);

//     useEffect(() => {
//         async function fetchSuggestions() {
//             const response = await fetch(`http://localhost:3000/users/12345/search-suggestion?query=${searchTerm}`);
//             const data = await response.json()
//             setSuggestions(data);
//         }

//         if (searchTerm) {
//             fetchSuggestions();
//         }

//     }, [searchTerm]);


//     const handleOnChange = (event) => {
//         const searchTerm = event.target.value;

//         setSearchTerm(searchTerm);
//     };


//     const handleChangeToAdmin = async (requestId: string) => {
//         try {
//             const response = await fetch(`http://localhost:3000/users/${requestId}/add-admin`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     requestId: requestId,
//                 }),
//             });

//             if (response.status === 200) {
//                 setRequestId(requestId);
//                 window.alert('The user has been successfully changed to an admin.');
//             }
//         } catch (err) { }
//     }



//     return (
//         <>

//             <TEModal show={isOpen} onClose={handleCloseModal}>
//                 <TEModalDialog>
//                     <TEModalContent>
//                         <TEModalHeader className='flex flex-col px-10'>
//                             <h2 className='w-full font-bold py-2 text-lg text-secondaryColor'>Add new admin</h2>
//                             <input
//                                 type="text"
//                                 className='text-sm w-full py-2 px-3 border border-borderColor rounded-md'
//                                 placeholder='Search for a member to assign roles'
//                                 value={searchTerm}
//                                 onChange={handleOnChange}
//                             />
//                         </TEModalHeader>

//                         <TEModalBody className='px-10'>
//                             {
//                                 suggestions && suggestions.length > 0 ? (
//                                     <ul className="max-h-40 overflow-auto">
//                                         {suggestions.map((user: any) => (
//                                             <li onClick={() => handleChangeToAdmin(user._id)} key={user._id} className="cursor-pointer hover:bg-gray-200">
//                                                 <div className='flex justify-center items-center gap-2 py-3'>
//                                                     <img className='w-[70px] h-[70px] rounded-full ' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
//                                                     <div className='text-left'>
//                                                         <h2 className='text-sm capitalize'>{user?.firstName} {user?.lastName}</h2>
//                                                         <p className='text-xs text-secondaryColor font-normal'>{user?.headline} || Bookeeper | content Creator | <br />
//                                                             Virtual Assistent</p>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 ) : (
//                                     <>
//                                         <h2 className='text-secondaryColor font-semibold text-sm underline pb-3'>Content admin</h2>
//                                         <p className='text-xs text-secondaryColor italic'>This role manages content, comments, messages as the app, and export analytics</p>
//                                     </>
//                                 )
//                             }

//                         </TEModalBody>
//                         <TEModalFooter>
//                             <button onClick={handleCloseModal}>Close</button>
//                         </TEModalFooter>
//                     </TEModalContent>
//                 </TEModalDialog>
//             </TEModal >
//         </>
//     );
// };
