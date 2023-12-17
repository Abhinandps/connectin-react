import { useEffect, useState } from 'react'
import { useAuth } from "../features/auth/hooks/useAuth";
import apiCall from '../services/apiCall';
import { Coversations } from '../features/chat/component/Coversations';
import ChatBox from '../features/chat/component/ChatBox';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import useUserData from '../hooks/useUserData';

function Chat({ onlineUsers, setSendMessage, receivedMessage }: any) {
    const { user } = useAuth();
    const { userData }: any = useUserData(user.userId)

    const [chats, setChats] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [toggle, setToggle] = useState(true)
    const [loading, setLoading] = useState(false)


    // Get the chat in chat section
    useEffect(() => {
        const getChats = async () => {
            try {
                setLoading(true)
                const res = await apiCall({
                    url: `/chat/`
                });
                setLoading(false)
                setChats(res);
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [user?.userId, receivedMessage]);

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await apiCall({
                url: `/users/search-connections?s=${searchInput}`,
                method: 'POST'
            })
            setLoading(false)
            setSearchResults(res)
        })()
    }, [searchInput])


    // const checkOnlineStatus = (chat: any) => {
    //     const chatMember = chat.participants.find((participant: any) => participant.userId !== user.userId);
    //     // const online = onlineUsers.find((user) => user.userId === chatMember);
    //     // return online ? true : false
    // };


    const handleToggle = () => setToggle(!toggle)

    const handleChatOpen = async (chat, firstId, secondId) => {

        // Update isViewed status for all messages in the chat locally

        const updatedChat = {
            ...chat,
            messages: chat.messages.map(message => ({
                ...message,
                isViewed: true,
            })),
        };

        // Update the chat in your state or component
        setChats((chats: any) => chats.map(c => (c._id === updatedChat._id ? updatedChat : c)));

        // Send a request to the server to mark messages as viewed
        try {
            await apiCall({
                url: `/chat/mark-as-read/${firstId}/${secondId}`,
                method: 'POST',
            });

        } catch (error) {
            // If there's an error updating on the server, you might want to rollback the local update
            console.error('Error marking messages as read:', error);
            // Rollback the local update (optional)
            setChats((chats: any) => chats.map(c => (c._id === updatedChat._id ? chat : c)));
        }
    };

    return (
        <>
            <div className={`fixed z-[77777] bottom-0 right-5 bg-white py-1 mr-5 shadow-xl w-[350px] ${toggle ? 'h-[55px]' : 'h-[600px]'} 
            border border-borderColor  rounded-lg overflow-y-scroll hide-scrollbar
            `}>
                <div>
                    <div className='pb-2  px-2 flex justify-between items-center border-b border-borderColor '>
                        <div className='flex items-center gap-3 relative'>
                            <img src={userData?.profileImage} className="rounded-full w-[40px] h-[40px]" alt="" />
                            <span className='w-[13px] h-[13px] rounded-full border-2 border-white bg-green-700 absolute top-7 left-7'></span>
                            <h2 className='text-sm font-semibold'>Messaging</h2>
                        </div>

                        <div>
                            {
                                toggle ?
                                    <IoIosArrowUp className="text-xl cursor-pointer text-secondaryColor" onClick={handleToggle} /> :
                                    <IoIosArrowDown
                                        className="text-xl text-secondaryColor cursor-pointer"
                                        onClick={handleToggle} />
                            }
                        </div>
                    </div>

                    <div className='my-2 px-2 '>
                        <input type="text" placeholder='search messages' className='bg-[#edf3f8] py-2 my-1 text-sm placeholder:text-sm placeholder:font-light  border rounded-md border-borderColor w-full px-3' value={searchInput} onChange={(e: any) => setSearchInput(e.target.value)} />
                    </div>

                    <div>
                        {searchInput && searchResults.length > 0 ? (
                            loading ? (
                                <div className='flex justify-center my-3'>
                                    <LoadingSpinner />
                                </div>
                            ) : (
                                searchResults.map((data) => (
                                    <List data={data} chats={chats} setChats={setChats} setCurrentChat={setCurrentChat} setSearchInput={setSearchInput} />
                                ))
                            )
                        )
                            : searchInput && searchResults.length < 1 ? (
                                <div className=' flex flex-col gap-2 items-center'>
                                    <img className='w-[180px] mt-10 text-center' src="https://res.cloudinary.com/ds7fy5acd/image/upload/v1701927807/image_folder/mcpmjeqygetgyanjtvkl.jpg" alt="" />
                                    <p className='text-sm'>{`we didn't find anything with "${searchInput}"`}</p>
                                </div>
                            ) : (
                                chats.map((chat) => {
                                    // Count unread messages
                                    const unreadMessagesCount = chat.messages.filter(message => !message.isViewed).length;

                                    // Check if the current user is a participant in the chat
                                    const isCurrentUserParticipant = chat.participants.some(participant => participant.userId === user?.userId);

                                    // Check if there are unread messages for the current user
                                    const hasUnreadMessages = chat.messages.some(message => message.sender !== user?.userId && !message.isViewed);

                                    return (
                                        <div
                                            onClick={() => {
                                                setCurrentChat(chat);
                                                {
                                                    isCurrentUserParticipant && hasUnreadMessages &&
                                                        handleChatOpen(chat, user?.userId, chat.participants.find((participant: any) => participant.userId !== user?.userId).userId)
                                                }
                                            }}
                                        >
                                            <Coversations
                                                data={chat}
                                                currentUser={user.userId}
                                                online={undefined}
                                                unreadMessagesCount={unreadMessagesCount}
                                                isCurrentUserParticipant={isCurrentUserParticipant}
                                                hasUnreadMessages={hasUnreadMessages}
                                            />


                                        </div>
                                    )
                                })
                            )}

                    </div>
                </div>
            </div>
            {
                currentChat &&
                <ChatBox
                    chat={currentChat}
                    currentUser={user && user?.userId}
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage}
                    setCurrentChat={setCurrentChat}
                    messages={messages}
                    setMessages={setMessages}
                />
            }

        </>
    )
}

export default Chat

function List(props: any) {
    const { firstName, lastName, userId } = props.data

    const { user } = useAuth();

    const handleClick = async (receiver: string, sender: string) => {
        const data = {
            sender,
            receiver
        }

        try {
            const res = await apiCall({
                url: '/chat/create',
                method: 'POST',
                data
            })

            props.setChats((prevChats: any) => {
                const isChatAlreadyExists = prevChats.some((chat: any) => chat._id === res._id);
                if (!isChatAlreadyExists) {
                    return [...prevChats, res];
                }
                return prevChats;
            });

            props.setCurrentChat(res)
            props.setSearchInput('')
        } catch (err) {

        }

    };
    return (

        <button className="flex items-center justify-start w-full hover:bg-sky-50 rounded-md cursor-pointer px-3 my-2" onClick={() => handleClick(userId, user?.userId)}>
            <div className="w-[40px] h-[40px] m-2 ">
                <img src='https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645754255?e=1706140800&v=beta&t=SihjLc7kCa9AUn4epgBF8b7VAo1shsRQgH8hEIZlOfk' className="rounded-full" alt="" />
            </div>
            <div className="m-2 flex items-center">
                <h2 style={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} className="text-[13px] text-primaryColor font-medium px-1 capitalize">{firstName}  <span className='lowercase'>{lastName}</span>
                </h2>
            </div>
        </button>


    )
}