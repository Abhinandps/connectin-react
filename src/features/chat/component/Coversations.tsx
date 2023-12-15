
import { useState, useEffect } from 'react'

export function Coversations({ data, currentUser, online, unreadMessagesCount, isCurrentUserParticipant, hasUnreadMessages }: any) {
  const [userData, setUserData] = useState(null)


  useEffect(() => {
    const user = data.participants.find((participant: any) => participant.userId !== currentUser)
    setUserData(user)
  }, [])



  return (
    <div className={`${isCurrentUserParticipant && hasUnreadMessages && 'bg-[#edf3f8] '} flex items-center gap-2 py-3  hover:bg-[#edf3f8] px-3 cursor-pointer border-b  border-borderColor relative`}>
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className='w-[50px] h-50px rounded-full ' />
      <span className='w-[15px] h-[15px] rounded-full border-2 border-white bg-green-700 absolute top-12 left-12'></span>

      <div className=''>
        <h2 className='font-bold text-[13px] text-primaryColor capitalize'>{userData?.firstName} {userData?.lastName} <span className='font-light text-secondaryColor'></span> </h2>
        <div className='font-light text-secondaryColor text-xs'
          dangerouslySetInnerHTML={{ __html: data.messages[data.messages.length - 1]?.content.slice(0, 150) }}
        />
      </div>

      <span className='text-[4px] opacity-[.8] absolute right-4 top-4'>⚫⚫⚫</span>

      {isCurrentUserParticipant && hasUnreadMessages && (
        <div className="absolute right-4 top-7 text-xs font-bold shadow-md border-2 border-borderColor bg-blue-500 w-[20px] h-[20px] flex justify-center items-center text-white  rounded-full">{unreadMessagesCount}</div>
      )}

    </div>
  )
}
