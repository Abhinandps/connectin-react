import { useEffect } from "react";
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux";
import { getAccessToken, logout } from "../authSlice";



function useRefreshToken() {
    const dispatch = useDispatch()

    useEffect(() => {
        async function refreshAccessToken() {


            const accessToken = Cookies.get('access_token');
            const refreshToken = Cookies.get('refresh_token');

            if (!refreshToken) {
                dispatch(logout())
                return;
            }

            if (!accessToken) {
                await dispatch(getAccessToken(refreshToken) as any)
            }
        }

        refreshAccessToken();
    }, [dispatch]);

}


export default useRefreshToken