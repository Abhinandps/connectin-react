
import { useSelector } from "react-redux";

export function useAuth() {
    const { status , user} = useSelector((state: any) => state.auth)
    console.log(user);
    
    return {  user, isAuthenticated: status === "authenticated" };
}


