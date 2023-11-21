

import {
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
} from "tw-elements-react";


interface EditorProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    showModalLg: boolean;
    setShowModalLg: (value: boolean) => void;
}
// Form Layout 

export const FormLayout: React.FC<EditorProps> = ({ showModalLg, setShowModalLg, children, title }) => {
    return (
        <div>
            <TEModal show={showModalLg} setShow={setShowModalLg}>
                <TEModalDialog size="lg">
                    <TEModalContent>
                        <TEModalHeader>
                            {/* <!--Modal title--> */}
                            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                {title}
                            </h5>
                            {/* <!--Close button--> */}
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={() => setShowModalLg(false)}
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
                        {/* <!--Modal body--> */}
                        <TEModalBody>
                            {children}
                        </TEModalBody>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>

        </div>
    )
}