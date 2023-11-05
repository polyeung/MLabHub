import axios, { AxiosResponse } from "axios"

// axios normal instance
export const axiosInstance = axios.create({
    baseURL: ``,
    headers: {
        "Content-Type": "Application/json",
    },
    withCredentials: true,
})


// the response body
export const axiosResponseBody = (response: AxiosResponse) => response.data
