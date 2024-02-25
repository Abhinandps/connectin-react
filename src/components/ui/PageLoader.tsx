import { useEffect, useRef, useState } from 'react'
import ConnectInLogoLight, { Logo } from '../NavBar/Logo';
import { motion } from 'framer-motion'
import LoadingBar from 'react-top-loading-bar'
import { ScaleLoader } from 'react-spinners'

function PageLoader() {
    const [loaded, setLoaded] = useState(false);
    const ref = useRef<any>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 1100);
        if (ref.current) {
            ref.current.continuousStart()
        }

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            className={`bg-${loaded ? 'black' : 'white'} absolute z-[77777] top-0 left-0 w-full h-screen transition-all duration-3000 `}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='absolute top-[45%] left-[45%] transform[-translate-x-1/2 -translate-y-1/2]'>
                {loaded ? (
                    <ConnectInLogoLight />
                ) : (
                    <Logo />
                )}
                <div className='mt-4 md:ml-14'>
                    <ScaleLoader height={15}
                        width={3} color={loaded ? '#217cf4' : '#222121'} />
                </div>
                <LoadingBar color={loaded ? '#217cf4' : '#222121'} ref={ref} />
            </div>
        </motion.div >
    );
}

export default PageLoader