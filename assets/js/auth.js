const container = document.querySelector(".container");
const pwShowhide = document.querySelectorAll(".showHidePw");
const pwFields = document.querySelectorAll(".password");
const signUp = document.querySelector(".signup-text");
const login = document.querySelector(".login-link");

// js code to show hide password and change icon

pwShowhide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if(pwField.type === "password"){
                pwField.type = "text"

                pwShowhide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye")
                })
            }
            else {
                pwField.type = "password";
                pwShowhide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash")
                })
            }
        })
    })
})

// js code to appear signup and login

signUp.onclick = () => {
    container.classList.add("active");
}
login.onclick = () => {
    container.classList.remove("active");
}