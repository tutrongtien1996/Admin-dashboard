function Validator(options){
    var formElement = document.querySelector(options.form)
    if(formElement){
        options.rules.forEach(rule => {
            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement){
                var errorElement = inputElement.parentElement.querySelector(".form_message");
                inputElement.onblur = () => {
                    var errorMessage = rule.test(inputElement.value);
                    if(errorMessage) {
                        errorElement.innerText = errorMessage}
                    else{
                        errorElement.innerText = '';
                    }
                }
            }
        });
    }
}


Validator.isRequired = function(selector){
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : "user name not empty!"
        }
    }
}


Validator.isEmail = function(selector){
    return {
        selector: selector,
        test: function () {
            
        }
    }
}