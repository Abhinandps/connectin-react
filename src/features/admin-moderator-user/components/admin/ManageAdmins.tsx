
import React from 'react';
import Popup from '../Popup';
import Modal from '../Modal';
import AdminTable from './AdminTable';
import useFetchUsers from '../../hooks/useFetchUsers';
import Header from './Header';


interface ManageAdminsProps {
    isOpen: boolean;
    isModalOpen: boolean;
    setIsOpen: (value: boolean) => void;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
}

const ManageAdmins: React.FC<ManageAdminsProps> = function (props) {

    const { users, setUsers, loading, setLoading, setRequestId } = useFetchUsers('/users/12345/admins')

    const { isOpen, isModalOpen, setIsOpen, handleOpenModal, handleCloseModal } = props

    const toggleOpen = (): void => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='w-full'>

            <Header toggleOpen={toggleOpen} />

            <Popup isOpen={isOpen} handleIsOpen={setIsOpen} />

            <div className='py-5'>
                <AdminTable
                    isAdmin
                    handleOpenModal={handleOpenModal}
                    users={users}
                    setUsers={setUsers}
                    loading={loading}
                    setLoading={setLoading}
                    setRequestId={setRequestId}
                />
            </div>

            <Modal
                title={'Add new admin'}
                isOpen={isModalOpen}
                setRequestId={setRequestId}
                setLoading={setLoading}
                handleCloseModal={handleCloseModal}
            />
        </div>
    )
}

export default ManageAdmins;

