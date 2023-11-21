
import { useState } from 'react'
import { AddContents } from './AddContents';
import { FormLayout } from '../../../components/ui/Modal';
import { FileUpload } from '../../../components/Form/FileUpload';
import Button from '../../../components/Form/Button';

interface EditorProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    showModalLg: boolean;
    setShowModalLg: (value: boolean) => void;
}

export const Editor: React.FC<EditorProps> = function ({ showModalLg, setShowModalLg }) {

    // page 1
    const [data, setData] = useState({
        currentPage: 1,
        attachments: null
    })


    const { attachments }: any = data;




    const onChange = (key: string, value: any) => {
        setData(prev => ({
            ...prev,
            [key]: value
        }))
    }


    // FIXME: url 

    const submit = async (e: any) => {
        try {
            e.preventDefault();

            const res = await fetch(`http://localhost:3000/posts/utils/upload-files`, {
                method: "POST",
                body: attachments
            });

            if (res.ok) {
                const data = await res.json()
                onChange('attachments', data)
                onChange("currentPage", 2)
            }

        } catch (err) { }
    }


    const goBack = () => {
        onChange("currentPage", 1)
    }

    if (data.currentPage === 2) return (
        <AddContents
            {...data}
            goBack={goBack}
            showModalLg={showModalLg} setShowModalLg={setShowModalLg}
        />
    )

    return (
        <FormLayout title='Editor' showModalLg={showModalLg} setShowModalLg={setShowModalLg} >
            <form onSubmit={submit} encType='multipart/form-data'>
                <img src="" alt="image" />
                <h2>Select files to begin</h2>
                <p>Share images or a single video in your post.</p>
                <FileUpload
                    Label="Select Files"
                    value={attachments}
                    onChange={v => onChange("attachments", v)}
                    error={''}
                    multiple
                />
                <Button
                    title='Next'
                />
            </form>
        </FormLayout >
    );
}