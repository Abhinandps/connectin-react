import { useState, useCallback } from 'react'
import Manage from "../features/admin-moderator-user/components/Manage"
import ManageAdmins from '../features/admin-moderator-user/components/admin/ManageAdmins';
import ManageUsers from '../features/admin-moderator-user/components/admin/ManageUsers';


function ManageUsersAndAdmins({ isAdmin }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, [])

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <Manage>
            {isAdmin ? (
                <ManageAdmins
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    isModalOpen={isModalOpen}
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}
                />
            ) : (
                <ManageUsers
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    isModalOpen={isModalOpen}
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </Manage>
    )
}

export default ManageUsersAndAdmins