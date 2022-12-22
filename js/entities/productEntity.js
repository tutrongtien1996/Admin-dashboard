import { API_URL } from "../config/constant.js"

export var ProductEntity = function(id = '', name = '', price = 0, image = null) {
    this.id = id
    this.name = name
    if (typeof price == 'string') {
        this.price = parseFloat(price).toFixed(0)
    } else {
        this.price = price.toFixed(0)
    }
    this.image = image
    if (this.image == null) {
        this.image = "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
    } else {
        this.image = API_URL +"/"+ image;
    }
    this.toJson = function() {
        return JSON.stringify(this)
    }
}

export const ProductEntityFromJson = function (objectData) {
    return new ProductEntity(objectData.id, objectData.name, objectData.price, objectData.image)
}
export const ProductEntityFromList =  function (dataFormAPI) {
    var listProducts = [];
    dataFormAPI.forEach(element => {
        listProducts.push(ProductEntityFromJson(element))
    });
    return listProducts
} 