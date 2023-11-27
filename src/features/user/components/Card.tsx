import { GiLinkedRings } from "react-icons/gi"
import { FaUserPlus } from "react-icons/fa6";

function Card({ minimalistData }: any) {
    return (
        minimalistData ? (
            <div className="w-full sm:mx-0 transition flex  border-b border-borderColor pb-5">
                <div className='w-[68px] h-[68px] '>
                    <img className='w-full object-fill h-full rounded-full' src="https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645754255?e=1706140800&v=beta&t=SihjLc7kCa9AUn4epgBF8b7VAo1shsRQgH8hEIZlOfk" alt="" />
                </div>
                <div className='flex  flex-col items-start justify-center '>
                    <h2 className='font-semibold text-md my-1'>Abhinand P S</h2>
                    <p className='text-xs font-light leading-3 text-gray-500'>Full-stack Developer at Brototype</p>
                    <div className="mt-3">
                        <Button icon={<FaUserPlus />} title="Connect" Border />
                    </div>
                </div>
            </div>
        ) : (
            <div className="relative xs:w-[200px] xs:mx-auto sm:w-[190px] sm:mx-0  hover:shadow-lg transition">
                <div className='h-[60px] '>
                    <img className='w-full h-full object-cover rounded-t-lg' src="https://media.licdn.com/dms/image/D5616AQHktpTLduijkQ/profile-displaybackgroundimage-shrink_200_800/0/1693821120930?e=1703116800&v=beta&t=9vZRAGoIwVBs2xvunIYtWdwy-_MubfoQNF0pRv2v3bE" alt="" />
                </div >
                <div className='absolute w-[68px] h-[68px] top-5 left-[50%] translate-x-[-50%] '>
                    <img className='w-full object-fill h-full rounded-full' src="https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645754255?e=1706140800&v=beta&t=SihjLc7kCa9AUn4epgBF8b7VAo1shsRQgH8hEIZlOfk" alt="" />
                </div>
                <div className='bg-white pt-10 pb-3 px-5 flex justify-center flex-col items-center border-b border-l border-r border-borderColor rounded-b-lg'>
                    <h2 className='font-semibold text-md my-1'>Abhinand P S</h2>
                    <p className='text-xs text-center font-light leading-3 text-gray-500'>Full-stack Developer at Brototype</p>
                    <p className="text-[10px] flex items-center gap-2 text-secondaryColor mt-2">
                        <GiLinkedRings className='text-primaryColor text-xs' /> Ana Fara and 79 others
                    </p>
                    <div className="mt-3">
                        <Button icon={<FaUserPlus />} title="Connect" Border />
                    </div>
                </div>

            </div >
        )
    )
}

export default Card



interface BProps {
    title: string;
    Border?: boolean
    icon?: any
}

function Button({ title, Border, icon }: BProps) {
    return (
        <button className={`flex items-center gap-1 px-4 py-2 hover:bg-sky-50 transition text-sm bg-transparent ${Border ? 'border-2 border-blue-500 text-blue-500' : 'text-secondaryColor'
            } font-bold rounded-full `}>{icon}{title}</button>
    )
}
