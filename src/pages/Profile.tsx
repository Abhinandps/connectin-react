import { FaClock, FaEnvelope, FaUserPlus } from "react-icons/fa";
import Card from "../features/user/components/Card"
import FeedContainer from "../layouts/FeedContainer"
import { FaPlus } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import apiCall from "../services/apiCall";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { followUserReducer, sendConnectionRequest, unFollowUserReducer } from "../features/user/store/thunks";
import { useToaster } from "../context/toastContext";
import { successSvg } from "../components/ui/svgs";
import { RiEditCircleFill } from "react-icons/ri";
import { FormLayout } from "../components/ui/Modal";
import { useAuth } from "../features/auth/hooks/useAuth";
import InputField from "../components/Form/InputField";
import { FileUpload } from "../components/Form/FileUpload";
import { apiUrl } from "../config/apiUrl";

function Profile() {
    const dispatch = useDispatch()
    const { user } = useAuth()
    const Recommended = useSelector((state: any) => state.user.recommendations)
    const { id } = useParams();
    const { setToastDetails } = useToaster()
    const [profile, setProfile] = useState<any>();
    const [moreprofileData, setProfileMoreProfile] = useState<any>();
    const [loading, setLoading] = useState(false)
    const [showCoverModal, setShowCoverModal] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [photo, setPhoto] = useState()

    const isProfile = user && id && user.userId === id



    useEffect(() => {
        (async () => {
            const res = await apiCall({ url: `/users/user/${id}`, method: 'POST' })
            const result = await apiCall({ url: `/users/${id}` })
            setProfile(res.data)
            setProfileMoreProfile(result.data)
            setFormData({
                firstName: result.data?.firstName || "",
                lastName: result.data?.lastName || "",
                headline: result.data?.headline || "",
                profileImage: result.data?.profileImage || "",
                coverImage: result.data?.coverImage || ""
            });
        })()
    }, [id])




    const [formData, setFormData] = useState<any>(
        {
            firstName: "",
            lastName: "",
            headline: "",
            profileImage: "",
            coverImage: ""
        }
    );

    const { firstName, lastName, headline, profileImage, coverImage } = formData

    const [errorData, _setErrorData] = useState({
        firstName: "",
        lastName: "",
        headline: "",
        profileImage: "",
        coverImage: ""
    })


    const onChange = useCallback((key: string, value: string | number) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }, [formData])


    // const onError = useCallback((key: string, value: string | number) => {
    //     setErrorData(prev => ({
    //         ...prev,
    //         [key]: value
    //     }))
    // }, [formData])

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/posts/utils/upload-files`, {
                method: "POST",
                body: photo
            });

            if (res.ok) {
                const data = await res.json()
                onChange('profileImage', data[0])
            }
        })()
    }, [photo && photo])


    const FollowStatusFinder = (status: string): { status: string; icon: JSX.Element, color?: string } => {
        if (status === 'following') {
            return { status: 'following..', icon: <></>, color: 'transparent' };
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


    const sendRequest = (userId: string) => {
        setLoading(true)
        setTimeout(() => {
            dispatch(sendConnectionRequest(userId) as any)
            setProfile((prev: any) => {
                return {
                    ...prev,
                    connectionStatus: 'pending'
                };
            });

            setToastDetails({ title: "Request Sented", content: `Connection Request sented to ${profile.firstName} ${profile.lastName} successfully`, isActive: true, svgProp: successSvg })

            setLoading(false)
        }, 1000)
    }

    const followUser = (userId: string) => {
        console.log(userId, 'followed user')
        setLoading(true)
        setTimeout(() => {
            dispatch(followUserReducer(userId) as any)
            setProfile((prev: any) => {
                return {
                    ...prev,
                    followStatus: 'following'
                };
            });

            setToastDetails({ title: "Followed", content: `You Followed ${profile.firstName} ${profile.lastName} successfully`, isActive: true, svgProp: successSvg })

            setLoading(false)
        }, 1000)
    }


    const unfollowUser = (userId: string) => {
        setLoading(true)
        setTimeout(() => {
            dispatch(unFollowUserReducer(userId) as any)
            setProfile((prev: any) => {
                return {
                    ...prev,
                    followStatus: 'follow'
                };
            });

            setToastDetails({ title: "Unfollowed", content: `You Unfollowed ${profile.firstName} ${profile.lastName} successfully`, isActive: true, svgProp: successSvg })

            setLoading(false)
        }, 1000)
    }


    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            const res = await apiCall({
                url: `/users/edit/basic-info`,
                method: 'PUT',
                data: formData
            })
            if (res) {
                setProfile(res)
                console.log(res)
                setToastDetails({ title: 'Profile Updateed', content: 'Your Profile Updated Successfully', svg: successSvg, isActive: true })

                setShowEditModal(false)
            }
        } catch (err) { }
    }


    return (
        <FeedContainer>
            <div className="relative w-full">

                <div className='h-[200px] relative '>
                    <img className='w-full h-full object-cover rounded-t-lg'
                        src={coverImage || 'https://picsum.photos/851/315'}

                        alt="" />

                    {
                        isProfile && (
                            < RiEditCircleFill onClick={() => setShowCoverModal(true)} className='absolute top-5 right-5 text-white text-3xl cursor-pointer hover:text-gray-200' />
                        )
                    }

                </div>

                <div className={` ${isProfile && 'cursor-pointer'} absolute w-[140px] h-[140px] top-[120px] left-24 translate-x-[-50%] border-4 rounded-full border-white`}
                    onClick={() => isProfile && setShowProfileModal(true)}
                >
                    <img className='w-full h-full rounded-full'
                        src={profileImage || 'https://picsum.photos/200'}
                        alt="" />
                </div>

                <div className='bg-white flex flex-col py-20 px-5 border-b border-l border-r border-borderColor rounded-b-lg'>
                    <h2 className='font-semibold text-xl my-1 capitalize'>{profile?.firstName} {profile?.lastName}</h2>
                    <p className='text-sm  leading-3 text-primaryColor'>{
                        profile?.headline
                    }</p>
                    <p className="text-xs text-secondaryColor">Kannur, Kerala, India</p>

                    {
                        !isProfile && (
                            <p className="text-sm font-bold text-blue-500 flex gap-3 my-2">{moreprofileData?.connections.length > 1 && moreprofileData?.connections.length + ' connections'}</p>
                        )
                    }

                    {
                        isProfile && (
                            <div className="text-sm font-bold text-blue-500 flex gap-3 my-2">
                                <Link to={'followers'} className="hover:underline transition" >395 followers</Link>
                                <Link to={'connections'} className="hover:underline transition" >
                                    {moreprofileData?.connections.length > 1 && moreprofileData?.connections.length + ' connections'}
                                </Link>
                            </div>
                        )
                    }

                    <div className="flex gap-3 my-2">
                        {
                            !isProfile ? (
                                <>
                                    <Button
                                        userId={profile?.userId}
                                        onRequestSent={sendRequest} isLoading={loading}
                                        icon={ConnectoinStatusFinder(profile?.connectionStatus).icon || ''}
                                        title={ConnectoinStatusFinder(profile?.connectionStatus).status || ''}
                                        // color={ConnectoinStatusFinder('')}
                                        Border
                                    >
                                        {/* {isLoading ? <LoadingSpinner width="25" /> : null} */}
                                    </Button>

                                    <Button
                                        userId={profile?.userId}
                                        icon={FollowStatusFinder(profile?.followStatus).icon || ''}
                                        title={FollowStatusFinder(profile?.followStatus).status || ''} fill
                                        color={FollowStatusFinder(profile?.connectionStatus).color || ''}
                                        onFollows={profile?.followStatus === 'follow' ? followUser : unfollowUser}
                                    // FollowStatusFinder(profile?.followStatus).status === 'following' ? unfollowUser : followUser
                                    >
                                        {/* {isLoading ? <LoadingSpinner width="25" /> : null} */}
                                    </Button>
                                </>
                            ) : (
                                <div className="flex gap-2 opacity-[0.3]">
                                    <Button
                                        userId={profile?.userId}
                                        title={'Add Profile Section'}
                                        Border
                                    >
                                        {/* {isLoading ? <LoadingSpinner width="25" /> : null} */}
                                    </Button>

                                    <Button
                                        userId={profile?.userId}
                                        title={'More'}
                                        Border
                                    >
                                        {/* {isLoading ? <LoadingSpinner width="25" /> : null} */}
                                    </Button>
                                </div>
                            )
                        }

                    </div>

                    {
                        isProfile && (
                            < RiEditCircleFill onClick={() => setShowEditModal(true)} className='absolute top-[210px] right-5 text-secondaryColor/50 text-4xl cursor-pointer' />
                        )
                    }

                </div>

                {/* cover modal  */}
                <FormLayout
                    showModalLg={showCoverModal}
                    setShowModalLg={setShowCoverModal}
                    title="Cover Photo"
                >

                </FormLayout>


                {/* profile modal  */}
                <FormLayout
                    showModalLg={showProfileModal}
                    setShowModalLg={setShowProfileModal}
                    title="Profile photo"
                >

                    <form onSubmit={handleSubmit} className="flex items-center space-x-6 ">
                        <div className="flex flex-col items-center w-full">
                            <div className="shrink-0">
                                <img className="h-[200px] w-[200px] object-cover rounded-full"

                                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"

                                    alt="Current profile photo" />

                            </div>

                            {/* <label className="block">
                                <span className="sr-only">Choose profile photo</span>
                                <input type="file" className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 mt-5 mb-10 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-primaryColor
                                hover:file:bg-violet-100
                                "/>
                            </label> */}

                            <FileUpload
                                Label="change photo"
                                value={profileImage}
                                onChange={(v: any) => setPhoto(v)}
                                error={''}
                            />


                        </div>

                        <div className="absolute right-5 bottom-3">
                            <Button title="save" fill='blue' />
                        </div>

                    </form>

                </FormLayout>

                {/* edit modal  */}
                <FormLayout
                    showModalLg={showEditModal}
                    setShowModalLg={setShowEditModal}
                    title="Edit intro"
                >

                    <form onSubmit={handleSubmit}>
                        <div>
                            <h2 className="text-primaryColor text-md font-semibold">Basic Info</h2>
                        </div>
                        <InputField
                            Label={"Frist Name"}
                            placeholder={""}
                            onChange={v => onChange("firstName", v)}
                            value={firstName}
                            error={errorData.firstName}

                        />



                        <InputField
                            Label={"Last Name"}
                            placeholder={""}
                            onChange={v => onChange("lastName", v)}
                            value={lastName}
                            error={errorData.lastName}
                        />

                        <InputField
                            Label={"Headline"}
                            placeholder={""}
                            onChange={v => onChange("headline", v)}
                            value={headline}
                            error={errorData.headline}
                        />

                        {/* <InputField
                    Label={"Location (optional)"}
                    placeholder={""}
                    // onChange={() => ()}
                    value={""}
                    error={""} /> */}

                        <div className="flex justify-end">
                            <Button title="save" fill='blue' />
                        </div>

                    </form>



                </FormLayout>

            </div>

            <div className='lg:w-[400px] md:w-[300px] sm:w-full xs:w-full min-h-[100px]' >
                <div className='bg-white w-full border border-borderColor rounded-lg p-3'>
                    <h2 className="text-primaryColor text-sm font-medium">People You may know</h2>
                    <div className="w-full">
                        {
                            Recommended.map((user: any) =>
                            (
                                <Card user={user} onRequestSent={sendConnectionRequest} isLoading={loading} minimalistData />
                            )
                            )
                        }
                    </div>
                </div>
            </div >




        </FeedContainer>
    )
}

export default Profile



interface BProps {
    userId?: string
    title: string;
    Border?: boolean
    icon?: any
    fill?: any
    children?: any
    color?: string
    onRequestSent?: any
    onFollows?: any;
    isLoading?: any
}



function Button({ title, Border, icon, fill, children, onRequestSent, isLoading, userId, onFollows }: BProps) {
    return (
        <button className={`flex items-center  gap-1 px-4 py-2  transition-all text-sm ${fill ? 'bg-blue-500 text-white' : 'hover:bg-sky-50 bg-transparent'}  ${Border ? `border-2 border-blue-500 text-blue-500` : 'text-secondaryColor'
            } font-bold rounded-full `}
            onClick={
                () => {
                    if (onRequestSent) {
                        onRequestSent(userId);
                    } else if (onFollows) {
                        onFollows(userId);
                    }
                }
            }
        >
            {
                isLoading ?
                    <div className="min-w-[76px] flex justify-center">
                        <LoadingSpinner width="20" />
                    </div> :
                    <>
                        {icon}{title}{children}
                    </>
            }
        </button>
    )
}