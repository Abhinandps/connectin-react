import { FaClock, FaEnvelope, FaUserPlus } from "react-icons/fa";
import Card from "../features/user/components/Card"
import FeedContainer from "../layouts/FeedContainer"
import { FaPlus } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiCall from "../services/apiCall";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function Profile() {
    

    const { id } = useParams();
    const [profile, setProfile] = useState<any>();
    const [moreprofileData, setProfileMoreProfile] = useState<any>();
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await apiCall({ url: `/users/user/${id}`, method: 'POST' })
            const result = await apiCall({ url: `/users/${id}` })
            setProfile(res.data)
            setProfileMoreProfile(result.data)
            setIsLoading(false);
        })()
    }, [id])



    const FollowStatusFinder = (status: string): { status: string; icon: JSX.Element } => {
        if (status === 'following') {
            return { status: 'following', icon: <FaUserPlus /> };
        }
        if (status === 'follow') {
            return { status: 'follow', icon: <FaUserPlus /> };
        }
        if (status === 'not followed') {
            return { status: 'follow', icon: <FaPlus /> };
        }
        return { status: '', icon: <></> }; // default or handle other cases
    };

    const ConnectoinStatusFinder = (status: string): { status: string; icon: JSX.Element } => {
        if (status === 'connected') {
            return { status: 'message', icon: <FaEnvelope /> };
        }
        if (status === 'pending') {
            return { status: 'pending', icon: <FaClock /> };
        }
        if (status === 'connect') {
            return { status: 'connect', icon: <FaUserPlus /> };
        }
        return { status: '', icon: <></> }; // default or handle other cases
    };





    return (
        <FeedContainer>
            <div className="relative w-full">
                <div className='h-[200px] '>
                    <img className='w-full h-full object-cover rounded-t-lg' src="https://media.licdn.com/dms/image/D5616AQHktpTLduijkQ/profile-displaybackgroundimage-shrink_200_800/0/1693821120930?e=1703116800&v=beta&t=9vZRAGoIwVBs2xvunIYtWdwy-_MubfoQNF0pRv2v3bE" alt="" />
                </div>
                <div className='absolute w-[140px] h-[140px] top-[120px] left-24 translate-x-[-50%] border-4 rounded-full border-white'>
                    <img className='w-full h-full rounded-full' src="https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645754255?e=1706140800&v=beta&t=SihjLc7kCa9AUn4epgBF8b7VAo1shsRQgH8hEIZlOfk" alt="" />
                </div>
                <div className='bg-white flex flex-col py-20 px-5 border-b border-l border-r border-borderColor rounded-b-lg'>
                    <h2 className='font-semibold text-xl my-1 capitalize'>{profile?.firstName} {profile?.lastName}</h2>
                    <p className='text-sm  leading-3 text-primaryColor'>Full-stack Developer</p>
                    <p className="text-xs text-secondaryColor">Kannur, Kerala, India</p>

                    <p className="text-xs font-medium text-secondaryColor my-2">{moreprofileData?.connections.length > 1 && moreprofileData?.connections.length + 'connections'}</p>

                    <div className="flex gap-3 my-2">
                        <Button
                            icon={ConnectoinStatusFinder(profile?.connectionStatus).icon || ''}
                            title={ConnectoinStatusFinder(profile?.connectionStatus).status || ''}
                            Border
                        >
                            {isLoading ? <LoadingSpinner width="25" /> : null}
                        </Button>
                        <Button icon={FollowStatusFinder(profile?.followStatus).icon || ''} title={FollowStatusFinder(profile?.followStatus).status || ''} fill >
                            {isLoading ? <LoadingSpinner width="25" /> : null}
                        </Button>
                    </div>

                    {/* <div className="text-sm font-bold text-blue-500 flex gap-3 my-2">
                        <Link to={'followers'} className="hover:underline transition" >395 followers</Link>
                        <Link to={'connections'} className="hover:underline transition" >395 connections</Link>
                    </div> */}

                </div>
            </div>

            <div className='lg:w-[400px] md:w-[300px] sm:w-full xs:w-full min-h-[100px]' >
                <div className='bg-white w-full border border-borderColor rounded-lg p-3'>
                    <h2 className="text-primaryColor text-sm font-medium">People You may know</h2>
                    <div className="my-3">
                        <Card minimalistData />
                    </div>
                </div>
            </div >
        </FeedContainer>
    )
}

export default Profile



interface BProps {
    title: string;
    Border?: boolean
    icon?: any
    fill?: any
    children?: any
}

function Button({ title, Border, icon, fill, children }: BProps) {
    return (
        <button className={`flex items-center gap-1 px-4 py-2 transition text-sm ${fill ? 'bg-blue-500 text-white' : 'hover:bg-sky-50 bg-transparent'}  ${Border ? 'border-2 border-blue-500 text-blue-500' : 'text-secondaryColor'
            } font-bold rounded-full `}>  {icon}{title}{children}</button>
    )
}