var API_URL = "http://157.230.253.55:8080"

const btn_register = document.querySelector(".btn_register");
const btn_login = document.querySelector(".btn_login");
if(btn_login){
    btn_login.onclick = async () =>{
        processLogin()
        if (await processLogin()) {
            window.location.href = '/index.html';
        } else {
            alert("Login failed");
        }
    }
}

if(btn_register){
    btn_register.onclick = async () =>{
        processRegister()
        if (await processRegister()) {
            window.location.href = '/index.html';
        } else {
            alert("register fail");
        }
    }
}


async function processLogin() {
    var username = document.querySelector('input[name="username"]').value;
    var password = document.querySelector('input[name="password"]').value;
    
    var input = {
        user_name: username,
        password: password        
    };
   
    const response = await axios.post(API_URL+"/admin/login", input)
                    .then(function (response) {
                        return response.data;
                    })
                    .catch(function (error) {
                        return error
                    });
    
    if (response.success) {
        localStorage.setItem("access_token", response.data.token);
        return true
    }
    return false
}

async function processRegister() {
    var username = document.querySelector('input[name="register_username"]').value;
    var password = document.querySelector('input[name="register_password"]').value;
    
    var input = {
        user_name: username,
        password: password        
    };
    console.log(input)
    const response = await axios.post(API_URL+"/admin/register", input)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error
        });
    
    if (response.success) {
        console.log(response.data.token)
        localStorage.setItem("access_token", response.data.token);
        return true
    }
    return false
}






