import { authRepository } from "../repositories/authRepository.js";
export const userUsecase = {

    

    processLogin: async () => {
        var username = document.querySelector('input[name="username"]').value;
        var password = document.querySelector('input[name="password"]').value;
        
        var input = {
            user_name: username,
            password: password        
        };
        var response = await authRepository.login(input);
        if (response.success) {
            localStorage.setItem("data-login", JSON.stringify(response.data))
            localStorage.setItem("access_token", response.data.token);
            return true
        }
        return false
    },

    processRegister: async () => {
        var username = document.querySelector('input[name="register_username"]').value;
        var password = document.querySelector('input[name="register_password"]').value;
        
        var input = {
            user_name: username,
            password: password        
        };
        const response = await authRepository.register(input)
        if (response.success) {
            localStorage.setItem("data-login", JSON.stringify(response.data))
            localStorage.setItem("access_token", response.data.token);
            return true
        }
        return false
    }
    
}