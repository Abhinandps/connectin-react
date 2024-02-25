import { GiLinkedRings } from 'react-icons/gi';
import { MdOutlineDelete } from "react-icons/md";
import { InvitationData } from '../store/networkslice';
import { Link } from 'react-router-dom';


interface ListProp {
    connected?: boolean
    follow?: boolean
    follows?: boolean
    hashtag?: boolean
    user?: InvitationData
    onReject?: any
    onAccept?: any
    isAccepted?: boolean
    onRemove?: any
    FollowStatusFinder?: any
}

// bg-sky-100
function List({ connected, follow, follows, hashtag, user, onReject, onAccept, onRemove }: ListProp) {
    return (
        <>
            <div className={`flex justify-between items-center gap-2 px-5 py-3 border-t ${!user?.viewed ? 'bg-sky-50' : 'bg-transparent'}  border-borderColor`}>
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
                                <img className='w-[70px] h-[70px] rounded-full ' src={user?.profileImage ?? undefined} alt="" />
                                <div className='text-left'>
                                    <Link to={`/in/${user?.userId}`} className='text-sm capitalize hover:underline transition-all cursor-pointer '>{user?.firstName} {user?.lastName}</Link>
                                    <p className='text-xs text-secondaryColor font-normal'>
                                        {user?.headline}</p>
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
                            <Button userId={user?.userId} onRemove={onRemove} icon={<MdOutlineDelete />} />
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
                                <Button isAccepted={user?.isAccepted} userId={user?.userId} onReject={onReject} title="ignore" />
                                <Button isAccepted={user?.isAccepted} userId={user?.userId} onAccept={onAccept} title="Accept" Border />

                            </>
                        )}
                </div>
            </div >

            {
                user?.status === 'connected' && (
                    <div className='px-3 py-2 flex items-center gap-2'>
                        <img className='w-[30px] h-[30px] rounded-full' src={` ${user?.profileImage ? user?.profileImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU'}`} alt="" />
                        <div className='text-left flex items-center gap-2'>
                            <Link to={`/in/${user?.userId}`} className='text-xs font-bold capitalize hover:underline transition-all cursor-pointer '>{user?.firstName} {user?.lastName}</Link>
                            <p className='text-xs text-secondaryColor font-normal'>
                                is now a connection <span className='text-blue-600 font-bold hover:underline'>Message now</span></p>

                        </div>
                    </div >
                )}
        </>


    )
}

export default List


interface BProps {
    title?: string;
    Border?: boolean
    icon?: any;
    outline?: any,
    onReject?: any
    userId?: any
    onAccept?: any
    isAccepted?: boolean
    onRemove?: any
}

function Button({ title, Border, icon, outline, userId, onReject, onAccept, isAccepted, onRemove }: BProps) {

    console.log(isAccepted, 'accepted')

    return (
        <button className={` ${isAccepted && 'z-[-1]'}  px-4 py-2 hover:bg-sky-50 transition text-sm bg-transparent ${outline && 'border-2 text-secondaryColor border-borderColor'}  ${Border ? 'border-2 border-blue-500 text-blue-500' : 'text-secondaryColor'
            } font-bold rounded-full `}
            onClick={() => onReject && onReject(userId) || onAccept && onAccept(userId) || onRemove && onRemove(userId)}
        > <span className='text-lg text-primaryColor'>{icon}</span> {title}</button>
    )
}
