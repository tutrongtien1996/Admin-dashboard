import { userRepository } from "../repositories/userRepository.js";
import { Helper } from "../utils/helper.js";
import { commonUsecase } from "./commonUsecase.js";

export const userUsecase = {
    getOne: async (id) => {
        var response = await userRepository.getOne(id);
        return response
    },

    updateCompany: async (id, formData) => {
        var response = await userRepository.updateCompany(id, formData);
        return response
    },

    updateUser: async (id, formData) => {
        var response = await userRepository.updateUser(id, formData);
        return response
    }
}