import React from "react";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import AdminTableRow from "./AdminTableRow";
import apiCall from "../../../../services/apiCall";


interface IAdminTableProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    handleOpenModal: () => void;
    loading: boolean;
    users: Array<Record<string, string>>;
    setUsers: React.Dispatch<React.SetStateAction<any[]>>
    setLoading: (value: boolean) => void;
    setRequestId: (value: string) => void;
    isAdmin?: any;
}

const AdminTable = (props: IAdminTableProps) => {
    const { isAdmin, loading, users, setUsers, handleOpenModal, setRequestId, setLoading } = props

    const removeContentAdmin = async (requestId: string) => {
        try {
            const response = await apiCall({ url: `/users/${requestId}/remove-admin`, method: 'POST' })

            if (response.message === 'success') {
                setUsers((users) => users.filter((user: any) => user._id !== requestId));
                setLoading(true);
                setRequestId(requestId)
            } else {
                throw new Error('Failed to remove admin.');
            }

        } catch (error: any) {
            console.error(error);
        }
    }

    return (
        <div className='bg-white border border-borderColor rounded-md min-h-[20vh] h-[20vh]'>

            {loading ? (
                <div className=" grid place-content-center h-full">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    <div className='px-3 border-b border-borderColor flex justify-between items-center'>
                        <h2 className='text-sm font-medium text-green-700 border-b-2 border-green-700 w-fit py-2'>
                            {isAdmin ? `connecting admins${users.length > 0 ? `(${users.length})` : ""}`
                                :
                                `connecting users${users.length > 0 ? `(${users.length})` : ""}`}

                        </h2>
                        {isAdmin &&
                            (
                                <button
                                    className='bg-blue-600 rounded-full py-1 px-3 text-white text-xs font-medium hover:bg-blue-500'
                                    onClick={handleOpenModal}
                                >➕ Add admin</button>
                            )}
                    </div>

                    <table className='bg-[whitesmoke] w-full'>
                        <thead className='text-sm text-primaryColor'>
                            {isAdmin ? (
                                <tr>
                                    <th>Profile</th>
                                    <th>Roles</th>
                                    <th>Action</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th>Profile</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {
                                users && users.map((user: any) => {
                                    return (
                                        <AdminTableRow
                                            isAdmin={isAdmin && isAdmin}
                                            key={user._id}
                                            user={user}
                                            removeContentAdmin={removeContentAdmin}
                                        />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </>
            )}

        </div >
    )
}

export default React.memo(AdminTable)