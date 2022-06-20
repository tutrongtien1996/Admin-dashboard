var Util = {
    formatNumber: (value) => {
        var newValue = parseFloat(value);
        if (newValue != NaN) {
            
            if (typeof newValue == "number" && newValue.toString() != "NaN") {
                return newValue.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        }
        return value
     }
}