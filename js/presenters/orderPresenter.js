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
        </tr>`
        });
    }
    document.getElementById('list_order').innerHTML = html;
    
}





function initOnclickViewall(){
    var btnViewAll = document.querySelector(".recentOrders .cardHeaders .btn.viewall");
    btnViewAll.onclick = () => {  
        Helper.filter.offset = 0;
        Helper.filter.limit = 0;
        orderUsecase.list(renderListOrders)
    }
}

function initDatePicker(){
    const startDate = datepicker('.startDate', {
        formatter: (input, date, instance) => {
            const startValue = date.toLocaleDateString('vi-VN')
            input.value = startValue // => '1/1/2099'
          }
    });
    const endDate = datepicker('.endDate', {
        formatter: (input, date, instance) => {
            const endValue = date.toLocaleDateString('vi-VN')
            input.value = endValue 
        }
    })
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















