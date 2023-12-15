import { contentAdminManageList, superAdminManageList, usersManageList } from '../../utils/navigationData'
import { Link } from 'react-router-dom'


interface ManageInfoProps {
    user: any
}


function ManageInfo({ user }: ManageInfoProps) {
    return (
        <div className="border-b border-borderColor">
            <div className="m-2">
                <h2 className="text-sm font-bold">Manage</h2>
                <ul className="flex flex-col gap-1 mt-1">
                    {
                        user.role === 'user' ? (
                            usersManageList.map(({ id, title, path }: any) => (
                                <li key={id}>
                                    <Link  to={path}>{title}</Link>
                                </li>
                            ))
                        ) : user.role === 'admin' ? (
                            superAdminManageList.map(({ id, title, path }: any) => (
                                <li key={id} >
                                    <Link to={path}>{title}</Link>
                                </li>
                            ))
                        ) : (
                            contentAdminManageList.map(({ id, title, path }: any) => (
                                <li key={id}>
                                    <Link  to={path}>{title}</Link>
                                </li>
                            ))
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default ManageInfo