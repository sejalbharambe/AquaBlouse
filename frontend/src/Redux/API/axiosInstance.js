import axios from 'axios';

export const BASE_URL = `http://10.214.31.218:5000`;

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,

    headers: {
        'Content-Type': 'application/json',
},
});

export default axiosInstance;