

const API_URL_ORDERS = "http://localhost/opensourcepos/public/source/login"

function start(){
    getListOrders(renderListOrders);
    handleCreateForm();
}
start();

function getListOrders(callback) {
    fetch(API_URL_ORDERS)
        .then(function(response){
            return response.json();
        })
        .then(callback)
};

function createOrders(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data)
    }
    fetch(API_URL_ORDERS, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}

function deleteOrder(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          }
    }
    fetch(API_URL_ORDERS + '/' +id, options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            getListOrders(renderListOrders);

        })
}

function renderListOrders (orders){
    var htmls = orders.map(function(order){
        return `<tr><td>${order.name}</td><td>${order.product}</td><td>${order.amount}</td><td>${order.total}</td><td>${order.status}</td><td>
        <button onclick="deleteOrder(${order.id})">xoa</button></td></tr>`;
    });
    var listOrders = document.querySelector("#list_orders");
    listOrders.innerHTML = htmls.join('');
}

function handleCreateForm(){
    var createBtn = document.querySelector("#create");
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var product = document.querySelector('input[name="product"]').value;
        var amount = document.querySelector('input[name="amount"]').value;
        var total = document.querySelector('input[name="total"]').value;
        var status = document.querySelector('input[name="status"]').value;
        var formData = {
            name: name,
            product: product,
            amount: amount,
            total: total,
            status: status
        }

        createOrders(formData, function(){
            getListOrders(renderListOrders);
        })
    }
}