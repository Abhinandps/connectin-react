import { useState, useEffect, useRef } from 'react'
import InputEmojiWithRef from "react-input-emoji"
import apiCall from '../../../services/apiCall';
import { IoIosClose } from "react-icons/io";
import TimeAgo from 'react-timeago'
import date from 'date-and-time';


function ChatBox({ chat, currentUser, setSendMessage, receivedMessage, setCurrentChat, setMessages, messages }: any) {
    const [userData, setUserData] = useState(null);
    // const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!newMessage) {
            inputRef.current?.focus();
        }
    }, [newMessage]);

    // console.log('chat', chat)
    useEffect(() => {
        const user = chat?.participants.find((participant: any) => participant.userId !== currentUser)
        setUserData(user)
        console.log('called', user)
    }, [chat, currentUser])


    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    const handleClose = () => {
        setCurrentChat('')
    }

    const handleSend = async (e) => {
        e.preventDefault()

        if (!newMessage) return


        const message = {
            chatId: chat._id,
            senderId: currentUser,
            text: newMessage,
            isViewed: false
        }

        const receiverId = chat.participants.find((participant: any) => participant.userId !== currentUser)

        // send message to socket server
        setSendMessage({ ...message, receiverId })

        // send message to database
        try {
            const res = await apiCall({
                url: '/chat/add',
                method: 'POST',
                data: message
            })

            const { chatId, ...rest } = message

            setMessages((prevMessages) => {
                const { senderId, text, ...otherRest } = rest;

                const updatedMessage = {
                    sender: senderId,
                    content: text,
                    ...otherRest,
                };

                const updatedMessages = [...prevMessages.messages, updatedMessage];

                const updatedState = {
                    ...prevMessages,
                    messages: updatedMessages,
                };

                return updatedState;
            });

            setNewMessage('')

        } catch (err: any) {
            console.error(err.message);

        }
    }

    useEffect(() => {
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            console.log("Message Arrived: ", receivedMessage)

            setMessages((prevMessages) => {
                const { senderId, text, isViewed } = receivedMessage

                const updatedMessage = {
                    sender: senderId,
                    content: text,
                    isViewed
                };

                const updatedMessages = [...prevMessages.messages, updatedMessage];

                const updatedState = {
                    ...prevMessages,
                    messages: updatedMessages,
                };

                return updatedState;
            });
        }

    }, [receivedMessage])


    // fetch messages
    useEffect(() => {
        if (userData) {
            const fetchMessages = async () => {
                try {
                    const res = await apiCall({
                        url: `/chat/find/${currentUser}/${userData?.userId}`
                    })
                    console.log(res, 'participants chats')
                    setMessages(res);
                } catch (error) {
                    console.log(error);
                }
            };

            if (chat !== null) fetchMessages();
        }

    }, [chat, userData]);

    const scroll = useRef<HTMLDivElement>(null);

    // Always scroll to last Message
    useEffect(() => {
        if (Array.isArray(messages.messages) && messages.messages.length > 0) {
            scroll.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages.messages])




    return (
        <div className="fixed z-[77777] bottom-0 right-[400px]  bg-white w-[400px] h-[450px] border border-borderColor rounded-t-xl">
            <div className='flex items-center gap-2 py-2 relative px-3   border-b-2 '>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className='w-[50px] h-50px rounded-full ' />
                <span className='w-[13px] h-[13px] rounded-full border-2 border-white bg-green-700 absolute top-12 left-12'></span>
                <div className=''>
                    <h2 className='font-bold text-[13px] text-primaryColor capitalize'>{userData?.firstName} {userData?.lastName} <span className='font-light text-secondaryColor'></span> </h2>

                    <p className='font-light text-primaryColor text-xs'>Available </p>
                </div>
                <span className='text-[4px] opacity-[.8] absolute right-14 top-7 cursor-pointer'>⚫⚫⚫</span>

                <IoIosClose className="text-3xl absolute right-4 top-4 cursor-pointer" onClick={handleClose} />
            </div>

            {/* chat section */}
            <div className='w-full h-[300px] overflow-scroll hide-scrollbar'>

                <div className='flex items-center gap-2 py-5 relative px-3  cursor-pointer  border-b '>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className='w-[70px] h-[70px] rounded-full ' />
                    <span className='w-[15px] h-[15px] rounded-full border-2 border-white bg-green-700 absolute top-20 left-14'></span>
                    <div className=''>
                        <h2 className='font-bold text-[16px] text-primaryColor capitalize'>{userData?.firstName} {userData?.lastName} <span className='font-light text-secondaryColor'></span> </h2>
                        <p className='font-light text-secondaryColor text-sm'>{userData?.headline || 'MERN Stack Developer at XYZ'}</p>
                    </div>
                </div>

                <div className=''>


                    {messages && messages.messages && messages.messages.map((msg, index) => {
                        // Check if it's the first message or the sender is different from the previous one
                        const isFirstMessage = index === 0 || msg.sender !== messages.messages[index - 1].sender;

                        const senderInfo = messages.participants.find(participant => participant.userId === msg.sender)

                        const date = new Date(msg?.timestamp);

                        const timeOptions = {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                        };

                        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

                        return (
                            <div ref={scroll} key={msg._id} className={`${isFirstMessage && 'pt-5'} flex gap-2  relative px-3 cursor-pointer `}>
                                {isFirstMessage && (
                                    <img
                                        src={senderInfo?.profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                        alt="profile"
                                        className='w-[50px] h-[50px] rounded-full'
                                    />
                                )}
                                <div className='mt-2'>
                                    {isFirstMessage && (
                                        <h2 className='font-bold text-[13px] text-primaryColor capitalize'>
                                            {`${senderInfo?.firstName} ${senderInfo?.lastName}`}
                                            <span className='ml-2 font-light text-secondaryColor'>
                                                {`▪ `}
                                                <TimeAgo date={msg.timestamp} className='text-xs ' />
                                            </span>
                                        </h2>
                                    )}

                                    <p className={`${!isFirstMessage && 'ms-14 '} bg-[#edf3f8]/50  text-[15px] text-primaryColor font-normal  py-3 px-2 w-[300px] rounded-ss-none rounded-se-lg rounded-br-lg rounded-bl-lg relative`}
                                        style={{ wordWrap: 'break-word' }}
                                    >
                                        {msg?.content}

                                        <p className='text-[10px] absolute bottom-2 right-2' >{formattedTime !== 'Invalid Date' ? formattedTime : 'just now'}</p>

                                    </p>
                                </div>
                            </div>
                        );
                    })}



                    {/* <div className='flex gap-2 py-3 relative px-3  cursor-pointer  border-b '>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className='w-[50px] h-[50px] rounded-full' />
                        <div className='mt-2'>
                            <h2 className='font-bold text-[13px] text-primaryColor capitalize'>{userData?.firstName} {userData?.lastName} <span className='font-light text-secondaryColor'></span> </h2>
                            <p className='text-[14px] text-primaryColor font-normal bg-sky-100 py-3 px-2 w-[300px] rounded-ss-none rounded-se-lg rounded-br-lg rounded-bl-lg'>Yeah Cool what about you man ?</p>
                        </div>
                    </div> */}





                </div>

            </div>

            <div className='flex items-center px-3'>
                <InputEmojiWithRef
                    ref={inputRef}
                    value={newMessage}
                    onChange={handleChange}
                />
                <button disabled={!newMessage.length > 0} className={`${newMessage.length > 0 ? 'bg-primaryColor' : 'bg-primaryColor/50'} transition-all rounded-full px-3 py-1  text-white`} onClick={handleSend} >send</button>
            </div>
        </div>
    )
}

export default ChatBox