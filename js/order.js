
var orderFilter = {  
    limit: 5, //số lượng orders trên mỗi trang: mặc định 20
    offset: 0, //vị trí đầu tiên trong danh sách order của mỗi trang, (trạng hiện tại - 1)*limit
    start_date: Util.getCurrentDay(), //lọc order theo ngày bắt đầu, mặc địch là ngày hiện tại
    end_date: Util.getCurrentDay() //lọc order theo ngày kết thúc, mặc định là ngày hiện tại
}


function start() {
    getListOrders(renderListOrders, orderFilter);
}

start();

function getListOrders(callback, filter) {
    axios.get(API_URL+'/public/source/api_orders', {
        params: filter,
        headers: option.headers
    })
    .then((response) => {
        return callback(response.data)
    })
    .catch(function (error) {
        console.log(error)
    })
};



function renderListOrders(result){
    var html ='';
    
    //render data row
    result.data.rows.forEach(function(item){
        html += `<tr>
        <td>${item.sale_time}</td>`;
        if (item.customer_name != undefined) {
            html += `<td>${item.customer_name}</td>`;
        } else {
            html += `<td></td>`;
        }
        html += `<td style="text-align: right;">${Util.formatNumber(item.amount_tendered)}đ</td>`;

        if (item.payment_type != undefined) {
            html += `<td>${item.payment_type}</td>`;
        } else {
            html += `<td></td>`;
        }
        html += `<td><span class="status delivered">xong</span></td>
    </tr>`
    });
    document.getElementById('list_order').innerHTML = html;
    getOderpages(result);
}


function getOderpages(result){
    var htmlBtn ='';
    var number_of_pages = Math.floor(result.data.total / orderFilter.limit);
    var numberMod = result.data.total % orderFilter.limit;
    if(numberMod > 0){
        number_of_pages +=1;
    }
    for(var i = 0; i < number_of_pages; i++){
        htmlBtn += `<button class="btn">${i + 1}</button>`
    }
    document.querySelector(".details .recentOrders .pages").innerHTML = htmlBtn;
    var pages =  document.querySelectorAll(".details .recentOrders .pages .btn");
    pages.forEach((page, index) =>{
        page.onclick = function(){
            orderFilter.offset = orderFilter.limit * index;
            getListOrders(renderListOrders, orderFilter);
        }
    })
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