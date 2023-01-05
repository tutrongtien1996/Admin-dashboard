import { commonPresenter } from "./commonPresenter.js";
import { userUsecase } from "../usecases/authUsecase.js";
import {validate} from "../utils/validator.js"

const btn_register = document.querySelector(".btn_register");
const btn_login = document.querySelector(".btn_login");
let inputLogin = document.querySelectorAll(".login_form1 .user_pass_login");
let inputRegister = document.querySelectorAll(".register_form .user_pass_register");



function checkValidate(inputElements){
    inputElements.forEach(element => {
        element.onfocus = () => {
            element.parentElement.querySelector("div").style.display = "none"
        }
        element.onblur = () => {
            let errors = validate.validateLogin(element.value)
            if(errors.length > 0){
                let html = "";
                errors.forEach(err => {
                    html += `<span>${err}</span><br>`
                })
                html = html.substring(0, (html.length - 4))
                element.parentElement.querySelector("div").style.display = "block"
                element.parentElement.querySelector("div").innerHTML = html
            }
            else {
                element.parentElement.querySelector("div").style.display = "none"
                element.parentElement.querySelector("div").innerHTML = ""
            }
        }           
    })     
}

if(btn_login){ 
    btn_login.onclick = async () => {        
        if (await userUsecase.processLogin()) {
            window.location.href = '/index.html';
        }
        else {
            commonPresenter.alertFail("User name or Pass is Wrong ")
        }
    }
}
if(btn_register){
    btn_register.onclick = async () =>{
        if (await userUsecase.processRegister()) {
            localStorage.setItem("register", "true")
            window.location.href = '/index.html';
        } else {
            commonPresenter.alertFail("Register failed")
        }
    }
}






checkValidate(inputRegister)
checkValidate(inputLogin)






    
    










