import { customerRepository } from "../repositories/customerRepository.js";
import { Helper } from "../utils/helper.js";
import { commonUsecase } from "./commonUsecase.js";

export const customerUsecase = {
    list: async (callback) => {
        var response = await customerRepository.list(Helper.getFilter())
        commonUsecase.displayPagination(response.count, "customer")
        return callback(response.results)
    }
}