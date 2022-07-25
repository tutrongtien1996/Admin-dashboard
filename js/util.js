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
        return Util.formatDate(today);
    },

    formatDate: (date) => {
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); 
        var yyyy = date.getFullYear();
        return  yyyy+'-'+mm+'-'+dd;
    },
    FormatVNDate: (date) => {
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); 
        var yyyy = date.getFullYear();
        return  dd+'/'+mm+'/'+yyyy;
    }
}