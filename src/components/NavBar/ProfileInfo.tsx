
function ProfileInfo({ data }: any) {

    return (
        <div className="border-b border-borderColor pb-3">
            <div className="flex items-center">
                <div className="w-[60px] h-[60px] m-2 ">
                    <img src='https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645719137?e=1703116800&v=beta&t=emx0qOZ_uF1VpGQGbBT_cLE9uE_Q7D5vov-PgRQXy1I' className="rounded-full" alt="" />
                </div>
                <div className="m-2">
                    <h2 className="text-[16px] text-primaryColor font-bold">Abhinand P S {data?.firstName} {data?.lastName}</h2>
                    <p className="text-xs">Full stack developer {data?.headline}.</p>
                </div>
            </div>
            <div className="px-3">
                <button className=" w-full py-1 border border-blue-500 rounded-full text-blue-500 font-bold"> View Profile</button>
            </div>
        </div>
    )
}

export default ProfileInfo