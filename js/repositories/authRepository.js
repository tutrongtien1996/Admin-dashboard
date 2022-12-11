import { API_URL  } from "../config/constant.js";
export const authRepository = {
    login: (input) => {
        return axios.post(API_URL+"/admin/login", input)
        .then(function (response) {
            return  response.data;
        })
        .catch(function (error) {
            return error
        });
        
    },
    register: (input) => {
        return axios.post(API_URL+"/admin/register", input)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error
        });
    }
}