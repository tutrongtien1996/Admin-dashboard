

var API_URL = "http://127.0.0.1:3000";

var Filter = {  
    limit: 20, //số lượng orders trên mỗi trang: mặc định 20
    offset: 0, //vị trí đầu tiên trong danh sách order của mỗi trang, (trạng hiện tại - 1)*limit
    start_date: Util.getCurrentDay(), //lọc order theo ngày bắt đầu, mặc địch là ngày hiện tại
    end_date: Util.getCurrentDay() //lọc order theo ngày kết thúc, mặc định là ngày hiện tại
}

function start() {
    initMenu();
    if (!checkIfUserLogged()) {
        window.location.href = '/login.html';
    }
    initUI();
    setFilter();
    logOut();
}

var option = {
    headers: {
        'Authorization': "Bearer "+localStorage.getItem('access_token')
    }
};

start();

function checkIfUserLogged() {
    var access_token = localStorage.getItem("access_token");
    if (access_token != null) {
        return true;
    }
    return false;
}

function initUI() {
    //menutoggle
    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');

    toggle.onclick = function(){
        navigation.classList.toggle('active');
        main.classList.toggle('active');
    }

    let list = document.querySelectorAll('.navigation li');
    function activelink(){
        list.forEach((item) =>
        item.classList.remove('hovered'));
        this.classList.add('hovered');
    }
    list.forEach((item) =>
    item.addEventListener('mouseover',activelink))
}

function initMenu() {
    fetch('/data/menu.json')
    .then(response => {
        return response.json();
    })
    .then(result => {
        var html = '';
        result.forEach(menu => {
            html += '<li>'+
                    '<a href="'+menu.link+'" id = "'+menu.id+'">'+
                        '<span class="icon"><ion-icon name="'+menu.icon+'"></ion-icon></span>'+
                        '<span class="title">'+menu.title+'</span>'+
                    '</a>'+
                '</li>';
        });
        document.getElementById("menu").innerHTML = html;
    })
}
function setFilter() {
    var page = getValueFromUrl('page');
    
    if (page == null) {
        page = 1;
    }
    if(page != 'all'){
        Filter.offset = (Filter.limit) * (parseInt(page) - 1); 
    }
    
    var start_date = getValueFromUrl('start_date');
    if(start_date != null){
        Filter.start_date = start_date;
    }
    var end_date = getValueFromUrl('end_date');
    if(end_date != null){
        Filter.end_date = end_date;
    }
    if(page == 'all'){

        Filter.offset = 0;
        Filter.limit = 10000;
        console.log(Filter)
    }
    //set value to input
    if(document.getElementsByClassName('startDate')[0] && document.getElementsByClassName('endDate')[0].value){

        document.getElementsByClassName('startDate')[0].value =  Util.FormatVNDate(new Date(Filter.start_date));
        document.getElementsByClassName('endDate')[0].value =  Util.FormatVNDate(new Date(Filter.end_date));
    
    }
}

function getValueFromUrl(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param)
}

function _getNumberOfPage(count, limit) {
    if (limit == 0) {
        throw("Limit can not be zero");
    }
    var number_of_pages = Math.floor(count / limit);
    var numberMod = count % limit;
    if(numberMod > 0){
        number_of_pages +=1;
    }
    return number_of_pages;
}

function getOderpages(count, nameTemplate){
    var htmlBtn ='';
    try {
        var number_of_pages = _getNumberOfPage(count, Filter.limit)
    } catch (error) {
        var number_of_pages = 1;
    }
    if(number_of_pages > 1){
        document.getElementsByClassName('startDate')[0].value =  Filter.start_date;
        document.getElementsByClassName('endDate')[0].value =  Filter.end_date;
        htmlBtn += `<li><a href="${nameTemplate}.html?page=all&start_date=${Filter.start_date}&end_date=${Filter.end_date}">All</a></li>`
        for(var i = 0; i < number_of_pages; i++){
            htmlBtn += `<li><a href="${nameTemplate}.html?page=${i+1}&start_date=${Filter.start_date}&end_date=${Filter.end_date}">${i + 1}</a></li>`
        }
        document.querySelector(".details .recentOrders .pages ul").innerHTML = htmlBtn;
    }
}

function logOut() {
    let logoutElement = document.querySelector("#logout");
    if(logoutElement){
        logoutElement.onclick = () => {
            alert("da vao")
            axios.post(API_URL+"/admin/logout", {
                headers : option.headers
            })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                return error
            });
        }
    }
}
