import { useDispatch } from "react-redux";
import { useState } from 'react'
import { createPost, updatePost } from "../store/thunks";
import { FormLayout } from "../../../components/ui/Modal";
import InputField from "../../../components/Form/InputField";
import Button from "../../../components/Form/Button";


export const AddContents: React.FC<any> = ({ goBack, showModalLg, setShowModalLg, attachments, postData }) => {
    console.log(attachments)

    console.log(postData, 'Post Data')

    const dispatch = useDispatch()

    const emptyFormData = {
        title: postData?.title || "",
        contentType: "text",
        contentBody: postData?.contentBody || "",
        attachments: postData?.attachments || attachments
    }

    // page 2 
    const [formData, setFormData] = useState(
        emptyFormData,
    );

    const { title, contentBody }: any = formData

    const onChange = (key: string, value: any) => {

        setFormData(prev => ({
            ...prev,
            [key]: value
        }))
    }


    const submit = async (e: any) => {
        try {
            e.preventDefault();

            if (!postData?._id) {
                const createPostAction = await dispatch(createPost(formData));

                if (createPost.fulfilled.match(createPostAction)) {
                    setShowModalLg(false)
                }
                return
            }

            const form = {
                postId: postData?._id,
                formData
            }

            const editPostAction = dispatch(updatePost(form))

        } catch (err) { }
    }

    const clear = () => {
        setFormData(emptyFormData)
    }


    return (
        <FormLayout title='Editor' showModalLg={showModalLg} setShowModalLg={setShowModalLg} >
            <form onSubmit={submit}>

                <InputField
                    Label={''}
                    placeholder={'Post Title'}
                    onChange={(v) => onChange("title", v)}
                    value={title}
                    error={''}
                    outline={false}
                />
                <InputField
                    Label={''}
                    placeholder={'What do you want to talk about?'}
                    onChange={(v) => onChange("contentBody", v)}
                    value={contentBody}
                    error={''}
                    outline={false}
                />
                {postData && <img src={postData?.attachments[0]} alt="" className='w-full ' />}

                <Button
                    title='prev'
                    onClick={goBack}
                    outlineOnly={true}
                />
                <Button
                    title='publish'
                />
            </form>
        </FormLayout >
    )
}