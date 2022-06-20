var Product = function(id = '', name = '', price = 0, image = null) {
    this.id = id
    this.name = name
    if (typeof price == 'string') {
        this.price = parseFloat(price).toFixed(0)
    } else {
        this.price = price.toFixed(0)
    }
    if (this.image != "") {
        this.image = "http://localhost/opensourcepos/public/"+image+".jpg"
    } else {
        this.image = null
    }
    this.toJson = function() {
        return JSON.stringify(this)
    }
}
Product.prototype.parseFromAPI = function (dataFormAPI) {
    var listProducts = [];
    dataFormAPI.forEach(element => {
        listProducts.push(new Product(element.value, element.label, element.unit_price, element.pic_filename))
    });
    return listProducts
}