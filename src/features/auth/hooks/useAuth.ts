
import { useSelector } from "react-redux";

export function useAuth() {
    const { status , user} = useSelector((state: any) => state.auth)    
    return {  user, isAuthenticated: status === "authenticated" };
}



