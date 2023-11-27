import { GiLinkedRings } from 'react-icons/gi';
import { MdOutlineDelete } from "react-icons/md";


interface ListProp {
    connected?: boolean
    follow?: boolean
    follows?: boolean
    hashtag?: boolean
}

// bg-sky-100
function List({ connected, follow, follows, hashtag }: ListProp) {
    return (
        <div className='flex justify-between items-center gap-2 px-5 py-3 border-t  border-borderColor'>
            <div className="flex items-center gap-3 w-full">
                {
                    hashtag ? (
                        <>
                            <div>
                                <h2 className='text-md font-bold text-primaryColor'>#microservice</h2>
                                <p className='text-xs font-medium text-secondaryColor'>36,260 followers</p>
                            </div>
                        </>) : (
                        <>
                            <img className='w-[70px] h-[70px] rounded-full ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU" alt="" />
                            <div className='text-left'>
                                <h2 className='text-sm capitalize'>Yadhav Krishna</h2>
                                <p className='text-xs text-secondaryColor font-normal'>
                                    Virtual Assistent at Luminar Technologies</p>
                                {
                                    !connected && (

                                        <p className="text-xs flex items-center gap-2 text-secondaryColor mt-2">
                                            <GiLinkedRings className='text-primaryColor' /> Ana Fara and 79 others
                                        </p>
                                    )
                                }
                            </div>
                        </>
                    )
                }
            </div>
            <div className="flex gap-3">
                {connected ? (
                    <>
                        <Button title="Message" Border />
                        <Button icon={<MdOutlineDelete />} />
                    </>
                ) : follow ? (
                    <Button title="Following" outline />
                ) : follows ? (
                    <Button title="Follow" Border />
                ) : hashtag ?
                    (
                        <Button title="Following" outline />
                    ) : (
                        <>
                            <Button title="ignore" />
                            <Button title="Accept" Border />

                        </>
                    )}
            </div>
        </div >
    )
}

export default List


interface BProps {
    title?: string;
    Border?: boolean
    icon?: any;
    outline?: any
}

function Button({ title, Border, icon, outline }: BProps) {
    return (
        <button className={`px-4 py-2 hover:bg-sky-50 transition text-sm bg-transparent ${outline && 'border-2 text-secondaryColor border-borderColor'}  ${Border ? 'border-2 border-blue-500 text-blue-500' : 'text-secondaryColor'
            } font-bold rounded-full `}> <span className='text-lg text-primaryColor'>{icon}</span> {title}</button>
    )
}
