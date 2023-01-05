import { API_URL  } from "../config/constant.js";
import { Helper } from "../utils/helper.js";
export const userRepository = {
    getOne: (params) => {
        return axios.get(API_URL+'/admin/users/'+params,{ 
            params: params,
            headers: Helper.requestOption.headers
        })
        .then((response) => {
            return response.data.data;
        })
        .catch(function (error) {
            return false;
        })
    },

    updateCompany: (params, formData) => {
        return axios.patch(API_URL+'/admin/companies/'+params,formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': "Bearer "+localStorage.getItem("access_token")
            }
        })
        .then((response) => {
            return response.data.data;
        })
        .catch(function (error) {
            return false;
        })
    },
    updateUser: (params, formData) => {
        return axios.patch(API_URL+'/admin/users/'+params,formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': "Bearer "+localStorage.getItem("access_token")
            }
        })
        .then((response) => {
            return response.data.data;
        })
        .catch(function (error) {
            return false;
        })
    }
}