import { ReactNode } from 'react'
import FeedContainer from '../../../layouts/FeedContainer';

interface ManageProps {
    children: ReactNode;
}

const Manage: React.FC<ManageProps> = function ({ children }) {


    return (
        <FeedContainer>
            {children}
        </FeedContainer>
    )
}

export default Manage;

