
function Thumbnail({attachments}) {
    return (
        <div>
            <img src={attachments[0]} alt="" className='h-[400px] w-full object-cover' />
        </div>
    )
}

export default Thumbnail