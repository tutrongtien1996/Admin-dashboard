
var orderFilter = {  
    limit: 20, //số lượng orders trên mỗi trang: mặc định 20
    offset: 0, //vị trí đầu tiên trong danh sách order của mỗi trang, (trạng hiện tại - 1)*limit
    start_date: Util.getCurrentDay(), //lọc order theo ngày bắt đầu, mặc địch là ngày hiện tại
    end_date: Util.getCurrentDay() //lọc order theo ngày kết thúc, mặc định là ngày hiện tại
}

function start() { 
    
    initDatePicker();
    setFilter();
    initOnclickViewall();
    getListOrders(renderListOrders, orderFilter);
    initSearchDates();
}

start();

function setFilter() {
    var page = getValueFromUrl('page');
    if (page == null) {
        page = 1;
    }
    orderFilter.offset = orderFilter.limit * (parseInt(page) - 1); 
    var start_date = getValueFromUrl('start_date');
    if(start_date != null){
        orderFilter.start_date = start_date;
    }
    var end_date = getValueFromUrl('end_date');
    if(end_date != null){
        orderFilter.end_date = end_date;
    }

    //set value to input

    document.getElementsByClassName('startDate')[0].value =  Util.FormatVNDate(new Date(orderFilter.start_date));
    document.getElementsByClassName('endDate')[0].value =  Util.FormatVNDate(new Date(orderFilter.end_date));

}

function getValueFromUrl(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param)
}

function getListOrders(callback, filter) {
    axios.get(API_URL+'/source/api_orders', {
        params: filter,
        headers: option.headers
    })
    .then((response) => {
        var result = response.data.data;
        getOderpages(result)
        return callback(response.data.data.rows)
    })
    .catch(function (error) {
        console.log(error)
    })
};


function renderListOrders(result){
    var html ='';
    //render data row
    result.forEach(function(item){
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
    
}

function getOderpages(result){
    var htmlBtn ='';
    try {
        var number_of_pages = _getNumberOfPage(result.total, orderFilter.limit)
    } catch (error) {
        var number_of_pages = 1;
    }
    for(var i = 0; i < number_of_pages; i++){
        htmlBtn += `<a href="/order.html?page=${i+1}&start_date=${orderFilter.start_date}&end_date=${orderFilter.end_date}" class="btn">${i + 1}</button>`
    }
    document.querySelector(".details .recentOrders .pages").innerHTML = htmlBtn;
    // var pages =  document.querySelectorAll(".details .recentOrders .pages .btn");

    // pages.forEach((page, index) =>{
    //     page.onclick = function(){
    //         orderFilter.offset = orderFilter.limit * index;
    //         getListOrders(renderListOrders, orderFilter);
    //     } 
    // })
}

function _getNumberOfPage(total, limit) {
    if (limit == 0) {
        throw("Limit can not be zero");
    }
    var number_of_pages = Math.floor(total / limit);
    var numberMod = total % limit;
    if(numberMod > 0){
        number_of_pages +=1;
    }
    return number_of_pages;
}

function initOnclickViewall(){
    var btnViewAll = document.querySelector(".recentOrders .btn.viewall");
    btnViewAll.onclick = () => {  
        orderFilter.offset = 0;
        orderFilter.limit = 0;
        getListOrders(renderListOrders, orderFilter);
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
            var arrStartDate = startDate.split('/');
            startDate = arrStartDate[2] + '/' + arrStartDate[1] + '/' +arrStartDate[0];
            orderFilter.start_date = Util.formatDate(new Date(startDate))
        }
        if(endDate){
            var arrEndDate = endDate.split('/');
            endDate = arrEndDate[2] + '/' + arrEndDate[1] + '/' +arrEndDate[0];
            orderFilter.end_date = Util.formatDate(new Date(endDate))
            
        }
        getListOrders(renderListOrders, orderFilter);
        
        // orderFilter.start_date = 
        // orderFilter.end_date = endDate;
        // console.log(orderFilter);
    }
}















