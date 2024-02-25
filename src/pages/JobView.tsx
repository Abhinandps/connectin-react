import { useLocation } from "react-router-dom";
import { JobDetails } from "./Jobs"
import { useEffect, useState } from "react";
import apiCall from "../services/apiCall";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { FormLayout } from "../components/ui/Modal";
import InputField from "../components/Form/InputField";
import { FileUpload } from "../components/Form/FileUpload";

function JobView() {

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const jobId = queryParams.get('jobId');

    const [jobDetails, setJobDetails] = useState<any>()

    console.log(jobDetails, "jobDetails")

    const [loading, setLoading] = useState(false)

    const [showModalLg, setShowModalLg] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await apiCall({
                url: `/jobs/${jobId}/public`
            })
            // console.log(res, 'response----')

            setJobDetails((prevJobDetails: any) => ({
                ...prevJobDetails,
                jobTitle: res?.data.jobTitle,
                company: res?.data.company,
                workPlaceType: res?.data.workPlaceType,
                employeeLocation: res?.data.employeeLocation,
                jobType: res?.data.jobType,
                isDraft: res?.data.isDraft,
                jobId: res?.data._id,
                userId: res?.data.userId,
                description: res?.data.description,
                skills: res?.data.skills || [],
                isApplied: res?.data.isApplied
            }));

            setTimeout(async () => {
                setLoading(false)
            }, 300)
        })()
    }, [jobId || jobDetails])


    return (

        loading ? (<div className="flex justify-center items-center h-[80vh]"><LoadingSpinner /></div>) : (<>
            <JobDetails  {...(jobDetails && { ...jobDetails })}
                setShowModalLg={setShowModalLg}
            />
            <ApplyJob title={jobDetails?.company}
                jobId={jobDetails?.jobId}
                hiringManager={jobDetails?.userId}
                showModalLg={showModalLg}
                setShowModalLg={setShowModalLg}
                setJobDetails={setJobDetails}
                jobTitle={jobDetails?.jobTitle}
            />

        </>)

    )
}

export default JobView


export function ApplyJob({ title, jobTitle, showModalLg, setShowModalLg, jobId, hiringManager, setJobDetails }: any) {

    const [data, setData] = useState({
        email: '',
        mobile: '',
        resume: '',
        jobId: jobId,
        hiringManager: hiringManager
    })

    const { setToastDetails } = useToaster()

    const { email, mobile, resume } = data;

    const onChange = (key: string, value: any) => {
        setData(prev => ({
            ...prev,
            [key]: value
        }))
    }


    const [_loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await apiCall({
                url: '/jobs/get-resume',
                method: 'POST'
            })
            if (res) {
                onChange('resume', res?.resume)
            }
            setLoading(false)
        })()
    }, [])


    const submit = async (e: any) => {
        try {
            e.preventDefault()

            if (!data?.resume) {
                return alert('please add resume')
            }

            if (!data?.email || !data.mobile) {
                return alert('please fill the input fields')
            }

            const res = await apiCall({
                url: "/jobs/apply",
                method: 'POST',
                data
            })

            console.log(res, 'response.>_..')

            if (res) {
                setJobDetails((prevJobDetails: any) => ({
                    ...prevJobDetails,
                    isApplied: true
                }));

                setShowModalLg(false)

                setToastDetails({
                    title: 'Job Applied',
                    content: `You applied to the job role on ${jobTitle} at ${title} successfully`,
                    svgProp: successSvg,
                    isActive: true
                })
            }





        } catch (err) {

        }
    }


    return (
        <FormLayout title={`Apply to ${title}`} showModalLg={showModalLg} setShowModalLg={setShowModalLg} >
            <form onSubmit={submit} className="realtive pb-12" encType="multipart/form-data" >
                <InputField
                    Label={"Email address *"} placeholder={"enter email address"}
                    onChange={(v) => onChange('email', v)}
                    value={email}
                    type="email"
                    error={""}
                />
                <InputField
                    Label={"Mobile Phone number *"} placeholder={"enter modile number"}
                    onChange={(v) => onChange('mobile', v)}
                    value={mobile}
                    type="number"
                    error={""}
                />

                {
                    resume && (

                        <div className="w-full h-[80px] border border-borderColor rounded-md shadow-md flex gap-3 items-center ">
                            <div className="bg-red-600 text-white w-[50px] h-full uppercase font-bold  flex justify-center items-center rounded-s-md">pdf</div>
                            <div className="font-semibold text-sm">
                                Resume.pdf
                            </div>
                        </div>
                    )
                }


                <button className="absolute bottom-3 right-10 capitalize bg-primaryColor shadow-sm px-3 py-2 rounded-full text-white text-sm font-bold">submit</button>
            </form>
        </FormLayout>
    )
}


export function ApplicationSetting() {
    const [data, setData] = useState({
        attachments: null,
        resume: null
    })

    const { attachments, resume }: any = data;


    const onChange = (key: string, value: any) => {
        setData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await apiCall({
                url: '/jobs/get-resume',
                method: 'POST'
            })
            if (res) {
                onChange('resume', res?.resume)
            }
            setLoading(false)
        })()
    }, [])

    const submit = (e: any) => {
        e.preventDefault()
        if (attachments) {
            (async () => {
                const res = await fetch(`${apiUrl}/jobs/resume`, {
                    method: "POST",
                    body: attachments,
                    credentials: 'include'
                });

                if (res.ok) {
                    const data = await res.json()
                    onChange('resume', data[0])
                }
            })()
        }
    }




    return (
        <div>


            {
                !resume && !loading ? (
                    <form onSubmit={submit} encType="multipart/form-data">
                        <FileUpload
                            onChange={v => onChange("attachments", v)}
                            value={attachments}
                            error={""}
                        />
                        <button type="submit">upload resume</button>
                    </form>
                )
                    : (
                        loading ? (<LoadingSpinner />)
                            :
                            (
                                <div className="w-[300px] h-[80px] border border-borderColor rounded-md shadow-md flex gap-3 items-center ">
                                    <div className="bg-red-600 text-white w-[50px] h-full uppercase font-bold  flex justify-center items-center rounded-s-md">pdf</div>
                                    <div className="font-semibold text-sm">
                                        Resume.pdf
                                    </div>
                                </div >
                            )
                    )
            }
        </div >
    )
}

import { HiDownload } from "react-icons/hi";
import Button from "../components/Form/Button";
import { useToaster } from "../context/toastContext";
import { successSvg } from "../components/ui/svgs";
import { apiUrl } from "../config/apiUrl";

export function Applicants() {
    const [applicants, setApplicants] = useState([])

    useEffect(() => {
        (async () => {
            const res = await apiCall({
                url: '/jobs/applicants',
                method: 'POST'
            })
            setApplicants(res)
        })()
    }, [])

    return (
        <div className="bg-white border border-borderColor rounded-md">
            {
                applicants && applicants.map((user: any) => (
                    <JobApplicant user={user} setApplicants={setApplicants} />
                ))
            }
        </div>
    )
}


function JobApplicant(props: any) {
    const { email, mobile, resume, jobId, userId, hiringManager, isApproved } = props?.user

    const data = { jobId, userId, hiringManager }

    const [showModalLg, setShowModalLg] = useState(false)

    const [formData, setformData] = useState({
        calendly: '',
        ...data
    })

    const { calendly } = formData

    const onChange = (key: string, value: any) => {
        setformData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleApproval = async () => {
        try {
            if (!formData.calendly) {
                return alert('please add the calendy schedule url')
            }
            const res = await apiCall({
                url: '/jobs/applicant/aproves',
                method: 'PUT',
                data: formData
            })
            if (res) {
                console.log(props)
                const updatedApplicant = res;

                props?.setApplicants((applicants: any) => {
                    console.log(applicants, 'asdfasdf asdf')
                    const updatedApplicants = applicants.map((applicant: any) =>
                        applicant._id === updatedApplicant._id ? updatedApplicant : applicant
                    );

                    return updatedApplicants;
                });
                onChange('calendly', '')
                setShowModalLg(false)
            }
        } catch (err) {

        }
    }

    return (
        <>
            <div className="p-5 flex items-center justify-between text-sm border-b border-borderColor py-2">
                <p>{email}</p>
                <p>{mobile}</p>
                <div className="w-[350px] h-[40px] border border-borderColor rounded-md  flex gap-3 items-center ">
                    <div className="bg-red-600 text-white w-[50px] h-full uppercase font-bold  flex justify-center items-center rounded-s-md">pdf</div>

                    <div className="font-semibold text-sm">
                        Resume.pdf
                    </div>

                    <div>
                        <DownloadLink cloudinaryPublicId={resume} filename="resume.pdf" />
                    </div>

                    <div>
                        {isApproved ? (
                            <button className="text-green-700/50 font-semibold text-sm px-3">Approved</button>
                        ) : (

                            <>
                                <button onClick={() => setShowModalLg(true)} className="text-green-700 font-semibold text-sm px-3">Approv</button>
                                <button className="text-red-700 font-semibold text-sm px-3">Reject</button>
                            </>
                        )}


                    </div>
                </div >
            </div>

            <PopUpConfirm onAproval={handleApproval} calendly={calendly} onChange={onChange} showModalLg={showModalLg} setShowModalLg={setShowModalLg} />
        </>
    )
}


const DownloadLink = ({ cloudinaryPublicId, filename }: any) => {
    const downloadUrl = cloudinaryPublicId

    return (
        <a href={downloadUrl} download={filename}>
            <HiDownload className='text-xl cursor-pointer' />
        </a>
    );
};


export function PopUpConfirm({ onAproval, calendly, showModalLg, onChange, setShowModalLg }: any) {
    return (

        <FormLayout
            showModalLg={showModalLg}
            setShowModalLg={setShowModalLg}
        >
            <InputField
                Label={"Paste your calendly scheduling link to send as notification *"}
                placeholder={""}
                onChange={v => onChange('calendly', v)}
                value={calendly}
                error={""}
            />
            <Button onClick={() => onAproval()} title="Send" />
        </FormLayout>

    )
}