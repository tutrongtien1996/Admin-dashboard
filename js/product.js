var order = {}

function initOrder() {
    order = {
        total: 0,
        customer: {
            name: "",
            phone_number: "",
            id: ""
        },
        products: []
    }
}


function start(){
    initOrder();
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
            handleTotal();
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
        var tong = product.quantity * product.price;
        html += `<li class="item"  data-product-id="${product.id}">
            <div class="content_item">
                <div class="item_name" ><span >${product.name}</span></br>
                <span class="item_price" data-product-price="${product.price}">${Util.formatNumber(product.price)}đ</span>
                </div>
                
                <div class="item_quantity"><input type="number"  value="${product.quantity}"></div>
                <span class="item_price" data-product-tong="${tong}">${Util.formatNumber(tong)}đ</span>
            </div>
        </li>`
        document.getElementsByClassName("listCustomers")[0].innerHTML = html;
       
    })
    var productItems = document.querySelectorAll(".listCustomers .item");
    initOnchangeProducts(productItems);  
    handleCreateDataOrder(productItems)
}


function initOnchangeProducts(productItems){
   
    productItems.forEach(productItem => {
        var productQuantity = productItem.querySelector(".content_item .item_quantity input");
        productQuantity.onchange = quantity => {
            productQuantity.value = quantity.target.value;
            order.products.forEach((product, index) => {
                if(product.id == productItem.getAttribute("data-product-id")){
                    order.products[index].quantity = Number(quantity.target.value);
                }
            })
            handleTotal();
        }
    }) 
}

function handleTotal(){
    order.total = 0;
    order.products.forEach(product => {
        order.total += product.quantity * product.price;
    })
    var html = `<h3 style="color: orange">${Util.formatNumber(order.total)}đ</h3>`;
    document.querySelector(".recentCustomers .total .order_total").innerHTML = html
}


//tao ham post order product
// function createOrders(order){
//     var options = {
//         method: "post",
//         headers: {
//             'Authorization': "Bearer "+localStorage.getItem('access_token'),
//             'Content-Type': "application/json"
//         },
//         body: JSON.stringify(order)
//     }
//     fetch(API_URL+'/public/source/api_orders/create', options)
//         .then(function (response) {
         
//         return response.json();
//         })
//         .then(function(){
//             alert("Tạo đơn thànhh công!")
//         })
//         .catch(function (error) {
//         console.log(error);
//         });
// }

function createOrders() {
    axios.post(API_URL + '/public/source/api_orders/create', order, option)
        .then((reponse) => {
            alert("Tạo đơn thànhh công!")
        })
        .catch(function (error) {
            console.log(error)
        })
}

function handleCreateDataOrder(){
    var createOder = document.querySelector(".recentCustomers #btn");
    createOder.onclick = function(){
        order.customer.name = document.querySelector(".recentCustomers .search .name_customer").value;
        order.customer.phone_number = document.querySelector(".recentCustomers .search .phone_number").value;
        console.log(order)
        createOrders()
    }
    
}

function handleDeleteDataOrder(){
    var deleteOrder = document.querySelector(".recentCustomers .delete");

    deleteOrder.onclick = function(){
        initOrder();
        document.getElementsByClassName("listCustomers")[0].innerHTML = '';

    }
}
handleDeleteDataOrder();
