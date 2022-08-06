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
    displayProducts(renderListProduct)
}
start();

function displayProducts(callback){
    var productsLocal = localStorage.getItem('products');
    var listProducts = JSON.parse(productsLocal);
    console.log(listProducts)
    callback(listProducts)
}


function renderListProduct(listProducts){
    var html = "";
    listProducts.forEach(element => {
        var productEntity = new Product();
        var item = productEntity.parseFromJson(element);
        console.log(renderImage(item.image));
        html += `<li class="item">
                <div data-product='${item.toJson()}'>
                    ${renderImage(item.image)}
                    <h3>${item.name}</h3>
                    <h4>${Util.formatNumber(item.price)}đ / kg</span></h4>
                    </div>
                </li>`
        });
    document.getElementsByClassName("listProducts")[0].innerHTML = html;
    getListItemProduct();

    // document.getElementsByClassName('listProducts').innerHTML = html;
}
function renderImage(image) {
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

function checkInputQuantity(productQuantity,  quantityValue){
    productQuantity.value = quantityValue;
    order.products.forEach((product, index) => {
    if(product.id == productItem.getAttribute("data-product-id")){
        order.products[index].quantity = Number(quantity.target.value);
        }
    })
    handleTotal();
}

function initOnchangeProducts(productItems){
    productItems.forEach(productItem => {
        var productQuantity = productItem.querySelector(".content_item .item_quantity input");
        productQuantity.onchange = quantity => {
            
            if(quantity.target.value > 0){
                var quantityValue = quantity.target.value;
                checkInputQuantity(productQuantity, quantityValue);
            }  
            else {
                alert("Vui lòng nhập giá trị lớn hơn 0");
                checkInputQuantity(productQuantity, 1)     
            }
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


function createOrders() {
    axios.post(API_URL + '/source/api_orders/create', order, option)
        .then((response) => {
            initOrder();
            document.getElementsByClassName("listCustomers")[0].innerHTML = '';
            document.querySelector(".recentCustomers .total .order_total").innerHTML = '';
            alert("Đã tạo đơn hàng!")
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
        createOrders()
    }
}

function handleDeleteDataOrder(){
    var deleteOrder = document.querySelector(".recentCustomers .delete");

    deleteOrder.onclick = function(){
        initOrder();
        document.getElementsByClassName("listCustomers")[0].innerHTML = '';
        document.querySelector(".recentCustomers .total .order_total").innerHTML = '';
    }
}
handleDeleteDataOrder();

