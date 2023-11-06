import { ReactNode } from 'react'

interface FeedContinaerProps {
    children: ReactNode;
}

const FeedContainer: React.FC<FeedContinaerProps> = function ({ children }) {

    return (
        <div className='bg-background py-3 min-h-[100vh]'>
            <div className='wrapper mx-auto md:px-5 flex flex-col md:flex-row md:justify-center md:gap-7 '>
                {children}
            </div>
        </div>
    )
}

export default FeedContainer;

