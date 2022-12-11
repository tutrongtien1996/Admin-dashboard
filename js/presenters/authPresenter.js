import { commonPresenter } from "./commonPresenter.js";
import { userUsecase } from "../usecases/authUsecase.js"

const btn_register = document.querySelector(".btn_register");
const btn_login = document.querySelector(".btn_login");
if(btn_login){
    btn_login.onclick = async () => {
        if (await userUsecase.processLogin()) {
            window.location.href = '/index.html';
        } else {
            commonPresenter.alertFail("Login failed")
        }
    }
}

if(btn_register){
    btn_register.onclick = async () =>{
        if (await userUsecase.processRegister()) {
            window.location.href = '/index.html';
        } else {
            commonPresenter.alertFail("Register failed")
        }
    }
}






