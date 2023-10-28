
const Header = ({ toggleOpen }: any) => {
    return (
        <div className='w-full flex justify-between items-center'>
            <h2 className='bg-white border border-blue-700 shadow-sm py-2 px-2 rounded-md text-sm font-medium text-blue-700'>super admin</h2>
            <h2
                className='text-sm font-medium text-secondaryColor hover:text-primaryColor cursor-pointer'
                onClick={toggleOpen}
            >Admin Tools 🔽</h2>
        </div>
    )
}

export default Header