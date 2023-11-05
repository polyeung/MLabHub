import {
    axiosInstance,
    axiosResponseBody,
} from "./apiConnection"

export const getColdEmailRequest = {
    post: (postData: any) =>
        axiosInstance.post(`/api/coldemail/stream-query/`, postData).then(axiosResponseBody),
}