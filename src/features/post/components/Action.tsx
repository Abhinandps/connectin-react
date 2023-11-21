
// post content user actions 

import { TERipple } from "tw-elements-react"

export const Action = ({ title, postId, isLiked, onclick }: any) => {
    return (

        <TERipple rippleColor="light" className='w-full'>
            <button
                onClick={() => onclick(postId)}
                className={`${isLiked ? 'text-primaryColor' : 'text-secondaryColor hover:text-primaryColor'}  w-full transition delay-75 ease-in-out rounded-md hover:bg-secondary-200 p-3 my-2 mx-2 text-sm font-medium  `}>
                {title}
            </button>
        </TERipple>

    )
}