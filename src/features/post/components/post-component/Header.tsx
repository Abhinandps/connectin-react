
const Header = ({ firstName, lastName, headline, profileImage }: any) => {
    return (
        <div className='flex items-center gap-2 py-2'>
            <img src={profileImage} alt="profile" className='w-[50px] h-50px rounded-full ' />
            <div className=''>
                <h2 className='font-bold text-[13px] text-primaryColor capitalize'>{firstName} {lastName}
                    <span className='font-light text-secondaryColor'> (He/Him)</span>
                </h2>
                <p className='font-light text-secondaryColor text-xs'>{headline}</p>
            </div>
        </div>
    )
}

export default Header