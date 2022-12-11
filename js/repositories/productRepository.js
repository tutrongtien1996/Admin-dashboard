import { API_URL  } from "../config/constant.js";
export const productRepository = {
    list: () => {
        return axios.get(API_URL+'/admin/products', 
        {
            params: Filter ,
            headers: option.headers
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