import { companyRepository } from "../repositories/companyRepository.js";
import { Helper } from "../utils/helper.js";
import { commonUsecase } from "./commonUsecase.js";

export const companyUsecase = {
    getOne: async (id) => {
        var response = await companyRepository.getOne(id);
        return response
    }
}