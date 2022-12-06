
var customElement = document.querySelector('.payment_info .customer_name input[name="customer"]')
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

var option = {
    headers: {
        'Authorization': "Bearer "+localStorage.getItem('access_token')
    }
};

var customer = {}


function initCustomer() {
    customer = {
        name: "",
        phone_number: "",
        address: ""
    }
}

function start(){
    initCustomer();
    getCustomer();
    initOrder();
    getListProducts(renderListProduct)
   
}
start();


function getListProducts (callback) {
    axios.get(API_URL + "/admin/products", option)
    .then((response) => {
        callback(response.data.data.results)
    })
    .catch((err) => {
        if (err) throw err
    })
}

function renderListProduct(data){
    var list_products = document.getElementsByClassName("listProducts")[0];

    let html = "";
    data.forEach(product => {
        product.image = API_URL +"/"+ product.image;
        const mydata = JSON.stringify(product);
        html += `<li class="item">
                    <div class="content" data-product='${mydata}'>
                        <div class="img"><img src="${product.image}"/></div>
                        <div class="name_price">
                            <h3>${product.name}</h3>
                            <h4>${Util.formatNumber(product.price)}</span></h4>
                        </div>
                    </div>
                </li>`
    })
    list_products.innerHTML = html;
    getListItemProduct();
}

function getListItemProduct(){
    var listElements = document.querySelectorAll(".listProducts .item .content");
    if (listElements){
        initOnclickProducts(listElements);
    }
}

function initOnclickProducts(listElements){
    var html = "";
    listElements.forEach(element => {
        element.onclick = () =>{
            var product = JSON.parse(element.dataset.product); 
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
    if(order.products){
        var productElements = document.querySelector(".content_order .cart_items .items");
        order.products.forEach(product => {
            html = `<div class="item_product" data_product_id="${product.id}">
                        <div class="left">
                            <img src="${product.image}" alt="product name">

                        </div>
                        <div class="center">
                            <p class="name">${product.name}</p>
                            <p class="price">${Util.formatNumber(product.price)}</p>
                        </div>
                        <div class="right">
                            <button class="plus_minus minus">-</button>
                            <button class="number">${product.quantity}</button>
                            <button class="plus_minus plus">+</button>
                        </div>
                    </div>` + html
            productElements.innerHTML = html;
        })
        initOnchangeProducts(productElements);  
        handleCreateDataOrder()
    }
}

function handleTotal(){
    order.total = 0;
    order.products.forEach((product, index) => {
        order.products[index].quantity = product.quantity;
        order.total += product.quantity * product.price;
    })
    var html = `<div class="price_total" style="color: orange">${Util.formatNumber(order.total)}</div>`;
    document.querySelector(".content_order .price_total").innerHTML = html
}

function initOnchangeProducts(productElements){
    var elements = productElements.querySelectorAll(".item_product");

    elements.forEach(item => {
        var plus_minusElements = item.querySelectorAll(".plus_minus")
        plus_minusElements.forEach((btn, btnIndex) => {
            btn.onclick = () => {
                order.products.forEach((product, index) => {
                    if(product.id == item.getAttribute("data_product_id")){
                        if(btnIndex == 1){
                            order.products[index].quantity += 1
                        }
                        else {order.products[index].quantity -= 1}
                        var numberElement = btn.parentElement.querySelector(".number");
                        numberElement.innerText = order.products[index].quantity
                    }
                    handleTotal()
                })
            }
        })
       
    }) 
}

function handleCreateDataOrder(){
    var createOder = document.querySelector(".container_order #submit_data");
    createOder.onclick = () => {
        order.customer.name = document.querySelector(".recentCustomers .payment_info .customer_name input").value;
        document.querySelector(".container_popup").style.display = "block"
        create_bill();
    }
}

function getCustomer() {
    
    let addBtn = document.querySelector(".payment_info .customer_name .add");
    addBtn.onclick = () => {
    let container_popup_elememt = document.querySelector(".container_popup");
    let content_popup_element = document.querySelector(".popup_content");
    content_popup_element.classList.add("edit")

    content_popup_element.innerHTML = getPopup(customer_popup.edit);
    container_popup_elememt.style.display = "block"
    
    document.querySelector('input[name="name_edit"]').value = customElement.value
    let create_popup_element = document.querySelector(".popup_content .proccess");

    let cancel_popup_element = document.querySelector(".popup_content .cancel");
    create_popup_element.onclick = () => {
        customer.name = document.querySelector('input[name="name_edit"]').value;
        customer.phone_number = document.querySelector('input[name="phone_number_edit"]').value;
        customer.address = document.querySelector('#address_edit').value;

        axios.post(API_URL + '/admin/customers', customer, option)
        .then((response) => {
            content_popup_element.classList.remove("edit")
            container_popup_elememt.style.display = "none"
            content_popup_element.innerHTML = ""
            
            customElement.setAttribute("customer_id", response.data.data.id)
            customElement.value = response.data.data.name;        
        })
        .catch((err) => {
            console.log(err)
        })

    }
    cancel_popup_element.onclick = () => {
        content_popup_element.classList.remove("edit")
        content_popup_element.innerHTML = ""
        container_popup_elememt.style.display = "none"
    }
    }
}

function createOrders() {

        axios.post(API_URL + '/admin/orders/', order, option)
            .then((response) => {
                initOrder();
                document.querySelector(".content_order .cart_items .items").innerHTML = '';
                document.querySelector(".payment_info .price_total").innerHTML = '';
                document.querySelector(".customer_name input").value = '';

                alert("Order creation successful!")

            })
            .catch(function (error) {
                console.log(error)
            })
    }

function create_bill() {
    document.querySelector(".popup_content").innerHTML = getPopup(cart_popup);
    order.date = formatDate(new Date())
    order.code = "com-" + Math.floor(Math.random() * 1000000);
    var table = "";
    order.products.forEach((element, index) => {
        table += `<tr>
                    <td>${index + 1}</td>
                    <td><p>${element.name}</p><span>${Util.formatNumber(element.price)}</span></td>
                    <td>${element.quantity}</td>
                    <td>${Util.formatNumber(element.quantity * element.price)}</td>
                </tr>`
    })
    document.querySelector(".popup_content .customer_bill h5:nth-child(2)").innerText = order.customer.name;
    document.querySelector(".popup_content .number_bill p:nth-child(2)").innerText = order.date;
    document.querySelector(".popup_content .number_bill p:nth-child(1)").innerText = order.code;
    document.querySelector(".popup_content  tbody").innerHTML = table;
    document.querySelector(".popup_content .total_bill .total h3:nth-child(2)").innerText = Util.formatNumber(order.total);
    var cancel = document.querySelector(".popup_content .cancel");
    cancel.onclick = () => {
        document.querySelector(".container_popup").style.display = "none"
    }
    let proceed = document.querySelector(".proceed");
    proceed.onclick = () => {
    
        order.customer.id = customElement.getAttribute("customer_id")
        createOrders()
        document.querySelector(".container_popup").style.display = "none"
    }
}
let trash = document.querySelector(".trash")

trash.onclick = () => {
    initOrder();
    document.querySelector(".content_order .cart_items .items").innerHTML = '';
    document.querySelector(".payment_info .price_total").innerHTML = '';
    document.querySelector(".customer_name input").value = '';
}
