import { productRepository } from "../repositories/productRepository.js";
import { orderRepository } from "../repositories/orderRepository.js";

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
    }
}