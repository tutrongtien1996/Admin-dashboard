var Util = {
    formatNumber: (value) => {
        value = parseFloat(value);
        return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
     }
}