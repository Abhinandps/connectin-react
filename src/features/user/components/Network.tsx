import { NavLink, Outlet } from "react-router-dom"
import Row from "./Row"

function Network() {

    return (
        <Row title={`Abhinand's Network`}>
            <div className="px-5 py-3">
                <NavLink to={'/mynetwork/network-manager'} className='font-medium focus:bg-green-700 px-4 py-1 rounded-full transition focus:text-white '>Following</NavLink>
                <NavLink to={'/mynetwork/network-manager/followers '} className='me-5 font-medium focus:bg-green-700 px-4 py-1 rounded-full transition focus:text-white '>Followers</NavLink>
            </div>
            <div>
                <Outlet />
            </div>
        </Row>
    )
}

export default Network