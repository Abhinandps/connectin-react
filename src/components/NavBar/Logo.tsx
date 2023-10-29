import { useNavigate } from "react-router-dom";
import Search from "./Search";

interface logoProps {
    isAuthenticated?: boolean;
}

export const Logo: React.FC<logoProps> = function ({ isAuthenticated }) {
    const navigate = useNavigate()
    return (
        <div className="md:w-16 me-2 h-7 flex relative cursor-pointer" onClick={() => navigate('/')}>
            {
                isAuthenticated ? (
                    <>
                        <InLogo />
                        <Search />

                    </>
                ) : (
                    <ConnectInLogo />
                )
            }

        </ div>
    )
}


function InLogo() {
    return (
        <>
            <div className="w-9 h-9 left-0 top-[1px] absolute bg-primaryColor bg-opacity-90 rounded-sm" />
            <div className="tracking-tighter left-[5px] top-1 absolute text-white text-opacity-90 text-3xl font-bold font-['Poppins']">in</div>
        </>
    )
}

function ConnectInLogo() {
    return (
        <>
            <div className="tracking-tighter hidden md:block left-0 top-0 absolute text-primaryColor text-opacity-90 text-3xl font-bold font-['Poppins']">Connect</div>
            <div className="w-6 h-7 md:left-[125px] top-0 absolute">
                <div className="w-9 h-9 left-0 top-[1px] absolute bg-primaryColor bg-opacity-90 rounded-sm" />
                <div className="tracking-tighter left-[5px] top-1 absolute text-white text-opacity-90 text-3xl font-bold font-['Poppins']">in</div>
            </div>
        </>
    )
}