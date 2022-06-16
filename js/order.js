
function start() {
    getListOrders(renderListOrders);
}

start();


function getListOrders(callback) {
    fetch(API_URL+'/public/source/api_orders?offset=0&limit=25&start_date=2022-06-01&end_date=2022-06-30&filters%5B%5D=', 
        {
            method: "GET",
            headers: {
                'Authorization': "Bearer "+localStorage.getItem('access_token')
            }
        })
        .then(function(response){
            return response.json();
        })
        .then(callback)
        // .then(function(result){
        //     console.log(result.data.rows)
        // })
        .catch(function (error) {
            console.log(error)
        })

};

function renderListOrders(result){
    var html ='';
    result.data.rows.forEach(function(item){
        html += `<tr>
        <td>${item.sale_time}</td>
        <td>${item.customer_name}</td>
        <td>${item.amount_tendered}</td>
        <td>${item.payment_type}</td>
        <td><span class="status delivered">xong</span></td>
    </tr>`
    });
    document.getElementById('list_order').innerHTML = html;
}





















// function createOrders(data, callback){
//     var options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//           },
//         body: JSON.stringify(data)
//     }
//     fetch(API_URL_ORDERS, options)
//         .then(function(response){
//             return response.json();
//         })
//         .then(callback)
// }

// function deleteOrder(id){
//     var options = {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//           }
//     }
//     fetch(API_URL_ORDERS + '/' +id, options)
//         .then(function(response){
//             return response.json();
//         })
//         .then(function(){
//             getListOrders(renderListOrders);

//         })
// }

// function renderListOrders (orders){
//     var htmls = orders.map(function(order){
//         return `<tr><td>${order.name}</td><td>${order.product}</td><td>${order.amount}</td><td>${order.total}</td><td>${order.status}</td><td>
//         <button onclick="deleteOrder(${order.id})">xoa</button></td></tr>`;
//     });
//     var listOrders = document.querySelector("#list_orders");
//     listOrders.innerHTML = htmls.join('');
// }

// function handleCreateForm(){
//     var createBtn = document.querySelector("#create");
//     createBtn.onclick = function(){
//         var name = document.querySelector('input[name="name"]').value;
//         var product = document.querySelector('input[name="product"]').value;
//         var amount = document.querySelector('input[name="amount"]').value;
//         var total = document.querySelector('input[name="total"]').value;
//         var status = document.querySelector('input[name="status"]').value;
//         var formData = {
//             name: name,
//             product: product,
//             amount: amount,
//             total: total,
//             status: status
//         }

//         createOrders(formData, function(){
//             getListOrders(renderListOrders);
//         })
//     }
// }