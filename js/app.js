import { API_URL } from "./config/constant.js";
import { Helper } from "./utils/helper.js";

function start() {
    viewProfile();
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

    navigation.onclick = function(){
        
        navigation.classList.toggle('active');
        main.classList.toggle('active');
        toggle.classList.toggle('active');
    }
    toggle.onclick = function(){
        toggle.classList.toggle('active')
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
        var html = '<li>'+
        '<a href="'+menu.link+'" id = "'+menu.id+'">'+
            '<span class="icon"><ion-icon name="print"></ion-icon></span>'+
            '<span class="title">'+'ZEOPOS'+'</span>'+
        '</a>'+
        '</li>';
        if(JSON.parse(localStorage.getItem("data-login")).company.name){
            html = '<li>'+
            '<a href="'+menu.link+'" id = "'+menu.id+'">'+
                '<span class="icon"><ion-icon name="print"></ion-icon></span>'+
                '<span class="title">'+ JSON.parse(localStorage.getItem("data-login")).company.name +'</span>'+
            '</a>'+
            '</li>';
        }
        
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


function viewProfile() {
    let viewElement = document.querySelector(".profile .avatar")
    let profileElement = document.querySelector(".viewProfile")
    window.addEventListener('click', function(e){   
        if (e.target != profileElement && e.target != viewElement){
            if(profileElement){
                profileElement.style.display = "none"
            }
          

        } else{
          // Clicked outside the box
        }
    });
    if(viewElement){
        viewElement.onclick = (e) => {
            console.log(e)
            profileElement.style.display = "block"
        }
    }
    
}



function logOut() {
    let logoutElement = document.querySelector(".viewProfile .logout");
    if(logoutElement){
        logoutElement.onclick = () => {
            axios.post(API_URL+"/admin/logout", {
                headers : option.headers
            })
            .then(function (response) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("data-login");
                window.location.href = "./login.html"
            })
            .catch(function (error) {
                return error
            });
        }
    }
}
