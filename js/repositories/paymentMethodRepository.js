import { API_URL  } from "../config/constant.js";
import { Helper } from "../utils/helper.js";

export const PaymentMethodRepository = {
    
    createPayments: (data) => {
        var header = Helper.requestOption.headers
        return axios.post(API_URL+'/admin/payments/methods', data, {
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

    listSample: () => {
        return axios.get("/data/pament_method.json")
        .then((response) => {
            return response.data
        })
        .catch(function (error) {
            return false;
        })
    }
}