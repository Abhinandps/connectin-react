import { Link, Outlet } from "react-router-dom"
import FeedContainer from "../layouts/FeedContainer"
import { FaHashtag } from "react-icons/fa";

function Mynetwork() {
    return (
        <FeedContainer>
            {/* settings */}
            <div className='lg:w-[370px] md:w-[255px] sm:w-full relative h-screen rounded-t-lg '>

                <div className='bg-white min-h-[30vh] border-b border-l border-r border-borderColor rounded-b-lg py-3'>

                    <h2 className="text-md text-primaryColor px-4 py-2">Manange my Network</h2>

                    <Link to={'connections'} className="flex items-center justify-between gap-3 px-4 py-2 hover:bg-slate-50 text-secondaryColor hover:text-primaryColor">
                        <div className="flex items-center gap-2">
                            <div className="text-xl font-bold rounded-lg text-secondaryColor  w-[20px] flex justify-center items-center">
                                👥
                            </div>
                            <p className="text-sm font-medium">Connections</p>
                        </div>
                        <p className="text-md font-normal">369</p>
                    </Link>

                    <Link to={'network-manager'} className="flex items-center justify-start gap-2 px-4 py-2 hover:bg-slate-50 text-secondaryColor  hover:text-primaryColor">
                        <div className="text-xl font-bold rounded-lg   w-[20px] flex justify-center items-center ">
                            👤
                        </div>
                        <p className="text-sm font-medium">Following & Followers</p>
                    </Link>

                    <Link to={'hashtags'} className="flex items-center justify-between gap-3 px-4 py-2 hover:bg-slate-50 text-secondaryColor  hover:text-primaryColor">
                        <div className="flex items-center gap-2">
                            <div className="text-xl font-bold rounded-lg w-[20px] flex justify-center items-center ">
                                <FaHashtag />
                            </div>
                            <p className="text-sm font-medium">HashTag</p>
                        </div>
                        <p className="text-md font-normal">1</p>
                    </Link>

                </div>

            </div>

            <div className="flex flex-col gap-3 w-full">
                <Outlet />
            </div>

        </FeedContainer>
    )
}

export default Mynetwork