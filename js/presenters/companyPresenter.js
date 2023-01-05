import { API_URL } from "../config/constant.js";
import { companyUsecase } from "../usecases/companyUsecase.js";
import { userUsecase } from "../usecases/userUsecase.js";

function start() { 
    renderCompany()
    renderUser()
   
    // companyUsecase.getOne(getIdCompany())
}
start();
function getIdCompany () {
    let id = JSON.parse(localStorage.getItem('data-login')).company.id;
    return id;
}

function getIdUser () {
    let id = JSON.parse(localStorage.getItem('data-login')).id;
    return id;
}

async function renderCompany(){
    
    let data =  await companyUsecase.getOne(getIdCompany());
    document.querySelector(".company_content .com_name").innerText = data.name
    document.querySelector(".company_content .com_email").innerText = data.email
    document.querySelector(".company_content .com_phone").innerText = data.phone_number
    document.querySelector(".company_content .com_address").innerText = data.address
    document.querySelector("#avatar_company").src = API_URL+'/'+data.logo;

    let ulHtml = '';
    data.users.forEach(user => {
        ulHtml += `<li class="list-group-item d-flex justify-content-between"><h6 class="text-info ">${user.name}</h6>
        <h6>admin</h6>
        <button type="button" class="btn btn-danger p-0" style="height: 20px; font-size: 14px">Del</button>
        </li>`
    });
    document.querySelector('.list_users ul').innerHTML = ulHtml;
    editCompany(data)
}

async function renderUser(){
    let data = await userUsecase.getOne(getIdUser());

    document.querySelector(".userInfo .user_name").innerText = data.name
    document.querySelector(".userInfo .user_username").innerText = data.user_name
    document.querySelector(".userInfo .user_email").innerText = data.email
    document.querySelector(".userInfo .user_phone").innerText = data.phone_number
    // document.querySelector(".userInfo .user_role").innerText = data.role
    editUser (data)
}

function editCompany(company){
    let editElement = document.querySelector(".edit_company");
    editElement.onclick = () => {
        let popup_contai = document.querySelector(".popup_contai");
        popup_contai.style.display = "block";
        let cancelElement = popup_contai.querySelector(".cancel");
        let processElement = popup_contai.querySelector(".process");

        if(cancelElement){
            cancelElement.onclick = () => {
                 popup_contai.style.display = "none";
            }
        }
        let nameElement = popup_contai.querySelector("input[name='name']");
        let emailElement = popup_contai.querySelector("input[name='email']");
        let phoneElement = popup_contai.querySelector("input[name='phone_number']");
        let addressElement = popup_contai.querySelector(".address");
        let logoElement = popup_contai.querySelector("#logo_company");

        nameElement.value = company.name;
        emailElement.value = company.email;
        phoneElement.value = company.phone_number;
        addressElement.value = company.address;
        logoElement.src= API_URL+'/'+company.logo;

        let imgInp = document.querySelector("#inputAvatar");
        imgInp.onchange = evt => {
            const file = evt.target.files[0]
            if (file) {
              document.querySelector("#logo_company").src = URL.createObjectURL(file)
            }
        }

        if(processElement){
            processElement.onclick = async () => {
                let company = {
                    name: nameElement.value ,
                    email: emailElement.value ,
                    phone_number: phoneElement.value ,
                    address: addressElement.value ,
                }
                var formData = new FormData();
                var file = $('#inputAvatar')[0].files[0];
                if (file){
                    formData.append("avatar", file);
                }
                formData.append("name", company.name);
                formData.append("email", company.email);
                formData.append("phone_number", company.phone_number);
                formData.append("address", company.address);
                let result = await userUsecase.updateCompany(getIdCompany(), formData);

                popup_contai.style.display = "none";
                renderCompany()
            }
        }
    }
}

function editUser (user){
    let editElement = document.querySelector(".edit_user");

    editElement.onclick = () => {
        let popup_contai = document.querySelector(".popup_contai_user");
        popup_contai.style.display = "block";
        let cancelElement = popup_contai.querySelector(".cancel");
        let processElement = popup_contai.querySelector(".process");

        if(cancelElement){
            cancelElement.onclick = () => {
                 popup_contai.style.display = "none";
            }
        }

        let nameElement = popup_contai.querySelector("input[name='name']");
        let usernameElement = popup_contai.querySelector("input[name='user_name']");
        let emailElement = popup_contai.querySelector("input[name='email']");
        let phoneElement = popup_contai.querySelector("input[name='phone_number']");

        nameElement.value = user.name;
        usernameElement.value = user.user_name;
        emailElement.value = user.email;
        phoneElement.value = user.phone_number;

        if(processElement){
            processElement.onclick = async () => {
                let user = {
                    name: nameElement.value ,
                    email: emailElement.value ,
                    phone_number: phoneElement.value ,
                    user_name: usernameElement.value ,
                }

                var formData = new FormData();
                formData.append("name", user.name);
                formData.append("email", user.email);
                formData.append("phone_number", user.phone_number);
                formData.append("user_name", user.user_name);
                let result = await userUsecase.updateUser(getIdUser(), formData);
                popup_contai.style.display = "none";
                renderUser()
            }
        }
    }
}

