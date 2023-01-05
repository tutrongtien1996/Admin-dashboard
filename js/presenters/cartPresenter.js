import { API_URL } from "../config/constant.js";
import { cartUsecase } from "../usecases/cartUsecase.js";
import { productUsecase } from "../usecases/productUsecase.js";
import { Helper } from "../utils/helper.js";


var customElement = document.querySelector('.payment_info .customer_name input[name="customer"]');

var customer = {}
var productList = {
    items: [],
    set: function(data) {
        productList.items = data;
    },
    get: function(keyword) {
        if(productList.items){
            return productList.items.filter( (item) => {
                return item.name.toLowerCase().includes(keyword.toLowerCase())
            })
        }
        
    }
}
var customerList = {
    items: [],
    set: function(data) {
        customerList.items = data;
    },
    get: function(keyword) {
        return customerList.items.filter( (item) => {
            return item.name.toLowerCase().includes(keyword.toLowerCase())
        })
    }
}

function initCustomer() {
    customer = {
        name: "",
        phone_number: "",
        address: ""
    }
}

async function start(){
    initCustomer();
    Helper.setFilter();
    getCustomer();
    cartUsecase.initOrder();
    productUsecase.list((data) => {
        productList.set(data);
        renderListProduct(productList.get(""))
    });
    cartUsecase.getListPayment().then((res) => {
        if (res) {
            rederListPayment(res)
        }
    })
    cartUsecase.getListCustomer().then((res) => {
        if (res) {
            customerList.set(res.results)
        }
    })
    searchCustomer();
    searchProduct();
    let cart_iphone_quantity = document.querySelector(".cart_iphone .quantity");
    if(cart_iphone_quantity){
        cart_iphone_quantity.onclick = () => {
            document.querySelector(".container_order").classList.add("contai_order_iphone");
            document.querySelector("#show_hide").classList.add("bottom_cart_iphone")
        }
    }
    if(document.querySelector("#show_hide")){
        document.querySelector("#show_hide").onclick = () => {
            document.querySelector("#show_hide").classList.remove("bottom_cart_iphone")
            document.querySelector(".container_order").classList.remove("contai_order_iphone");
        }
    }
    
    
}
start();

function checkQuantityOrder () {
    let numberQuanElement = document.querySelector(".content_order .cart_items .top_icon .cart_quantity  span");
    var numberQuantity = 0;
    cartUsecase.order.products.forEach(item => {
        numberQuantity += Number(item.quantity);
    })
    if(numberQuantity <= 0)
    {
        document.querySelector(".container_order #submit_data").style.background = "rgb(194, 195, 196)"
        document.querySelector(".empty_cart").style.display = "block";
        document.querySelector(".container_order").classList.remove("contai_order_iphone");
        document.querySelector("#cart_iphone").classList.remove("bottom_cart_iphone");
        document.querySelector("#show_hide").classList.remove("bottom_cart_iphone")

    }
    if(numberQuantity > 0){
        document.querySelector(".container_order #submit_data").style.background = "#00bcd4"
    }
    numberQuanElement.innerText = Math.floor(numberQuantity);

    
    let cart_iphone_quantity = document.querySelector("#quantity_iphone");
    cart_iphone_quantity.innerHTML = Math.floor(numberQuantity);
}

function searchProduct() {
    let search_element = document.querySelector("input[name='search_name']");
    search_element.onkeyup = () => {
        renderListProduct(productList.get(search_element.value))
    }
}

function  searchCustomer (){
    customElement.onkeyup = () => {
        let data_name = customerList.get(customElement.value)
        if(data_name){
            let html = ""
            data_name.forEach(custom => {
                html += `<li cus_id = ${custom.id}>${custom.name}</li>`
            })
            document.querySelector('.payment_info .customer_name .list_customer').style.display = "block";
            document.querySelector("#cart_iphone").classList.add("bottom_cart_iphone");
            document.querySelector('.payment_info .customer_name .list_customer ul').innerHTML = html;
        }
        let custom_name_list = document.querySelectorAll(".payment_info .customer_name .list_customer ul li");
        if(custom_name_list){
            custom_name_list.forEach((cus) => {
                cus.onmousedown = () => {
                    customElement.value = cus.innerText
                    customElement.setAttribute("customer_id", cus.getAttribute("cus_id"))
                }
            })
        }
        
    }
    customElement.onblur = () => {
    document.querySelector('.payment_info .customer_name .list_customer').style.display = "none";
    }
}


function rederListPayment(data) {
    let html = "";
    let paymentContainer = document.querySelector('.content_order .payment_info .customer_name.pay_status .pay')
    if(data){
        data.forEach(item => {
            html += `<option value="${item.id}">${item.name}</option>`
        })
    }
    paymentContainer.innerHTML = html;
}


function renderListProduct(data){
    var list_products = document.getElementsByClassName("listProducts")[0];
    let html = "";
    if(data){
        data.forEach(product => {
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
    }
    
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
            Helper.playSound();
            document.querySelector(".container_order #submit_data").style.background = "#00bcd4"
            document.querySelector(".empty_cart").style.display = "none"
            var product = JSON.parse(element.dataset.product); 
            if(cartUsecase.order.products.length == 0){
                product.quantity = 1;
                cartUsecase.order.products.push(product);
            }
            else if(!checkIfProductIxist(product)){
                product.quantity = 1;
                cartUsecase.order.products.push(product);
            }
            else{
                cartUsecase.order.products.forEach((item, index) => {
                    if(item.id == product.id){
                        cartUsecase.order.products[index].quantity += 1;
                    }
                })
            }
            showOrder(html);
            checkQuantityOrder();
            handleTotal();
        }  
    });    
}

function checkIfProductIxist(product){
    var daTonTai = false;
    cartUsecase.order.products.forEach(item => {
        if(item.id == product.id){
            daTonTai = true;
        }
    })
    return daTonTai
};

function showOrder(html){
    
    if(cartUsecase.order.products){
        var productElements = document.querySelector(".content_order .cart_items .items");
        cartUsecase.order.products.forEach(product => {
            if(product.quantity > 0){
                html = `<div class="item_product" data_product_id="${product.id}">
                <div class="left">
                    <img src="${product.image}" alt="product name">

                </div>
                <div class="center_custom">
                    <p class="name">${product.name}</p>
                    <p class="price">${Util.formatNumber(product.price)}</p>
                </div>
                <div class="right">
                    <button class="plus_minus minus">-</button>
                    <input type="text" class="number number_quantity" id = "" value="${product.quantity}">
                    <button class="plus_minus plus">+</button>
                </div>
            </div>` + html
            productElements.innerHTML = html;
            }
            
        })
        initOnchangeProducts(productElements);  
        handleCreateDataOrder()
    }
    
}



function handleTotal(){
    cartUsecase.order.total = 0;
    cartUsecase.order.products.forEach((product, index) => {
        cartUsecase.order.products[index].quantity = product.quantity;
        cartUsecase.order.total += product.quantity * product.price;
    })
    var html = `<div class="price_total" style="color: orange">${Util.formatNumber(cartUsecase.order.total)}</div>`;
    document.querySelector(".content_order .price_total").innerHTML = html

    let iphone_total = document.querySelector(".cart_iphone .total_iphone #total_iphone");
    iphone_total.innerText = Util.formatNumber(cartUsecase.order.total);
}

function initOnchangeProducts(productElements){
    var elements = productElements.querySelectorAll(".item_product");
    

    elements.forEach(item => {
        var numberQuantityElement = item.querySelector(".number_quantity");
        numberQuantityElement.onchange = () => {
            cartUsecase.order.products.forEach((product, index) => {
                if(Number(numberQuantityElement.value) && Number(numberQuantityElement.value) > 0){
                        if(product.id == item.getAttribute("data_product_id")){
                            cartUsecase.order.products[index].quantity = numberQuantityElement.value;
                        }
                        
                    handleTotal()
                } 

                else {
                    cartUsecase.order.products = cartUsecase.order.products.filter(item => item !== cartUsecase.order.products[index])

                    handleTotal()
                    item.remove()
                } 
            }) 
            checkQuantityOrder();
            handleCreateDataOrder()
        }
        
        var plus_minusElements = item.querySelectorAll(".plus_minus")
        plus_minusElements.forEach((btn, btnIndex) => {
            btn.onclick = () => {
                Helper.playSound();
                cartUsecase.order.products.forEach((product, index) => {
                    if(product.id == item.getAttribute("data_product_id")){
                        cartUsecase.order.products[index].quantity = Number(cartUsecase.order.products[index].quantity);
                        if(btnIndex == 1){
                            cartUsecase.order.products[index].quantity += 1
                        }
                        if(btnIndex == 0){
                            cartUsecase.order.products[index].quantity -= 1  
                        }
                        if(cartUsecase.order.products[index].quantity <= 0){
                            cartUsecase.order.products = cartUsecase.order.products.filter(item => item !== cartUsecase.order.products[index])
                            handleTotal()
                            item.remove()
                        }
                        handleCreateDataOrder()
                        var numberElement = btn.parentElement.querySelector(".number");
                        if (cartUsecase.order.products[index]) {
                            numberElement.value = cartUsecase.order.products[index].quantity  
                        } 
                    }
                    checkQuantityOrder();
                    handleTotal()
                })
            }
        })
       
        
       
    }) 
}



function handleCreateDataOrder(){
    var createOder = document.querySelector(".container_order #submit_data");
    if(cartUsecase.order.products.length == 0){
    document.querySelector(".container_order #submit_data").disabled = true;
    document.querySelector(".top_icon").style.display = "none";
    
    }
    else {
        document.querySelector("#cart_iphone").classList.add("bottom_cart_iphone");
        document.querySelector(".top_icon").style.display = "grid"
        document.querySelector(".container_order #submit_data").disabled = false;
        
        
        createOder.onclick = () => {
            Helper.playSound();
            cartUsecase.order.discount = document.querySelector(".payment_info .discount .cash input").value;
            cartUsecase.order.status = document.querySelector("select#status_payment").value;
            console.log(cartUsecase.order.status)
            cartUsecase.order.payment_id =  document.querySelector('.content_order .payment_info .customer_name.pay_status .pay').value
            cartUsecase.order.customer.name = document.querySelector(".recentCustomers .payment_info .customer_name input").value;
            document.querySelector(".container_popup").style.display = "block"
            create_bill();
        }
    }
    
}

function getCustomer() {
    
    let addBtn = document.querySelector(".payment_info .customer_name .add");
    addBtn.onclick = () => {
    Helper.playSound();
    let container_popup_elememt = document.querySelector(".container_popup");
    let content_popup_element = document.querySelector(".popup_content");
    content_popup_element.classList.add("edit")

    content_popup_element.innerHTML = getPopup(customer_popup.edit);
    container_popup_elememt.style.display = "block"
    
    document.querySelector('input[name="name_edit"]').value = customElement.value
    let create_popup_element = document.querySelector(".popup_content .proccess");

    let cancel_popup_element = document.querySelector(".popup_content .cancel");
    create_popup_element.onclick = () => {
        Helper.playSound();
        customer.name = document.querySelector('input[name="name_edit"]').value;
        customer.phone_number = document.querySelector('input[name="phone_number_edit"]').value;
        customer.address = document.querySelector('#address_edit').value;

        axios.post(API_URL + '/admin/customers', customer, Helper.requestOption)
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
        Helper.errorSound();
        content_popup_element.classList.remove("edit")
        content_popup_element.innerHTML = ""
        container_popup_elememt.style.display = "none"
    }
    }
}

function createOrders() {

        axios.post(API_URL + '/admin/orders/', cartUsecase.order, Helper.requestOption)
            .then((response) => {
                cartUsecase.initOrder();
                initEmpty()
                // document.querySelector(".content_order .cart_items .items").innerHTML = '';
                // document.querySelector(".payment_info .price_total").innerHTML = '';
                // document.querySelector(".customer_name input").value = '';
                // document.querySelector("#status_payment .selected").setAttribute('selected','selected')
                // document.querySelector(".top_icon").style.display = "none";
                
                // document.querySelector(".container_order #submit_data").style.background = "#00bcd4"
                // document.querySelector(".empty_cart").style.display = "block";
                document.querySelector(".container_order").classList.remove("contai_order_iphone");
                document.querySelector("#cart_iphone").classList.remove("bottom_cart_iphone");
                document.querySelector("#show_hide").classList.remove("bottom_cart_iphone")


            })
            .catch(function (error) {
                console.log(error)
            })
    }

function create_bill() {
    document.querySelector(".popup_content").innerHTML = getPopup(cart_popup);
    cartUsecase.order.date = formatDate(new Date())
    var table = "";
    cartUsecase.order.products.forEach((element, index) => {
        table += `<tr>
                    <td>${index + 1}</td>
                    <td><p>${element.name}</p><span>${Util.formatNumber(element.price)}</span></td>
                    <td>${element.quantity}</td>
                    <td>${Util.formatNumber(element.quantity * element.price)}</td>
                </tr>`
    })
    document.querySelector(".popup_content .company_info h2").innerText = JSON.parse(localStorage.getItem("data-login")).company.name;
    document.querySelector(".popup_content .company_info p").innerText = JSON.parse(localStorage.getItem("data-login")).company.phone_number;
    document.querySelector(".popup_content .customer_bill h6:nth-child(2)").innerText = cartUsecase.order.customer.name;
    document.querySelector(".popup_content .number_bill p:nth-child(2)").innerText = cartUsecase.order.date;
    document.querySelector(".popup_content .number_bill p:nth-child(1)").innerText = "code";
    document.querySelector(".popup_content  tbody").innerHTML = table;
    document.querySelector(".popup_content .total_bill .discount h6:nth-child(2)").innerText = Util.formatNumber(cartUsecase.order.discount);
    document.querySelector(".popup_content .total_bill .payment .payment_method").innerText = document.querySelector('.content_order .payment_info .customer_name.pay_status .pay').innerText;
    document.querySelector(".popup_content .total_bill .total h6:nth-child(2)").innerText = Util.formatNumber(cartUsecase.order.total);
    var cancel = document.querySelector(".popup_content .cancel");
    cancel.onclick = () => {
        Helper.errorSound();
        document.querySelector(".container_popup").style.display = "none"
    }
    let proceed = document.querySelector(".proceed");
    proceed.onclick = () => {
        
        Helper.playSound();
        cartUsecase.order.customer.id = customElement.getAttribute("customer_id")
        createOrders()
        
        document.querySelector(".container_popup").style.display = "none"
    }
}
let trash = document.querySelector(".trash")

trash.onclick = () => {
    document.querySelector(".container_order").classList.remove("contai_order_iphone")
    document.querySelector("#cart_iphone").classList.remove("bottom_cart_iphone");
    document.querySelector("#show_hide").classList.remove("bottom_cart_iphone")

    initEmpty();
}

function initEmpty() {
    Helper.errorSound();
    document.querySelector(".container_order #submit_data").style.background = "rgb(194, 195, 196)"
    document.querySelector(".top_icon").style.display = "none"
    document.querySelector(".container_order #submit_data").disabled = true;
    cartUsecase.initOrder();
    document.querySelector(".content_order .cart_items .items").innerHTML = '';
    document.querySelector(".payment_info .price_total").innerHTML = '';
    document.querySelector(".customer_name input").value = '';
}