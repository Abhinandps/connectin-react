import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { ReactNode } from "react";



export default function PrivateRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return children;
    } else {
        return <Navigate to='/' />
    }
}