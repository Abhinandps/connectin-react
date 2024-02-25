import { useEffect } from "react";
// import Cookies from 'js-cookie'
import { useDispatch } from "react-redux";
import { fetchUserDetails, logout } from "../authSlice";
// 


function useFetchUserData() {
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchUserData() {
            // const accessToken = Cookies.get('access_token');
            const accessToken = localStorage.getItem('access_token');
            // const refreshToken = Cookies.get('refresh_token');
            // if (!refreshToken) {
            //     dispatch(logout())
            //     return;
            // }
            
            if (!accessToken) {
                dispatch(logout())
                return;
            }
            await dispatch(fetchUserDetails() as any)
        }
        fetchUserData();
    }, [dispatch]);

}


export default useFetchUserData