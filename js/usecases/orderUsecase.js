import { orderRepository } from "../repositories/orderRepository.js";
import { Helper } from "../utils/helper.js";
import { commonUsecase } from "./commonUsecase.js";

export const orderUsecase = {
    list: async (callback) => {
        var response = await orderRepository.list(Helper.getFilter())
        commonUsecase.displayPagination(response.count, "order")
        return callback(response.results)
    },

    getOne: async (id) => {
        var response = await orderRepository.getOne(id)
        return response
    },

    delete: async (id) => {
        var response = await orderRepository.delete(id)
        return response
    }
}