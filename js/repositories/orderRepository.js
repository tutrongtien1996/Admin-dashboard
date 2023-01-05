import { API_URL  } from "../config/constant.js";
import { Helper } from "../utils/helper.js";
export const orderRepository = {
    list: (params) => {
        return axios.get(API_URL+'/admin/orders', 
        {
            params: params,
            headers: Helper.requestOption.headers
        }
        )
        .then((response) => {
            return response.data.data;
        })
        .catch(function (error) {
            return false;
        })
    },

    getOne: (params) => {
        return axios.get(API_URL+'/admin/orders/'+params,{ 
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

    delete: (params) => {
        return axios.delete(API_URL+'/admin/orders/'+params, { 
            params: params,
            headers: Helper.requestOption.headers
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err)
        })
    }
}