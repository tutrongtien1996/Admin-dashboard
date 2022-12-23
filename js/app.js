import { API_URL } from "./config/constant.js";
import { Helper } from "./utils/helper.js";

function start() {
    initMenu();
    if (!checkIfUserLogged()) {
        window.location.href = '/login.html';
    }
    initUI();
    Helper.setFilter();
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
