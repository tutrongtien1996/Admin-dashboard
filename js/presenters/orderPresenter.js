import { orderUsecase } from "../usecases/orderUsecase.js";
import { Helper } from "../utils/helper.js";

function start() { 
    Helper.setFilter();
    orderUsecase.list(renderListOrders)
    initSearchDates();
}

start();


function renderListOrders(results){
    var html ='';
    //render data row
    let total_price = 0;
    if(results){
        results.forEach(function(item){
            total_price += Number(item.total);
            let created_at = new Date(item.created_at)
            const mydata = JSON.stringify(item);
            html += `<tr data-order='${mydata}'>
            <td>${formatDate(created_at)}</td>`;
            if (item.customer) {
                html += `<td>${item.customer}</td>`;
            } else {
                html += `<td></td>`;
            }
            html += `<td style="text-align: right;">${Util.formatNumber(item.total)}đ</td>`;

            if (item.payment_name) {
                html += `<td>${item.payment_name}</td>`;
            } else {
                html += `<td>cash</td>`;
            }
            html += `<td><span class="status ${item.status}">${item.status.slice(0, 4)}</span></td>
            <td>
                <span class="status delivered show_profile">Pro</span>
                <span class="status return delete" >Del</span>
            </td>
        </tr>`
        });
    }
    document.querySelector('.listBtn .total h6:nth-child(2)').innerText = `${Util.formatNumber(total_price)}đ`;
    document.getElementById('list_order').innerHTML = html;
    showProfile()
    deleteOrder()
}


function initSearchDates(){
    var searchDates = document.getElementById('searchDates');
    searchDates.onclick =  () => {
        
        var startDate = document.getElementsByClassName('startDate')[0].value;
        var endDate = document.getElementsByClassName('endDate')[0].value;
        if(startDate){
            Helper.filter.start_date = startDate
        }
        if(endDate){
            Helper.filter.end_date = endDate;
        }
        orderUsecase.list(renderListOrders)
    }
}

function showProfile() {
    let show_profileBtns = document.querySelectorAll(".status.show_profile");
    show_profileBtns.forEach(item => {
        item.onclick = async () => {
            let parentItem = item.parentElement.parentElement;
            let result = await orderUsecase.getOne(JSON.parse(parentItem.dataset.order).id)

            
            let container_popup_elememt = document.querySelector(".container_popup");
            let content_popup_element = document.querySelector(".popup_content");

            content_popup_element.innerHTML = orders_popup.getOne;
            container_popup_elememt.style.display = "block"

            let cancel_popup_element = content_popup_element.querySelector(".cancel");
            let delete_popup_element = content_popup_element.querySelector(".delete");

            cancel_popup_element.onclick = () => {
                content_popup_element.innerHTML = ""
                container_popup_elememt.style.display = "none"
                orderUsecase.list(renderListOrders)
            }

            delete_popup_element.onclick = () => {
                deleteHandle(item)
            }

            content_popup_element.querySelector('.name').innerText = result.customer.name;
            var table = "";
            result.items.forEach((element, index) => {
                table += `<tr>
                            <td>${index + 1}</td>
                            <td><p>${element.name}</p><span>${Util.formatNumber(element.price)}</span></td>
                            <td>${element.quantity}</td>
                            <td>${Util.formatNumber(element.quantity * element.price)}</td>
                        </tr>`
            })
            content_popup_element.querySelector("tbody").innerHTML = table;
            let created_at = new Date(result.created_at)
            content_popup_element.querySelector(".number_bill p:nth-child(2)").innerText = formatDate(created_at);
            content_popup_element.querySelector(".number_bill .id").innerText = `zeopos${result.id}`;
            content_popup_element.querySelector(".payment_method").innerText = result.payment_method.name;
            content_popup_element.querySelector(".total h6:nth-child(2)").innerText = Util.formatNumber(result.total);
        }
    })
}

function deleteOrder() {
    let delete_Btns = document.querySelectorAll(".status.delete");
    delete_Btns.forEach(item => {
        item.onclick = () => {
            deleteHandle(item)
        }
    })
}

function deleteHandle(item) {
    let parentItem = item.parentElement.parentElement;
    let container_popup_elememt = document.querySelector(".container_popup");
    let content_popup_element = document.querySelector(".popup_content");

    content_popup_element.classList.remove("edit")

    content_popup_element.classList.add("delete")
    content_popup_element.innerHTML = orders_popup.delete;
    container_popup_elememt.style.display = "block"

    let delete_popup_element = content_popup_element.querySelector(".delete");
    let cancel_popup_element = content_popup_element.querySelector(".cancel");

    cancel_popup_element.onclick = () => {
        content_popup_element.classList.remove("delete")
        content_popup_element.innerHTML = ""
        container_popup_elememt.style.display = "none"
        orderUsecase.list(renderListOrders)
    }
    
    delete_popup_element.onclick = async () => {
        await orderUsecase.delete(JSON.parse(parentItem.dataset.order).id)
        container_popup_elememt.style.display = "none"
        orderUsecase.list(renderListOrders)
    }  
}















