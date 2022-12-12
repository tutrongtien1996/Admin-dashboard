import { API_URL  } from "../config/constant.js";
import { Helper } from "../utils/helper.js";
export const productRepository = {
    list: (params) => {
        return axios.get(API_URL+'/admin/products', 
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