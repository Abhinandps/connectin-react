import { useDispatch } from 'react-redux'
import { removeReportedPost, togglePostOptions } from '../../store/postSlice'

import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { GrCheckboxSelected } from "react-icons/gr";
import Button from '../../../../components/Form/Button';
import apiCall from '../../../../services/apiCall';
import { useToaster } from '../../../../context/toastContext';
import { successSvg } from '../../../../components/ui/svgs';


// import Toaster from '../../../../components/ui/Toaster';
// import { successSvg } from '../../../../components/ui/svgs';


function PostOptions({ _id, handlePostEdit, handleDeletePost, isPostOptions, feed, postId }: any) {
    const dispatch = useDispatch()
    const [showVerticalyCenteredModal, setShowVerticalyCenteredModal] =
        useState(false);

    const { setToastDetails } = useToaster();

    const initialReasons = [
        'Harrasment',
        'Fraud or scam',
        'Spam',
        'Misinformation',
        'Hateful speech',
        'Threats or violence',
        'Self-harm',
        'Graphic content',
        'Dangerous or extremist organizations',
        'Sexual content',
        'Fake account',
        'Illegal goods and services',
        'Infringement or defamation',
    ];

    const initialReasonsState = initialReasons.map((reason, index) => ({
        id: index + 1,
        name: reason,
        isActive: false,
    }));

    const [reasons, setReasons] = useState(initialReasonsState);

    const [selectedReason, setSelectedReason] = useState(null);

    const handleReasonSelection = (reasonId: any) => {

        setSelectedReason(reasonId);

        setReasons((prevReasons) =>
            prevReasons.map((reason) => ({
                ...reason,
                isActive: reason.id === reasonId,
            }))
        );

    };

    const handleSubmit = async (postId: any) => {
        try {
            const reason = reasons.find((reason) => reason.id === selectedReason)

            const res = await apiCall({
                url: `/reports/${postId}/report`,
                data: { report_type: reason?.id },
                method: 'POST'
            })

            dispatch(removeReportedPost(res.data))

            setShowVerticalyCenteredModal(false)

            setToastDetails({ title: 'Report submitted', content: 'Post has been reported and removed from your feed.', svg: successSvg, isActive: true })

            console.log(res)
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <>

            <div>
                <TEModal
                    show={showVerticalyCenteredModal}
                    setShow={setShowVerticalyCenteredModal}
                    scrollable
                >
                    <TEModalDialog centered>
                        <TEModalContent>

                            <TEModalHeader>
                                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                    Report this post
                                </h5>

                                <button
                                    type="button"
                                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                    onClick={() => setShowVerticalyCenteredModal(false)}
                                    aria-label="Close"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </TEModalHeader>


                            <TEModalBody>
                                <p className='text-xl text-primaryColor pb-5'>Select a reason that applies.</p>
                                <div className='py-3 flex flex-wrap gap-4'>
                                    {
                                        reasons.map((reason: any) => (
                                            <button key={reason?.id} className={` border border-borderColor px-4 py-2 rounded-full flex items-center justify-between gap-2 ${reason?.isActive ? 'bg-green-700 text-white' : 'bg-transparent text-secondaryColor'} font-medium`}
                                            >
                                                {reason.name}
                                                {
                                                    reason.isActive ? (
                                                        <GrCheckboxSelected className='text-white' />

                                                    ) : (
                                                        <FaPlus
                                                            className='text-secondaryColor'
                                                            onClick={() => handleReasonSelection(reason.id)} />
                                                    )
                                                }

                                            </button>
                                        ))
                                    }

                                </div>
                            </TEModalBody>

                            <TEModalFooter>

                                <Button onClick={() => handleSubmit(postId)} title='Submit' type='button' />

                            </TEModalFooter>
                        </TEModalContent>
                    </TEModalDialog>
                </TEModal>

            </div>

            <div className='text-[4px] absolute top-5 right-5 z-[200] text-pirmaryColor cursor-pointer p-1'
                onClick={() => dispatch(togglePostOptions({ postId: _id }))}
            >⚫ ⚫ ⚫</div>

            {
                isPostOptions && (
                    <div className='rounded-md bg-white shadow-md min-w-[60%] min-h-[50px] font-medium absolute top-10 right-5 border border-borderColor'>
                        <button
                            // onClick={() => handleDeleteComment(_id, comment._id)}
                            className='hover:bg-secondary-50 w-full  py-2 px-5 text-[13px] text-left my-1 text-secondaryColor hover:text-primaryColor'>📁 &nbsp; Save</button>
                        {
                            !feed && (
                                <>
                                    <button
                                        onClick={() => handlePostEdit(_id)}
                                        className='hover:bg-secondary-50 w-full py-2 px-5 text-[13px] text-left my-1 text-secondaryColor hover:text-primaryColor'>🖋  &nbsp;  &nbsp; Edit</button>
                                    <button
                                        onClick={() => handleDeletePost(_id)}
                                        className='hover:bg-secondary-50 w-full py-2 px-5 text-[13px] text-left my-1 text-secondaryColor hover:text-primaryColor'>❌ &nbsp; Delete</button>
                                </>
                            )
                        }




                        <button
                            onClick={() => setShowVerticalyCenteredModal(true)}
                            // onClick={() => handleDeleteComment(_id, comment._id)}
                            className='hover:bg-secondary-50 w-full py-2 px-5 text-[13px] text-left my-1 text-secondaryColor hover:text-primaryColor'>🔴 &nbsp; Report</button>
                    </div>
                )
            }

        </>
    )
}

export default PostOptions