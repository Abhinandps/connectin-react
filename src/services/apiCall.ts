import { apiUrl } from "../config/apiUrl";

interface ApiCallProps {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    data?: any;
    isFile?: boolean;
}

const apiCall = async ({ url, method = "GET", data, isFile = false }: ApiCallProps) => {
    console.log(JSON.stringify(data));
    
    
    const res = await fetch(`${apiUrl}${url}`, {
        method,
        headers: !isFile
            ? {
                "Content-Type": "application/json",
            }
            : {},
        body: isFile ? data : data ? JSON.stringify(data) : undefined,
    });

    
    const response = await res.json();
    console.log(response);
    return response;
};

export default apiCall;