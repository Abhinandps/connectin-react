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
            <th className="w-0">

                {/* FIXME: */}
                <div className='flex justify-start ps-10  items-center gap-2 py-3 w-[300px] '>
                    <div className="">
                        <img className='w-[70px] h-[70px] rounded-full ' src={user?.profileImage || 'https://picsum.photos/200'} alt="" />

                    </div>
                    <div className='text-left'>
                        <h2 className='text-sm capitalize'>{user?.firstName} {user?.lastName}</h2>
                        <p className='text-xs text-secondaryColor font-normal'>{user?.headline} </p>
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

