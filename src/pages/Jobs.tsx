import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import FeedContainer from "../layouts/FeedContainer";
import InputField from "../components/Form/InputField";
import Button from "../components/Form/Button";
import Select from "../components/Form/Select";

import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createJobs, fetchManagedJobs, fetchRecentJobs } from "../features/job/jobslice";
import { CiSaveDown2 } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { IoRemoveCircleSharp } from "react-icons/io5";


const Jobs = () => {

    return (
        <FeedContainer>

            {/* settings */}
            <div className='lg:w-[370px] md:w-[255px] sm:w-full relative md:min-h-[20vh] rounded-t-lg '>

                <div className='bg-white min-h-[30vh] border-b border-l border-r border-borderColor rounded-b-lg py-3'>

                    <Link to={'#'} className="flex items-center justify-start gap-3 px-3 py-2 hover:bg-slate-50 text-secondaryColor hover:text-primaryColor">
                        <div className="text-xl font-bold rounded-lg text-secondaryColor  w-[20px] flex justify-center items-center">
                            <CiSaveDown2 />
                        </div>
                        <p className="text-sm font-medium">My Jobs</p>
                    </Link>

                    <Link to={'settings'} className="flex items-center justify-start gap-3 px-3 py-2 hover:bg-slate-50 text-secondaryColor  hover:text-primaryColor">
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
                    <Link to={'/jobs/applicants'} className="flex items-center justify-start gap-3 px-3 py-2 hover:bg-slate-50 text-secondaryColor  hover:text-primaryColor">
                        <div className="text-xl font-bold rounded-lg   w-[20px] flex justify-center items-center ">
                            🗄
                        </div>
                        <p className="text-sm font-medium">Job Applicants</p>
                    </Link>
                    <Link to={'/jobs/my-interviews'} className="flex items-center justify-start gap-3 px-3 py-2 hover:bg-slate-50 text-secondaryColor  hover:text-primaryColor">
                        <div className="text-xl font-bold rounded-lg   w-[20px] flex justify-center items-center ">
                            📆
                        </div>
                        <p className="text-sm font-medium">My Interviews</p>
                    </Link>
                    <Link to={'/jobs/scheduled-interviews'} className="flex items-center justify-start gap-3 px-3 py-2 hover:bg-slate-50 text-secondaryColor  hover:text-primaryColor">
                        <div className="text-xl font-bold rounded-lg   w-[20px] flex justify-center items-center ">
                            📅
                        </div>
                        <p className="text-sm font-medium">Scheduled Interviews</p>
                    </Link>

                </div>

            </div>

            <div className="flex flex-col gap-3 w-full ">
                <Outlet />
            </div>

        </FeedContainer >
    )
}

export default Jobs


export function AllJobs() {

    const { recentJobs } = useSelector((state: any) => state.job)
    const dispatch = useDispatch()
    const { user } = useAuth()
    const accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN

    const [searchterm, setSearchTerm] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [select, setSelect] = useState(null)

    console.log(recentJobs, 'recentJobs')
    useEffect(() => {
        dispatch(fetchManagedJobs() as any)
        dispatch(fetchRecentJobs({}) as any)
    }, [dispatch])


    const handleSearch = (searchterm: any) => {
        if (!searchterm) return
        dispatch(fetchRecentJobs({ searchterm }) as any)
    }

    useEffect(() => {
        if (!select) return
        dispatch(fetchRecentJobs({ select }) as any)
        setSelect(null)
    }, [select])



    const handleSearchChange = async (query: string) => {

        try {
            const response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
                {
                    params: {
                        access_token: accessToken,
                    },
                }
            );
            console.log(response.data.features)

            setSuggestions(response.data.features);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    return (
        <>
            <JobContainer title='Recommended for you' label='Based on your profile and search history' />

            <JobContainer title='More recent jobs for you' label='Based on your profile and search history'  >
                <Filter select={select} setSelect={setSelect} handleSearch={handleSearch} searchterm={searchterm} setSearchTerm={setSearchTerm} suggestions={suggestions} handleSearchChange={handleSearchChange} setSuggestions={setSuggestions} />
                {recentJobs.list.map((job: any) => (
                    !job?.isDraft && (job?.userId !== user.userId) && (< JobCard {...job} publicProp={true} />)
                ))}
            </JobContainer>
        </>
    )
}


export function Filter({ select, setSelect, handleSearchChange, suggestions, setSearchTerm, searchterm, setSuggestions, handleSearch }: any) {

    return (
        <div className="h-[60px] flex justify-between items-center px-5 border-b border-borderColor pb-2 ">
            <div className="flex gap-2 relative">
                <input
                    type="search"
                    className="relative bg-[#edf3f8] m-0 lg:block  flex-auto lg:flex-row rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-sm font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primaryColor dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primaryColor w-[200px] focus:w-[400px] "
                    value={searchterm}
                    placeholder="Search by City, state or zip code"
                    aria-label="Search"
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
                {suggestions.length > 0 && (
                    <ul className="absolute top-10 bg-white border border-borderColor z-30 w-full py-2 rounded-md shadow-md">
                        {suggestions.map((location: any) => (
                            <li
                                className="text-sm font-light capitalize py-2 px-4  text-secondaryColor hover:bg-blue-100 cursor-pointer"
                                key={location?.id}
                                onClick={() => {
                                    setSearchTerm(location?.place_name);
                                    setSuggestions([])
                                }}
                            >
                                {location?.place_name}

                            </li>
                        ))}
                    </ul>
                )}
                <button
                    onClick={() => {
                        handleSearch(searchterm); setSearchTerm(null)
                    }}
                    className="bg-green-800 px-2 rounded-full text-white text-sm r">search</button>
            </div>
            <select name="" id="" className='border cursor-pointer border-green-800 text-green-800 px-3 rounded-full p-1'
                onChange={(e) => setSelect(e.target.value)}
                value={select}
            >
                <option value="Remote">
                    Remote
                </option>
                <option value="Hybrid">
                    Hybrid
                </option>
                <option value="On-site">
                    On-site
                </option>
            </select>

        </div>
    )
}

export function JobContainer({ children, title, label }: any) {
    return (
        < div className='bg-white rounded-lg border border-borderColor py-3 min-h-[100px]' >
            <div className="px-4 py-5]">
                <h1 className="text-lg font-medium text-primaryColor leading-relaxed">{title}</h1>
                <p className="text-secondaryColor text-xs">{label}</p>
            </div>
            {children}
        </div >
    )
}


export function ManagedJobs() {
    const dispatch = useDispatch()
    const { user } = useAuth()

    useEffect(() => {
        dispatch(fetchManagedJobs() as any)
    }, [dispatch])

    const { managedJobs } = useSelector((state: any) => state.job)



    return (
        <JobContainer title='Manage Posted Jobs'>
            {managedJobs.list.map((job: any) => (
                user?.userId === job?.userId && (< JobCard {...job} />)
            ))}
        </JobContainer>
    )
}

export function JobCard({ jobTitle, workPlaceType, employeeLocation, company, updatedAt, isDraft, _id, userId, publicProp }: any) {

    const navigate = useNavigate()

    const { user } = useAuth()

    const handleJobEdit = (jobId: string) => {
        navigate(`/add-job?jobId=${jobId}`)
    }

    return (
        <div className="flex justify-start items-start mx-5 mt-1 py-3 relative border-b border-borderColor">
            <div className="bg-primaryColor text-white w-[60px] h-[60px] flex justify-center items-center text-3xl font-bold rounded-lg uppercase">{company[0] + company.split('').slice(company.length - 1).join('')}</div>

            <div className="ml-5">
                <h1 className="text-blue-500 font-semibold capitalize hover:underline hover:cursor-pointer"
                    onClick={() => navigate(`/jobs/view?jobId=${_id}`)}
                >{jobTitle}  </h1>
                <p className="text-sm capitalize">{company}</p>
                <span className="text-sm text-secondaryColor">{employeeLocation} ({workPlaceType})</span>

                {
                    !isDraft && (
                        <div className="flex items-center gap-2">
                            <img className="w-[30px] h-[30px] rounded-full" src="https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645719137?e=1703116800&v=beta&t=emx0qOZ_uF1VpGQGbBT_cLE9uE_Q7D5vov-PgRQXy1I" alt="profile" />
                            <p className="text-xs text-secondaryColor">Your profile matches this job</p>
                        </div>
                    )
                }

                {isDraft ? (
                    <p className="my-2 text-xs bg-green-700 text-center font-light py-1 text-white rounded-full ">Drafted Job</p>
                ) : (
                    <p className="py-3 text-xs font-semibold text-green-700"><TimeAgo createdAt={updatedAt} /></p>
                )}
            </div>


            {
                isDraft ? (

                    <div className="absolute top-0 text-xl font-bold right-10 w-[100px] h-[100px] flex items-center justify-center rounded-lg text-secondaryColor transition-all cursor-pointer ">
                        <AiFillEdit className='text-3xl font-bold text-secondaryColor mr-5' onClick={() => handleJobEdit(_id)} />
                        <IoRemoveCircleSharp className='text-3xl font-bold text-red-700' />
                    </div>

                ) : (
                    <>
                        <div className="absolute top-0 text-xl font-bold right-10 w-[100px] h-[100px] flex items-center justify-center rounded-lg text-secondaryColor transition-all cursor-pointer ">
                            <CiSaveDown2 className='text-3xl font-bold text-secondaryColor' />
                            {user?.userId === userId && !publicProp && (
                                <>
                                    <AiFillEdit className='text-3xl font-bold text-secondaryColor mx-2' onClick={() => handleJobEdit(_id)} />
                                    <IoRemoveCircleSharp className='text-3xl font-bold text-red-700' />
                                </>
                            )}
                        </div>
                    </>

                )
            }

        </div >
    )
}


export function JobDetails({ jobTitle, jobType, workPlaceType, description, userId, skills, employeeLocation, company, isDraft, isReadOnly, setShowModalLg, isApplied }: any) {

    const { user } = useAuth()

    return (
        <div className="bg-white p-5 rounded-md shadow-md relative">
            <div className=" flex items-center gap-3 ">
                <p className="absolute right-10 text-xs bg-yellow-200 px-2 rounded-md">{isDraft && 'Drafted'}</p>
                <div className="bg-primaryColor text-white w-[50px] h-[50px] flex justify-center items-center text-2xl font-bold rounded-lg uppercase">{company && company[0] + company.split('').slice(company.length - 1).join('')}
                </div>
                <div>
                    <h1 className="text-blue-500 text-lg capitalize font-semibold">{jobTitle}  </h1>
                </div>
            </div>
            <div className="text-left ms-16 flex gap-2">
                <p className="text-sm capitalize">{company}</p>
                <span className="text-sm text-secondaryColor ">{employeeLocation} ({workPlaceType})</span>
                <span className="text-sm rounded-md bg-green-100 px-2 text-secondaryColor">{jobType}</span>
            </div>

            <div className="text-left mt-5 font-medium">
                <h2 className="text-lg mb-3">About the Job</h2>
                <p className="capitalize">Job Title: {jobTitle}</p>

                <p> Location: {employeeLocation} ({workPlaceType})</p>

                <p>Experience: 0-4+ Years</p>
            </div>

            {
                !isReadOnly && !isApplied && (
                    <div className="w-[150px] my-3">
                        {/* disabled={true} */}
                        <Button title="Easy Apply" onClick={() => setShowModalLg(true)} disabled={user?.userId === userId} />
                    </div>
                )
            }

            {isApplied && (
                <div className="w-[150px] my-3">
                    <button className="bg-green-900/80 uppercase px-3 py-2 rounded-full text-sm font-bold text-white">Applied 🥇</button>
                </div>
            )}

            <div className="block py-3" dangerouslySetInnerHTML={{ __html: description }} />

            <h2 className="text-lg mb-3">Required Skills</h2>
            <div className="flex gap-2">

                {skills && skills.map((skill: string, index: number) => (
                    <div key={index} className="w-fit text-center bg-green-700 rounded-full  px-2 py-1 text-white font-bold min-w-32 flex items-center gap-1 ">
                        {skill}
                    </div>
                ))}
            </div>


        </div>
    )
}

import { IoIosClose } from "react-icons/io";

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import apiCall from "../services/apiCall";
import { useAuth } from "../features/auth/hooks/useAuth";
import axios from "axios";

export function CreateJob() {

    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const jobId = queryParams.get('jobId');


    const { managedJobs } = useSelector((state: any) => state.job)

    const [page, setPage] = useState({
        currentPage: jobId ? 2 : 1
    })

    const onPageChange = (key: string, value: any) => {
        setPage(prev => ({
            ...prev,
            [key]: value
        }))
    }

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



    const [description, setDescription] = useState('')


    const [skill, setSkill] = useState('')

    const [jobDetails, setJobDetails] = useState({
        jobId: '',
        description: description,
        skills: [] as string[],
    })

    const accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN


    useEffect(() => {
        setJobDetails((prevJobDetails) => ({
            ...prevJobDetails,
            description: description,
        }));
    }, [description]);



    // job id from params

    useEffect(() => {
        (async () => {
            const res = await apiCall({
                url: `/jobs/${jobId}`
            })
            // console.log(res)

            setJobDetails((prevJobDetails) => ({
                ...prevJobDetails,
                jobTitle: res?.data.jobTitle,
                company: res?.data.company,
                workPlaceType: res?.data.workPlaceType,
                employeeLocation: res?.data.employeeLocation,
                jobType: res?.data.jobType,
                isDraft: res?.data.isDraft,
                jobId: res?.data._id,
                description: res?.data.description,
                skills: res?.data.skills
            }));
        })()
    }, [jobId])


    const { jobTitle, company, workPlaceType
        , employeeLocation
        , jobType
    } = formData

    const [suggestions, setSuggestions] = useState([]);


    const handleSearchChange = async (query: any) => {
        // onChange("employeeLocation", query)

        try {
            const response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
                {
                    params: {
                        access_token: accessToken,
                    },
                }
            );
            console.log(response.data.features)

            setSuggestions(response.data.features);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorData({
            jobTitle: "",
            company: "",
            workPlaceType: "",
            employeeLocation: "",
            jobType: ""
        })
        const { employeeLocation, ...rest }: any = formData
        const newFormData = {
            ...rest,
            employeeLocation: employeeLocation?.name
        }
        const res = await dispatch(createJobs(newFormData) as any)
        if (createJobs.fulfilled.match(res)) {

            if (res.payload.res.data) {
                // console.log(res.payload.res.data, 'creation data')
                const data = res.payload.res.data
                setJobDetails((prevJobDetails) => ({
                    ...prevJobDetails,
                    jobId: data?._id,
                    description: data?.description,
                    skills: data?.skills
                }));
                onPageChange('currentPage', 2)
            }

            if (res.payload.res.message) {
                const errorArray = res.payload.res.message;
                const formattedErrors = errorArray.map((error: string) => error.trim().replace(/^data\./, ''));
                formattedErrors.forEach((error: string) => {
                    const inputFieldName = error.split(" ")[0];
                    onError(inputFieldName, error.toLowerCase())
                });
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

    const onChange = useCallback((key: string, value: string | number | any) => {
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

    // const goBack = () => {
    //     onPageChange("currentPage", 1)
    // }


    const handleAddSkills = () => {
        setJobDetails((prevJobDetails) => ({
            ...prevJobDetails,
            skills: [...prevJobDetails.skills, skill],
        }))

        setSkill('')
    }


    const handleRemoveSkills = (index: number) => {
        setJobDetails((prevJobDetails) => ({
            ...prevJobDetails,
            skills: [...prevJobDetails.skills.filter((_skill, pos) => pos !== index)]
        }))
    }



    const handleUpdate = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            setJobDetails((prevJobDetails) => ({
                ...prevJobDetails,
                description: '',
                skills: []
            }))

            setSkill('')
            setDescription('')

            // console.log(jobDetails.description, jobDetails.skills)

            const res = await apiCall({
                url: `/jobs/${jobId}/update`,
                method: 'PUT',
                data: jobDetails
            })

            console.log(res)
        } catch (err) {

        }
    }

    const handleSaveToDraft = async (e: any) => {
        try {
            e.preventDefault()
            setJobDetails((prevJobDetails) => ({
                ...prevJobDetails,
                description: '',
                skills: []
            }))

            setSkill('')
            setDescription('')

            await apiCall({
                url: `/jobs/${jobId}/draft`,
                method: 'PUT',
                data: jobDetails
            })

        } catch (err) {

        }
    }




    if (page.currentPage === 2) return (
        <FeedContainer>


            <div className="flex justify-center items-start w-full min-h-[80vh]">
                <div className="bg-white w-full h-full border border-borderColor rounded-lg px-4 py-3">
                    <div className="flex gap-4 items-center border-b pb-3">
                        <FaArrowLeft className='text-primaryColor cursor-pointer' />
                        <h2 className="text-primaryColor text-md font-medium">2 of 2 : Job Details</h2>
                    </div>

                    <div className="py-3">
                        <h2 className="text-sm">Add a Job Description</h2>
                        <p className="text-[11px] py-1">Description <span className="text-blue-500">*</span></p>
                    </div>

                    <div>
                        <ReactQuill theme="snow" value={description || jobDetails?.description} onChange={setDescription} />

                    </div>

                    <div className="py-3">
                        <h2 className="text-sm">Add Skills</h2>
                        <p className="text-[11px] py-1">Add skill keywords to make your job more visible to the right candidates</p>

                        <form onSubmit={handleUpdate}>
                            <div className="flex gap-2 items-center py-5 flex-wrap">
                                <input type="text"
                                    placeholder="Add Skills"
                                    className="border-2 text-center border-green-600 rounded-full placeholder:text-green-600 px-2 py-1 
                                    text-green-700 font-bold w-32
                                    placeholder:text-sm placeholder:font-bold
                                    outline-none
                                    "
                                    value={skill}
                                    onChange={(e) => setSkill(e.target.value)}
                                />

                                <FaCirclePlus className={`text-green-700 text-3xl hover:shadow-lg hover:text-green-600 hover:shadow-success-300 cursor-pointer transition-all bg-transparent rounded-full ${skill.length > 0 ? 'opacity-1' : 'opacity-0'} duration-100`}
                                    onClick={handleAddSkills}
                                />

                                {jobDetails?.skills.map((skill, index) => (
                                    <div key={index} className="text-center bg-green-700 rounded-full  px-2 py-1 text-white
                                    font-bold min-w-32 flex items-center gap-1">
                                        {skill}
                                        <IoIosClose className="text-2xl cursor-pointer " onClick={() => handleRemoveSkills(index)} />
                                    </div>
                                ))}

                            </div>

                            <Button title="Save as draft" type='button' onClick={handleSaveToDraft} outlineOnly />
                            <Button title="Post a Job" />
                        </form>

                    </div>
                </div>
                <div className="w-full mx-5">
                    <div className="text-xs">
                        {/* preview... */}
                        <JobDetails {...jobDetails} isReadOnly={true} />


                    </div>
                </div>
            </div>
        </FeedContainer>
    )

    return (
        <FeedContainer>
            <div className="bg-white md:w-[500px] sm:w-full px-16 py-10 border border-borderColor rounded-lg shadow-sm ">
                <form onSubmit={handleSubmit} className="relative" >
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
                        onChange={(v: any) => onChange("workPlaceType", v)}
                    />


                    <InputField
                        Label={"Employee location"}
                        placeholder={""}
                        value={employeeLocation?.name}
                        error={errorData.employeeLocation}
                        onChange={v => onChange("employeeLocation", v)}
                        handleSearchChange={(v: any) => handleSearchChange(v)}
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute bg-white border border-borderColor z-30 w-full py-2 rounded-md shadow-md">
                            {suggestions.map((location: any) => (
                                <li
                                    className="text-sm font-light capitalize py-2 px-4  text-secondaryColor hover:bg-blue-100 cursor-pointer"
                                    key={location?.id}
                                    onClick={() => {
                                        onChange('employeeLocation',
                                            { name: location?.place_name, id: location?.id });
                                        setSuggestions([])
                                    }}
                                >
                                    {location?.place_name}

                                </li>
                            ))}
                        </ul>
                    )}

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
                        onChange={(v: any) => onChange("jobType", v)}
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

        const timeDifferenceInSeconds = Math.floor((currentDate.getTime() - createdDate.getTime()) / 1000);

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



