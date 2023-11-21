
export const LeftPanel = ({ children }:any) => {
    return (
        <>
            <div className='md:w-[255px] sm:w-full relative md:min-h-[20vh] rounded-t-lg '>
                {children}
            </div>
        </>
    )
}
