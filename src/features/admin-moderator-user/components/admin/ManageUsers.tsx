
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

