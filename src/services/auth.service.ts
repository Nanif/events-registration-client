import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const login = (email: string, firsName: string, lastName: string, city: string, phone: string) => {
    return axios
        .post(API_URL + "/", {email, firsName, lastName, phone, city})
        .then((response) => {
            debugger
            return response.data && response.data[0];
        })
};

export const logout = () => {
    localStorage.removeItem("token");
};

export function authHeader() {
    const userStr = localStorage.getItem("token");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);

    if (user && user.token) {
        return {Authorization: 'Bearer ' + user.token};
    } else {
        return {Authorization: ''};
    }
}