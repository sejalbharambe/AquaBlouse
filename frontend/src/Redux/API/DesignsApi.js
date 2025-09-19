import axios from "axios";
import axiosInstance from "./axiosInstance";

const DesignApi = {
    AddLace: (data) => {
        return axiosInstance.post(`api/laces`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    GetLace: () => {
        return axiosInstance.get(`api/laces`);
    },

    updateLace: () => {
        return axiosInstance.put(`api/laces/${id}`);
    },

    deleteLace: () => {
        return axiosInstance.delete(`api/laces/${id}`);
    },

    // src/Redux/API/DesignsApi.js
    AddBlouse: (formData) => {
        return axiosInstance.post(`api/blouses`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    GetBlouse: () => {
        return axiosInstance.get(`api/blouses`);
    },

    EditBlouse: (id) => {
        return axiosInstance.put(`api/blouses/${id}`);
    },

    deleteBlouse: (id) => {
        return axiosInstance.delete(`api/blouses/${id}`);
    },
}

export default DesignApi;