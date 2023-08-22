import axios from 'axios';
import useSWR from 'swr';
const token = localStorage.getItem("token") ?? "";

export const API = axios.create({
    baseURL: "https://member.engineersrwanda.rw",
    headers : {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    }
});

/**
 *
 * @param {string} path
 */
export const fetcher = async (path) => {
    return API.get(path)
        .then((res) => res.data)
        .catch((error) => {
            throw error.response?.data?.message || error.message || 'Unknown error occurred';
        });
};

/**
 *
 * @param {string} pathname
 */
export const useFetcher = (pathname, opts) => {
    const { data, error, isLoading } = useSWR(pathname, fetcher, opts);
    return {
        data,
        isLoading: isLoading || (!error && !data),
        isError: error
    };
};
