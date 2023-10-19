import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { ReactNode } from "react";



export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        navigate('/sign-in')
        return null
    }

    return <>{children}</>
}