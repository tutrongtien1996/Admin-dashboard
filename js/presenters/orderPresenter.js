import { orderUsecase } from "../usecases/orderUsecase.js";
import { Helper } from "../utils/helper.js";

function start() { 
    
    // initDatePicker();
    Helper.setFilter();
    // initOnclickViewall();
    orderUsecase.list(renderListOrders)
    initSearchDates();
}

start();


function renderListOrders(results){
    var html ='';
    //render data row
    if(results){
        results.forEach(function(item){
            let created_at = new Date(item.created_at)
            html += `<tr>
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
                <span class="status PENDING edit" >Edit</span>
                <span class="status return" >Del</span>
            </td>
        </tr>`
        });
    }
    document.getElementById('list_order').innerHTML = html;
    showProfile()
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
        item.onclick = () => {
            let container_popup_elememt = document.querySelector(".container_popup");
            let content_popup_element = document.querySelector(".popup_content");

            content_popup_element.innerHTML = cart_popup;
            // content_popup_element.querySelector('.name').innerText = `${JSON.parse(item.dataset.customer).name}`;
            // content_popup_element.querySelector('.phone_number').innerText = `${JSON.parse(item.dataset.customer).phone_number}`;
            // content_popup_element.querySelector('.address').innerText = `${JSON.parse(item.dataset.customer).phone_number}`;
            // content_popup_element.querySelector('.created_at').innerText = `${JSON.parse(item.dataset.customer).address}`;
            // content_popup_element.querySelector('.status.edit').setAttribute("data-customer", item.dataset.customer);
            // content_popup_element.querySelector('.status.delete').setAttribute("data-customer", item.dataset.customer);
            // content_popup_element.querySelector('.status.cancel').setAttribute("data-customer", item.dataset.customer);
            container_popup_elememt.style.display = "block"

            
            // let edit_popup_element = container_popup_elememt.querySelector(".status.edit");
            // let cancel_popup_element = container_popup_elememt.querySelector(".status.cancel");
            // let delete_popup_element = container_popup_elememt.querySelector(".status.delete");

            // edit_popup_element.onclick = () => {
            //     editHandle(edit_popup_element)
            // }

            // cancel_popup_element.onclick = () => {
            //     content_popup_element.innerHTML = ""
            //     content_popup_element.classList.remove("edit")

            //     container_popup_elememt.style.display = "none"
            //     customerUsecase.list(renderListCustomers);
            // }

            // delete_popup_element.onclick = () => {
            //     content_popup_element.classList.remove("edit")
            //     deleteHandle(edit_popup_element)
            // }
        }
    })
}















