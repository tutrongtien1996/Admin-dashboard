import { API_URL  } from "../config/constant.js";
import { Helper } from "../utils/helper.js";

export const SampleProductRepository = {
    list: (business_id) => {
        return axios.get(API_URL+'/admin/sample-products?business='+business_id,
        )
        .then((response) => {
            return response.data.data
        })
        .catch(function (error) {
            return false;
        })
    },

    createProducts: (data) => {
        var header = Helper.requestOption.headers
        return axios.post(API_URL+'/admin/sample-products/products', data, {
            headers: header
        }
        )
        .then((response) => {
            return response
        })
        .catch(function (error) {
            return false;
        })
    },

    listBusiness: () => {
        return axios.get(API_URL+"/admin/sample-business"
        )
        .then((response) => {
            return response.data.data
        })
        .catch(function (error) {
            return false;
        })
    }
}