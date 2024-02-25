import { ReactNode } from 'react'
import { useToaster } from '../context/toastContext';
import Toaster from '../components/ui/Toaster';

import { motion } from 'framer-motion'


interface FeedContinaerProps {
    children: ReactNode;
}

const FeedContainer: React.FC<FeedContinaerProps> = function ({ children }) {
    const { toastDetails } = useToaster();


    return (
        <>
            <motion.div
                className='bg-background py-3 min-h-[100vh]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
                <div className='wrapper mx-auto md:px-5 flex flex-col md:flex-row md:justify-center md:gap-7 '>
                    {children}
                </div>
            </motion.div>

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

