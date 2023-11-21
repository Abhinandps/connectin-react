
const ContentBody = ({ title, contentBody }) => {
    return (
        <div className=''>
            <p className='font-light text-[12px] py-2 ' >{title}</p>
            <p className='font-light leading-6 text-[12px] py-2 ' >
                {/* <ContentWithTags contentBody={contentBody} /> */}
                {contentBody}</p>
        </div>
    )
}

export default ContentBody