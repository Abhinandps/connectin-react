import { useState, useEffect } from 'react'
import apiCall from '../../../services/apiCall';

interface FileUploadProps {
    Label?: string;
    placeholder?: string;
    type?: string;
    onChange: (value: string) => void;
    value: string;
    error: string;
    multiple?: any
}


export const FileUpload: React.FC<FileUploadProps> = ({ value, onChange, error, ...restProps }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (files.length === 0) return;
        uploadFiles();
    }, [files]);

    useEffect(() => {
        if (!value) setFiles([]);
    }, [value]);

    const uploadFiles = async () => {
        const formData: any = new FormData();

        files.forEach((file) => {
            formData.append('files', file);
        });

        onChange(formData);
    };

    const handleFileChange = (event: any) => {
        const selectedFiles: any = Array.from(event.target.files);
        setFiles(selectedFiles);
    };

    const handleRemoveImage = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handlePreviewVideo = (file: File, parentElement: HTMLElement) => {
        const video = document.createElement('video');
        const blob = new Blob([file], { type: file.type });
        video.src = URL.createObjectURL(blob);
        video.controls = true; // Add video controls for play/pause

        // Append the video element to the parent element
        parentElement.appendChild(video);

        // Remove the video element from the DOM when it is finished playing
        video.addEventListener('ended', () => {
            parentElement.removeChild(video);
        });

        // Play the video
        video.play();
    };


    return (
        <>
            <div className="flex gap-3">
                {files.map((file: any, i) => {
                    console.log(file.type)
                    if (file.type.startsWith('video/')) {
                        return (
                            <button
                                id='button'
                                key={i}
                                className="w-24"
                                onClick={() => {
                                    const buttonElement = document.getElementById('button');
                                    if (buttonElement) {
                                        handlePreviewVideo(file, buttonElement);
                                    }
                                }}
                            >
                                <video
                                    src={file ? URL.createObjectURL(file) : ""}
                                />
                            </button>
                        );
                    } else {
                        return (
                            <img
                                key={i}
                                className="w-24"
                                src={file ? URL.createObjectURL(file) : ""}
                                alt=""
                            />
                        );
                    }
                })}
            </div>

            <div className="w-[350px] my-5 flex flex-col">
                <input
                    onChange={handleFileChange}
                    type="file"
                    name='files'
                    className="text-lg outline-none  py-3 "
                    {...restProps}
                />
            </div>

            <div className="text-red-500 mt-2 font-bold text-sm">{error}</div>
        </>
    );
};


// export const FileUpload: React.FC<FileUploadProps> = ({ value, onChange, error }) => {
//     const [files, setFiles] = useState([]);

//     useEffect(() => {
//         if (files.length === 0) return;
//         uploadFiles();
//     }, [files]);

//     useEffect(() => {
//         if (!value) setFiles([]);
//     }, [value]);

//     const uploadFiles = async () => {
//         const formData: any = [];

//         files.forEach((file) => {
//             formData.push(file);
//         });

//         onChange(formData);
//     };

//     const handleFileChange = (event: any) => {
//         const selectedFiles: any = Array.from(event.target.files);
//         setFiles(selectedFiles);
//     };

//     return (
//         <>
//             <div className="flex gap-3">
//                 {files.map((file, i) => {
//                     return (
//                         <img
//                             key={i}
//                             className="w-24"
//                             src={file ? URL.createObjectURL(file) : ""}
//                             alt=""
//                         />
//                     );
//                 })}
//             </div>

//             <div className="w-[350px] my-5 flex flex-col">
//                 <input
//                     onChange={handleFileChange}
//                     type="file"
//                     className="text-lg outline-none  py-3 "
//                     multiple
//                 ></input>
//             </div>

//             <div className="text-red-500 mt-2 font-bold text-sm">{error}</div>
//         </>
//     );

// };