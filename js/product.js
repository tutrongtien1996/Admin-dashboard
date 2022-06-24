

// 

var option = {
    headers: {
        'Authorization': "Bearer "+localStorage.getItem('access_token')
    }
};

var order = {
    total: 0,
    customer: {
        name: "",
        phone_number: ""
    },
    products: []
}
var total = [];
var totalPrice = 0;


function start(){
    getListProduct(renderListProduct)
}
start();

function getListProduct(callback){
    axios.get(API_URL + '/public/source/api_items', option)
        .then((reponse) => {
            var productEntity = new Product();
            var listProducts = productEntity.parseFromAPI(reponse.data.data)
            callback(listProducts)
        })
        .catch(function (error) {
            console.log(error)
        })
}


function renderListProduct(listProducts){
    var html = "";
    listProducts.forEach(element => {

        html += `<li class="item">
                <div data-product='${element.toJson()}'>
                    ${renderImage(element.image)}
                    <h3>${element.name}</h3>
                    <h4>${Util.formatNumber(element.price)}đ / kg</span></h4>
                    </div>
                </li>`
        });
    document.getElementsByClassName("listProducts")[0].innerHTML = html;
    getListItemProduct()

    // document.getElementsByClassName('listProducts').innerHTML = html;
}
const renderImage = (image) => {
    if (image != "") {
       return `<img src="${image}" onerror="this.src='/img/products/quan_ao_thong_thuong.jpeg'"/>`;
    } 
    return `<img src="/img/products/quan_ao_thong_thuong.jpeg"/>`;

}
function getListItemProduct(){
    var listItems = document.querySelectorAll(".listProducts .item div");
    initOnclickProducts(listItems);
}


function initOnclickProducts(listItems){
    var html = "";
    listItems.forEach(item => {
        item.onclick = () =>{
            var product = JSON.parse(item.dataset.product); 
            if(order.products.length == 0){
                product.quantity = 1;
                order.products.push(product);
            }
            else if(!checkIfProductIxist(product)){
                product.quantity = 1;
                order.products.push(product);
            }
            else{
                order.products.forEach((item, index) => {
                    if(item.id == product.id){
                        order.products[index].quantity += 1;
                    }
                })
            }
            showOrder(html);
        }  
    });    
}

function checkIfProductIxist(product){
    var daTonTai = false;
    order.products.forEach(item => {
        if(item.id == product.id){
            daTonTai = true;
        }
    })
    return daTonTai
};

function showOrder(html){
    order.products.forEach(product => {
        html += `<li class="item">
            <div class="content_item">
                <span class="item_name">${product.name}</span>
                <div class="item_quantity"><input type="number" data-product-id="${product.id}" value="${product.quantity}"></div>
                <span class="item_price">${product.price}</span>
            </div>
        </li>`
        document.getElementsByClassName("listCustomers")[0].innerHTML = html;
        var productQuantitys = document.querySelectorAll(".item .content_item .item_quantity input");
        initOnchangeProducts(productQuantitys, order.products);
        totalPrice += product.quantity * product.price;
        console.log(totalPrice);
        getProductQuantitys(product.quantity, product.price)   
    })
}


function initOnchangeProducts(productQuantitys, products){
    productQuantitys.forEach(productQuantity => {
        productQuantity.onchange = quantity => {
            productQuantity.value = quantity.target.value;
            products.forEach(product => {
                if(product.id == productQuantity.getAttribute("data-product-id")){
                    product.quantity = Number(quantity.target.value);
                }
            })
        }
    })
}

function getProductQuantitys(quantity, price){
    handleTotal(quantity, price)
}

function handleTotal(quantity, price){
}