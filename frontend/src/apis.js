import axios from "axios";

async function postApi(endpoint, data) {
    const response = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}${endpoint}`,
        data,
        { withCredentials: true }
    );
    
    return response;
}


async function getApi(endpoint) {
    const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}${endpoint}`, { withCredentials: true });
    return response;
}

export { postApi, getApi };
