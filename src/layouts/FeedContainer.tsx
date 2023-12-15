import { ReactNode } from 'react'
import { useToaster } from '../context/toastContext';
import Toaster from '../components/ui/Toaster';

interface FeedContinaerProps {
    children: ReactNode;
}

const FeedContainer: React.FC<FeedContinaerProps> = function ({ children }) {
    const { toastDetails } = useToaster();


    return (
        <>
            <div className='bg-background py-3 min-h-[100vh] '>
                <div className='wrapper mx-auto md:px-5 flex flex-col md:flex-row md:justify-center md:gap-7 '>
                    {children}
                </div>
            </div>

            {
                toastDetails && (
                    <Toaster
                        title={toastDetails.title}
                        content={toastDetails.content}
                        svgProp={toastDetails.svg}
                    />
                )
            }



        </>
    )
}

export default FeedContainer;

