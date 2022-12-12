import { API_URL  } from "../config/constant.js";
import { Helper } from "../utils/helper.js";
export const customerRepository = {
    list: (params) => {
        return axios.get(API_URL+'/admin/customers', 
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
    }
}