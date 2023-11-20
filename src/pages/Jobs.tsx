import { Link, Outlet, useNavigate } from "react-router-dom";
import FeedContainer from "../layouts/FeedContainer";
import InputField from "../components/Form/InputField";
import Button from "../components/Form/Button";
import Select from "../components/Form/Select";

import { useCallback, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createJobs, fetchManagedJobs } from "../features/job/jobslice";


const Jobs = () => {


    return (
        <FeedContainer>

            {/* settings */}
            <div className='md:w-[255px] sm:w-full relative md:min-h-[20vh] rounded-t-lg '>

                <div className='bg-white min-h-[30vh] border-b border-l border-r border-borderColor rounded-b-lg py-3'>

                    <Link to={'#'} className="flex items-center justify-start gap-3 px-3 py-2 hover:bg-slate-50 text-secondaryColor hover:text-primaryColor">
                        <div className="text-xl font-bold rounded-lg text-secondaryColor  w-[20px] flex justify-center items-center">
                            ⬇
                        </div>
                        <p className="text-sm font-medium">My Jobs</p>
                    </Link>

                    <Link to={'#'} className="flex items-center justify-start gap-3 px-3 py-2 hover:bg-slate-50 text-secondaryColor  hover:text-primaryColor">
                        <div className="text-xl font-bold rounded-lg   w-[20px] flex justify-center items-center ">
                            ⚙
                        </div>
                        <p className="text-sm font-medium">Application settings</p>
                    </Link>

                    <Link to={'/add-job'} className="flex items-center justify-start gap-3 px-3 py-2 hover:bg-slate-50 text-blue-500  hover:text-blue-600">
                        <div className="text-xl font-bold rounded-lg   w-[20px] flex justify-center items-center ">
                            🖋
                        </div>
                        <p className="text-sm font-medium">Post a job</p>
                    </Link>
                    <Link to={'/jobs/posted-jobs'} className="flex items-center justify-start gap-3 px-3 py-2 hover:bg-slate-50 text-secondaryColor  hover:text-primaryColor">
                        <div className="text-xl font-bold rounded-lg   w-[20px] flex justify-center items-center ">
                            💼
                        </div>
                        <p className="text-sm font-medium">Manage Job Posts</p>
                    </Link>

                </div>

            </div>

            <div className="flex flex-col gap-3">
                <Outlet />
            </div>

            {/* extra  */}
            <div className='lg:block md:hidden sm:hidden xs:hidden hidden w-[300px] max-h-[500px] opacity-0'>
                <div className='bg-white w-full h-[250px] border border-borderColor rounded-lg p-5 flex flex-col items-center justify-center'>
                    {/* <p className='text-xs leading-relaxed text-secondaryColor font-light'>Abhinand, unlock your full potential with ConnectIn Premium</p>
                    <div className='my-3 flex items-center gap-2 justify-center'>
                        <img className='w-[65px] h-[65px] rounded-full' src="https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645719137?e=1703116800&v=beta&t=emx0qOZ_uF1VpGQGbBT_cLE9uE_Q7D5vov-PgRQXy1I" alt="" />
                        <img className='w-[65px] h-[65px]' src="https://media.licdn.com/dms/image/C4E0EAQElWt4fvMOIcQ/rightRail-logo-shrink_200_200/0/1631008652608?e=1700571600&v=beta&t=jMdf9xG-vjNF0JF5vVvXBb8bOtH-dfy7ZRlhWSP_ptk" alt="" />
                    </div>
                    <p className='text-xs leading-relaxed  text-secondaryColor font-light'>See who's viewd your profile</p>
                    <Link to={'/premium'} className='p-2  text-xs font-medium px-3 border-2 mt-2 border-blue-400 rounded-full  text-blue-400'>Subscribe</Link> */}
                </div>
            </div>

        </FeedContainer >
    )
}



export default Jobs


export function AllJobs() {

    const { managedJobs } = useSelector((state: any) => state.job)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchManagedJobs())
    }, [dispatch])

    return (
        <>
            <JobContainer title='Recommended for you' label='Based on your profile and search history' />

            <JobContainer title='More recent jobs for you' label='Based on your profile and search history'  >
                {managedJobs.list.map((job) => (
                    <JobCard {...job} />
                ))}
            </JobContainer>
        </>
    )
}



export function JobContainer({ children, title, label }: any) {
    return (
        < div className='bg-white rounded-lg border border-borderColor py-3 max-h-[500px]' >
            <div className="px-4 py-5">
                <h1 className="text-lg font-medium text-primaryColor leading-relaxed">{title}</h1>
                <p className="text-secondaryColor text-xs">{label}</p>
            </div>
            {children}
        </div >
    )
}


export function ManagedJobs() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchManagedJobs())
    }, [dispatch])

    const { managedJobs } = useSelector((state: any) => state.job)

    console.log(managedJobs, 'managed')


    return (
        <JobContainer title='Manage Posted Jobs'>
            {managedJobs.list.map((job) => (
                <JobCard {...job} />
            ))}
        </JobContainer>
    )
}



export function JobCard({ jobTitle, jobType, workPlaceType, employeeLocation, company, createdAt }) {

    return (
        <div className="flex justify-start items-start mx-5 mt-1 py-3 lg:w-[555px] md:w-[500px] relative border-b border-borderColor">
            <div className="bg-primaryColor text-white w-[60px] h-[60px] flex justify-center items-center text-3xl font-bold rounded-lg uppercase">{company[0] + company.split('').slice(company.length - 1).join('')}</div>
            <div className="ml-5">
                <h1 className="text-blue-500 font-semibold">{jobTitle} (All levels) </h1>
                <p className="text-sm capitalize">{company}</p>
                <span className="text-sm text-secondaryColor">{employeeLocation} ({workPlaceType})</span>
                <div className="flex items-center gap-2">
                    <img className="w-[30px] h-[30px] rounded-full" src="https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645719137?e=1703116800&v=beta&t=emx0qOZ_uF1VpGQGbBT_cLE9uE_Q7D5vov-PgRQXy1I" alt="profile" />
                    <p className="text-xs text-secondaryColor">Your profile matches this job</p>
                </div>
                <p className="py-3 text-xs font-semibold text-green-700"><TimeAgo createdAt={createdAt} /></p>
            </div>
            <div className="absolute top-5 text-xl font-bold right-10 w-[50px] h-[50px] flex items-center justify-center rounded-lg text-secondaryColor hover:bg-slate-100 transition-all cursor-pointer hover:shadow-sm">
                ⬇
            </div>
        </div>
    )
}



export function CreateJob() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { managedJobs } = useSelector((state: any) => state.job)

    // const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    // const inputRef = useRef<HTMLInputElement | null>(null);


    // const options = {
    //     componentRestrictions: { country: "ng" },
    //     fields: ["address_components", "geometry", "icon", "name"],
    //     types: ["establishment"]
    // };

    // useEffect(() => {
    //     if (inputRef.current) {
    //         autoCompleteRef.current = new window.google.maps.places.Autocomplete(
    //             inputRef.current,
    //             options
    //         );
    //     }
    // }, [options]);


    useEffect(() => {
        if (managedJobs.error) {
            managedJobs.error.forEach((error: string) => {
                const inputFieldName = error.split(" ")[0];
                onError(inputFieldName, error.toLowerCase())
            });
        }
    }, [managedJobs.error])


    const [formData, setFormData] = useState<any>(
        {
            jobTitle: "",
            company: "",
            workPlaceType: "",
            employeeLocation: "",
            jobType: ""
        }
    );

    const { jobTitle, company, workPlaceType
        , employeeLocation
        , jobType
    } = formData

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorData({
            jobTitle: "",
            company: "",
            workPlaceType: "",
            employeeLocation: "",
            jobType: ""
        })
        const res = await dispatch(createJobs(formData))
        if (createJobs.fulfilled.match(res)) {
            if (res.payload.response.data) {
                navigate('/jobs/posted-jobs')
            }
        }



    }

    const [errorData, setErrorData] = useState({
        jobTitle: "",
        company: "",
        workPlaceType: "",
        employeeLocation: "",
        jobType: ""
    })

    const onChange = useCallback((key: string, value: string | number) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }, [formData])

    const onError = useCallback((key: string, value: string | number) => {
        setErrorData(prev => ({
            ...prev,
            [key]: value
        }))
    }, [formData])

    return (
        <FeedContainer>
            <div className="bg-white md:w-[500px] sm:w-full px-16 py-10 border border-borderColor rounded-lg shadow-sm">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold text-primaryColor">Post a job </h1>

                    <InputField
                        Label={"Job title"}
                        placeholder={"Add the title you are hiring for"}
                        value={jobTitle}
                        onChange={v => onChange("jobTitle", v)}
                        error={errorData.jobTitle}
                    />

                    <InputField
                        Label={"Company"}
                        placeholder={""}
                        value={company}
                        error={errorData.company}
                        onChange={v => onChange("company", v)}
                    />

                    <Select
                        Label={"Workplace type"}
                        placeholder={""}
                        options={[
                            {
                                id: 'Remote',
                                name: 'Remote',
                                more: 'employees work off-site.'
                            },
                            {
                                id: 'On-site',
                                name: 'On-site',
                                more: 'employee come to work-in person.'
                            },
                            {
                                id: 'Hybrid',
                                name: 'Hybrid',
                                more: 'employees work on-site and off-site.'
                            }
                        ]}
                        value={workPlaceType}
                        error={errorData.workPlaceType}
                        onChange={v => onChange("workPlaceType", v)}
                    />


                    <InputField
                        Label={"Employee location"}
                        placeholder={""}
                        value={employeeLocation}
                        error={errorData.employeeLocation}
                        onChange={v => onChange("employeeLocation", v)}
                    />

                    <Select
                        Label={"Job type"}
                        placeholder={""}
                        options={[
                            {
                                id: 'FullTime',
                                name: 'FullTime',
                            },
                            {
                                id: 'PartTime',
                                name: 'PartTime',
                            },
                            {
                                id: 'Contract',
                                name: 'Contract',
                            },
                            {
                                id: 'Temporary',
                                name: 'Temporary',
                            },
                            {
                                id: 'Internship',
                                name: 'Internship',
                            }
                        ]}
                        value={jobType}
                        error={errorData.jobType}
                        onChange={v => onChange("jobType", v)}
                    />

                    <Button title="Get started" />
                </form>
            </div>
        </FeedContainer>
    )
}


export function TimeAgo({ createdAt }: any) {
    function timeAgo(createdAt: any) {
        const currentDate = new Date();
        const createdDate = new Date(createdAt);

        const timeDifferenceInSeconds = Math.floor((currentDate - createdDate) / 1000);

        if (timeDifferenceInSeconds < 60) {
            return `${timeDifferenceInSeconds} sec ago`;
        } else if (timeDifferenceInSeconds < 3600) {
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            return `${minutes} min ago`;
        } else if (timeDifferenceInSeconds < 86400) {
            const hours = Math.floor(timeDifferenceInSeconds / 3600);
            return `${hours} hour ago`;
        } else if (timeDifferenceInSeconds < 2592000) {
            const days = Math.floor(timeDifferenceInSeconds / 86400);
            return days === 1 ? '1 day ago' : `${days} days ago`;
        } else if (timeDifferenceInSeconds < 31536000) {
            const months = Math.floor(timeDifferenceInSeconds / 2592000);
            return months === 1 ? '1 month ago' : `${months} months ago`;
        } else {
            const years = Math.floor(timeDifferenceInSeconds / 31536000);
            return years === 1 ? '1 year ago' : `${years} years ago`;
        }
    }

    return <>{timeAgo(createdAt)}</>
}




