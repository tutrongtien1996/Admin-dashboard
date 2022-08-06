const API_URL = "http://localhost/opensourcepos/public";

function start() {
    initMenu();
    if (!checkIfUserLogged()) {
        window.location.href = '/login.html';
    }
    initUI();
    getListProduct();
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
function getListProduct(){
    axios.get(API_URL + '/source/api_items', option)
        .then((reponse) => {
            var productEntity = new Product();
            var listProducts = productEntity.parseFromAPI(reponse.data.data);
            localStorage.setItem('products', JSON.stringify(listProducts));
        })
        .catch(function (error) {
            console.log(error)
        })
}

setTimeout(
    function(){
        var logOut = document.getElementById("logout");
        logOut.onclick = function(){
        localStorage.removeItem('access_token');
        window.location.href = '/login.html';}
    }, 1000)