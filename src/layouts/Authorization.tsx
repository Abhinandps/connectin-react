import { useNavigate } from 'react-router-dom';

interface AuthorizationProps {
    userRoles: string[];
    requiredRole: string;
    children: React.ReactNode;
}

const Authorization: React.FC<AuthorizationProps> = ({ userRoles, requiredRole, children }) => {
    const navigate = useNavigate();

    if (userRoles.includes(requiredRole)) {
        return children;
    } else {
        navigate('/unauthorized');
        return null;
    }
};

export default Authorization;
