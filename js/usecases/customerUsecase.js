import { customerRepository } from "../repositories/customerRepository.js";
import { Helper } from "../utils/helper.js";
import { commonPresenter } from "./commonUsecase.js";

export const customerUsecase = {
    list: async (callback) => {
        var response = await customerRepository.list(Helper.getFilter())
        commonPresenter.displayPagination(response.count, "order")
        return callback(response.results)
    }
}