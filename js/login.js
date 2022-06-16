const API_URL = 'http://localhost/opensourcepos';
async function login(event) {
    event.preventDefault();
    if (await processLogin()) {
        window.location.href = 'index.html';
    } else {
        document.getElementById("error").innerHTML = "Login failed";
    }
}

async function processLogin() {
    var companyCode = document.querySelector('input[name="company_code"]').value;
    var username = document.querySelector('input[name="username"]').value;
    var password = document.querySelector('input[name="password"]').value;
    
    var input = {
        company_code: companyCode,
        username: username,
        password: password        
    };
    const response = await fetch(API_URL+"/public/source/login", {
        method: "POST",
        headers: {
            // 'Authorization': "Bearer ____TOKEN____",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    })
    const result = await response.json()
    if (result.success) {
        localStorage.setItem("access_token", result.data.token);
        return true
    }
    return false
}