// utils/useUserData.js

import http from "../helpers/http";
import { authToken } from './authToken';
import { doObjToFormData } from "./helpers";

export const getUserData = async () => {

    try {
        if (authToken() !== undefined && authToken() !== null && authToken() !== '') {
            const result = await http
                .post("member-settings", doObjToFormData({ token: authToken() }))
                .then((response) => response.data)
                .catch((error) => error.response.data.message); // Replace with your API endpoint URL
            return result?.member;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

};
