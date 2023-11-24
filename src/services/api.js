import axios from "axios";
import { get } from "lodash";

export const api = axios.create({
    baseURL: "http://localhost:5005/",
    timeout: 60000,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(request => {
    console.log("[API Request] ", request);
    return request;
});

api.interceptors.response.use(response => {
    console.log("[API Response] ", response);
    return response;
}, error => {
    console.log("[API Error] ", error);
    console.log("[API Response] ", error.response);

    const errorMessage = get(
        error,
        "response.data.error",
        get(error, "response.data.errors.0", error.message || "Unknown error"),
    );
    console.log("Error Message: ", errorMessage);
    error.errorMessage = get(errorMessage, "detail", errorMessage);

    return Promise.reject(error);
});

export function setAuthorization(idToken) {
    api.defaults.headers.common["Authorization"] = idToken;
}

export function unsetAuthorization() {
    api.defaults.headers.common['"Authorization'] = false;
}