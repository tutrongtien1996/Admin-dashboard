
    
const Validator = {
    IsEmpty: function (value) {
        if (value == undefined || value.length == 0) {
            return true;
        }
        return false;
    },
    Isspace: function (value){
        if(value.includes(" ")){
            return true;
        }
        return false;
    },

    IsEmail: function (value) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (pattern.test(value)) {
            return true
        }
        return false
    },
    IsPhonenumber: function (value) {
        var pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
        if (pattern.test(value)) {
            return true
        }
        return false
    },
    Maximum: function (value, max) {
        if (value != undefined) {
            if (value.length > max) {
                return false
            }
        }
        return false;
    },

    lessLength: function (value) {
        if (value.length > 15 || value.length < 6){
            return true
        }
        return false
    }
}

export const validate = {
    validateLogin: (input) => {
        var errors = [];
        if (Validator.IsEmpty(input)) {
            errors.push("is required");
        }
        if(Validator.Isspace(input)){
            errors.push("not space");
        }
        if(Validator.lessLength(input)){
            errors.push("Length Min 6 and max charaters");
        }
        return errors
    }
}


// if (Validator.IsEmpty(input.password.value)) {
//     errors.password = "Pass is required";
// }
// if(Validator.Isspace(input.password.value)){
//     errors.password.push("Pass not space");
// }
// if(Validator.lessLength(input.password.value)){
//     errors.password.push("Length pass min 6 and max charaters");
// }