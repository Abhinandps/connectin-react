import { IoPersonRemove } from "react-icons/io5";

interface IAdminTableRowProps {
    user: Record<any, string>;
    removeContentAdmin: (value: string) => void;
    isAdmin: any;
}

const AdminTableRow: React.FC<IAdminTableRowProps> = (props) => {
    const { removeContentAdmin, user, isAdmin } = props

    return (
        <tr className='bg-white'>
            <th>

                {/* FIXME: */}
                <div className='flex justify-center items-center gap-2 py-3'>
                    <img className='w-[70px] h-[70px] rounded-full ' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
                    <div className='text-left'>
                        <h2 className='text-sm capitalize'>{user?.firstName} {user?.lastName}</h2>
                        <p className='text-xs text-secondaryColor font-normal'>{user?.headline} || Bookeeper | content Creator | <br />
                            Virtual Assistent</p>
                    </div>
                </div>

            </th>

            <th>
                {isAdmin ? (
                    <span className='bg-white border border-blue-700 shadow-sm py-2 px-2 rounded-md text-sm font-medium text-blue-700'>Content Admin</span>
                ) : (
                    <></>
                )}
            </th>

            <th className='flex justify-center items-center min-h-[14vh] h-full'>
                {isAdmin ? (
                    <IoPersonRemove
                        onClick={() => removeContentAdmin(user._id)}
                        className="text-xl cursor-pointer text-danger" />
                ) : (<></>)}
            </th>
        </tr>
    )
}

export default AdminTableRow

