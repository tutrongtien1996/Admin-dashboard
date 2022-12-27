import { paymentRepository } from "../repositories/paymentRepository.js";
import { customerRepository } from "../repositories/customerRepository.js";

export const cartUsecase = {
    order: {},
    initOrder: () => {
        cartUsecase.order = {
            total: 0,
            customer: {
                name: "",
                phone_number: "",
                id: ""
            },
            products: [],
            payment_id: "", 
            discount: 0
        },
        document.querySelector(".empty_cart").style.display = "block"
    },
    getOrder: () => {
        return cartUsecase.order
    },
    getListPayment: async () => {
        return await paymentRepository.list(null)
    },
    getListCustomer: async () => {
        return await customerRepository.list(null)
    }
}