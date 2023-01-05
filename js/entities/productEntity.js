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
    this.toHTMLTable = function() {
        return `<tr>
            <td>
                <div><img src="${this.image}" alt="product name" onerror="this.onerror=null;this.src='/img/placeholder.png';"></div>
            </td>
            <td>${this.name}</td>
            <td>${Util.formatNumber(this.price)}VND</td>
            <td class="data-set" data-product='${this.toJson()}'>
                <span class="status delivered viewBtn">View</span>
                <span class="status PENDING editBtn">Edit</span>
                <span class="status return">Del</span>
            </td>
        </tr>`
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