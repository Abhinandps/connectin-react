
export const MainView = ({ children, feed }: any) => {
    return (
        <div className={`md:mt-0 lg:w-[655px] md:w-[500px] min-h-screen ${!feed && 'bg-white'} px-5`} >
            {children}
        </div >
    )
}