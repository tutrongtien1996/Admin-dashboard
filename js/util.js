var Util = {
    formatNumber: (value) => {
        var newValue = parseFloat(value);
        if (newValue != NaN) {
            
            if (typeof newValue == "number" && newValue.toString() != "NaN") {
                return newValue.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        }
        return value
    },
    getCurrentDay: () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = yyyy+'-'+mm+'-'+dd;
        return today
    }
}