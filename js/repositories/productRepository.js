import { API_URL  } from "../config/constant.js";
import { ProductEntityFromList } from "../entities/productEntity.js";
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
            var data = response.data.data
            return {
                results: ProductEntityFromList(data.results),
                count: data.count
            }
        })
        .catch(function (error) {
            return false;
        })
    },
    create: (formData) => {
        var header = Helper.requestOption.headers
        header["Content-Type"] = 'multipart/form-data'
        return axios.post(API_URL+'/admin/products', formData, {
            headers: header
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return false
        })
    },
    delete: (id) => {
        return axios.delete(API_URL + '/admin/products/'+id, Helper.requestOption)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return false;
        })
    },

    update : (id, formData) => {
        var header = Helper.requestOption.headers;
        header["Content-Type"] = 'multipart/form-data';
        return axios.patch(API_URL + "/admin/products/"+id, formData, {
            headers: header
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return false
        })
    }
}