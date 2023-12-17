import { useNavigate } from "react-router-dom"

function ProfileInfo({ data }: any) {

    const navigate = useNavigate()

    return (
        <div className="border-b border-borderColor pb-3">
            <div className="flex items-center">
                <div className="w-[60px] h-[60px] m-2 ">
                    <img src={data?.profileImage} className="rounded-full" alt="" />
                </div>
                <div className="m-2">
                    <h2 className="text-[16px] text-primaryColor font-bold">{data?.firstName} {data?.lastName}</h2>
                    <p className="text-xs">{data?.headline}.</p>
                </div>
            </div>
            <div className="px-3">
                <button onClick={() => navigate(`/in/${data.userId}`)} className=" w-full py-1 border border-blue-500 rounded-full text-blue-500 font-bold"> View Profile</button>
            </div>
        </div>
    )
}

export default ProfileInfo