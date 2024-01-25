import { useEffect, useState } from 'react'

import { TEToast } from "tw-elements-react";
import { useToaster } from '../../context/toastContext';

function Toaster({ title, content, svgProp }: any) {
    const [open, setOpen] = useState(false);
    const { toastDetails, setToastDetails } = useToaster()

    useEffect(() => {
        setOpen(true)
        setTimeout(() => {
            setToastDetails({ title: "", content: '', svgProp: null, isActive: false })
        }, 10000)
    }, [toastDetails.isActive])

    return toastDetails.isActive && (
        <TEToast
            staticToast
            open={open}
            color="bg-white border border-borderColor shadow-lg"
            className="mb-6 fixed bottom-0 left-20"
        >
            <div className="flex items-center justify-between rounded-t-lg border-b border-primary-200 bg-clip-padding px-4 pb-2 pt-2.5">
                <p className="flex items-center font-bold">
                    <span className="[&>svg]:w-4 [&>svg]:h-4 mr-2 -mt-[2px]">
                        {svgProp}
                    </span>
                    {title}
                </p>
                <div className="flex items-center">

                    {/* <p className="text-xs text-primary-700">11 mins ago</p> */}

                    <button
                        type="button"
                        className="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        onClick={() => { setOpen(false); setToastDetails({ title: "", content: '', svgProp: null, isActive: false }) }}
                        aria-label="Close"
                    >
                        <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
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
                        </span>
                    </button>
                </div>
            </div>
            <div className="break-words rounded-b-lg px-4 py-4">
                {content}
            </div>
        </TEToast>
    )
}

export default Toaster