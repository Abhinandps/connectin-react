import { useEffect } from "react";
// import Cookies from 'js-cookie'
import { useDispatch } from "react-redux";
import { getAccessToken } from "../authSlice";
// logout


function useRefreshToken() {
    const dispatch = useDispatch()

    useEffect(() => {
        async function refreshAccessToken() {


            // const accessToken = Cookies.get('access_token');
            const accessToken = localStorage.getItem('access_token');
            // const refreshToken = Cookies.get('refresh_token');

            // console.log('Access and Refresh',accessToken, refreshToken)

            // if (!refreshToken) {
            //     dispatch(logout())
            //     return;
            // }

            if (!accessToken) {
                await dispatch(getAccessToken('') as any)
            }
        }

        refreshAccessToken();
    }, [dispatch]);

}


export default useRefreshToken