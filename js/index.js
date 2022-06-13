const API_URL = 'http://localhost/opensourcepos';
function start() {
    if (!checkIfUserLogged()) {
        window.location.href = "./login.html";
    }
    initUI();
    getListOrders(renderListOrders);
}

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



function getListOrders(callback) {
    fetch(API_URL+'/public/source/api_orders?offset=0&limit=25&start_date=2022-06-08&end_date=2022-06-08&filters%5B%5D=',
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
}

function renderListOrders(result) {

}