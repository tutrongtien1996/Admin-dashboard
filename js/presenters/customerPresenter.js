import { API_URL } from "../config/constant.js";
import { customerUsecase } from "../usecases/customerUsecase.js";
import { Helper } from "../utils/helper.js";


var customer = {}


function initCustomer() {
    customer = {
        name: "",
        phone_number: "",
        address: ""
    }
}


function renderListCustomers(list){
    let renderCustomers = document.querySelector(".renderCustomers tbody");
    var html = "";
    if (list != undefined) {
        list.forEach(item => {
            let data_customer = JSON.stringify(item)
            let created_at = new Date(item.created_at)
            html += `<tr>
                <td>${item.name}</td>
                <td>${item.phone_number}</td>
                <td>${formatDate(created_at)}</td>
                <td>
                    <span class="status delivered show_profile" data-customer='${data_customer}'>Profile</span>
                    <span class="status PENDING edit" data-customer='${data_customer}'>Edit</span>
                    <span class="status return" data-customer='${data_customer}'>Delete</span>
                </td>
            </tr>`
        });
    }
    renderCustomers.innerHTML = html;
    deleteCustomer();
    editCustomer();
    showProfile();
}



function start() {
    initCustomer();
    Helper.setFilter();
    customerUsecase.list(renderListCustomers);
    createCustomer();
    initSearchDates();
    initSearchNames();
}
start()

function initSearchNames(){
    let nameKey = document.querySelector('input[name="search_name"]');
    nameKey.onkeyup = () => {
        var startDate = "all";
        if(startDate && (nameKey.value.trim() != "")){
            Helper.filter.start_date = startDate;
        }
        if(nameKey){
            Helper.filter.name = nameKey.value.trim();
        }
        if(nameKey.value.trim() == ""){
            Helper.filter.start_date = Util.getCurrentDay();
        }
        customerUsecase.list(renderListCustomers);
    }   
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
        customerUsecase.list(renderListCustomers);
    }
}

function getDataCustomer(){
    customer.name = document.querySelector('input[name="name"]').value;
    customer.phone_number = document.querySelector('input[name="phone_number"]').value;
    customer.address = document.querySelector('#address').value;
}

function createCustomer() {
    let addElement = document.querySelector("#addBtn");
    addElement.onclick = () => {
        let container_popup_elememt = document.querySelector(".container_popup");
        let content_popup_element = document.querySelector(".popup_content");
        content_popup_element.classList.remove("edit")
        content_popup_element.classList.add("edit")

        content_popup_element.innerHTML = getPopup(customer_popup.create);
        container_popup_elememt.style.display = "block"

        
        let create_popup_element = document.querySelector(".popup_content .proccess");
        let cancel_popup_element = document.querySelector(".popup_content .cancel");

        cancel_popup_element.onclick = () => {
            content_popup_element.innerHTML = ""
            content_popup_element.classList.remove("edit")

            container_popup_elememt.style.display = "none"
            customerUsecase.list(renderListCustomers);
        }

        create_popup_element.onclick = () => {
            getDataCustomer();
            axios.post(API_URL + '/admin/customers', customer, Helper.requestOption)
            .then((response) => {
                content_popup_element.innerHTML = ""
            content_popup_element.classList.remove("edit")

            container_popup_elememt.style.display = "none"
                customerUsecase.list(renderListCustomers);
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    
}

function deleteCustomer() {
    let deleteBtn = document.querySelectorAll(".status.return");
    deleteBtn.forEach(item => {
        item.onclick = () => {
            deleteHandle(item)
            
        }
    })
}

function editCustomer(){
    let editBtn = document.querySelectorAll(".status.edit");
    editBtn.forEach(item => {
        item.onclick = () => {
            editHandle(item)
            
        }
    })
}

function showProfile() {
    let show_profileBtn = document.querySelectorAll(".status.show_profile");
    show_profileBtn.forEach(item => {
        item.onclick = () => {
            let container_popup_elememt = document.querySelector(".container_popup");
            let content_popup_element = document.querySelector(".popup_content");
            content_popup_element.classList.add("edit")

            content_popup_element.innerHTML = getPopup(customer_popup.profile);
            content_popup_element.querySelector('.name').innerText = `${JSON.parse(item.dataset.customer).name}`;
            content_popup_element.querySelector('.phone_number').innerText = `${JSON.parse(item.dataset.customer).phone_number}`;
            content_popup_element.querySelector('.address').innerText = `${JSON.parse(item.dataset.customer).address}`;
            content_popup_element.querySelector('.created_at').innerText = `${JSON.parse(item.dataset.customer).created_at}`;
            content_popup_element.querySelector('.status.edit').setAttribute("data-customer", item.dataset.customer);
            content_popup_element.querySelector('.status.delete').setAttribute("data-customer", item.dataset.customer);
            content_popup_element.querySelector('.status.cancel').setAttribute("data-customer", item.dataset.customer);
            container_popup_elememt.style.display = "block"

            
            let edit_popup_element = container_popup_elememt.querySelector(".status.edit");
            let cancel_popup_element = container_popup_elememt.querySelector(".status.cancel");
            let delete_popup_element = container_popup_elememt.querySelector(".status.delete");

            edit_popup_element.onclick = () => {
                editHandle(edit_popup_element)
            }

            cancel_popup_element.onclick = () => {
                content_popup_element.innerHTML = ""
                content_popup_element.classList.remove("edit")

                container_popup_elememt.style.display = "none"
                customerUsecase.list(renderListCustomers);
            }

            delete_popup_element.onclick = () => {
                content_popup_element.classList.remove("edit")
                deleteHandle(edit_popup_element)
            }
        }
    })
}

function deleteHandle(item) {
    let container_popup_elememt = document.querySelector(".container_popup");
    let content_popup_element =document.querySelector(".popup_content");

    content_popup_element.classList.remove("edit")

    content_popup_element.classList.add("delete")
    content_popup_element.innerHTML = getPopup(customer_popup.delete);
    document.querySelector(".name").innerText = `${JSON.parse(item.dataset.customer).name}`;
    container_popup_elememt.style.display = "block"

    let delete_popup_element = document.querySelector(".popup_content .delete");
    let cancel_popup_element = document.querySelector(".popup_content .cancel");
    
    delete_popup_element.onclick = () => {
        axios.delete(API_URL + '/admin/customers/'+JSON.parse(item.dataset.customer).id, Helper.requestOption)
        .then((response) => {
            content_popup_element.classList.remove("delete")
            container_popup_elememt.style.display = "none"
            content_popup_element.innerHTML = ""

            customerUsecase.list(renderListCustomers);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    cancel_popup_element.onclick = () => {
        content_popup_element.classList.remove("delete")
        content_popup_element.innerHTML = ""
        container_popup_elememt.style.display = "none"
        customerUsecase.list(renderListCustomers);
    }
}


function editHandle(item){
    let container_popup_elememt = document.querySelector(".container_popup");
    let content_popup_element = document.querySelector(".popup_content");
    content_popup_element.classList.remove("edit")
    content_popup_element.classList.add("edit")

    content_popup_element.innerHTML = getPopup(customer_popup.edit);
    document.querySelector('input[name="name_edit"]').value = `${JSON.parse(item.dataset.customer).name}`;
    document.querySelector('input[name="phone_number_edit"]').value = `${JSON.parse(item.dataset.customer).phone_number}`;
    document.querySelector('#address_edit').innerText = `${JSON.parse(item.dataset.customer).address}`;;
    container_popup_elememt.style.display = "block"

    
    let edit_popup_element = document.querySelector(".popup_content .proccess");
    let cancel_popup_element = document.querySelector(".popup_content .cancel");


    edit_popup_element.onclick = () => {
        customer.name = document.querySelector('input[name="name_edit"]').value;
        customer.phone_number = document.querySelector('input[name="phone_number_edit"]').value;
        customer.address = document.querySelector('#address_edit').value;
        axios.patch(API_URL + "/admin/customers/"+JSON.parse(item.dataset.customer).id, customer, Helper.requestOption)
        .then((response) => {
            content_popup_element.classList.remove("edit")
            container_popup_elememt.style.display = "none"
            content_popup_element.innerHTML = ""

            customerUsecase.list(renderListCustomers);
        })
        .catch((err) => {
            if (err) throw err
        })
    }

    cancel_popup_element.onclick = () => {
        content_popup_element.classList.remove("edit")
        content_popup_element.innerHTML = ""
        container_popup_elememt.style.display = "none"
        customerUsecase.list(renderListCustomers);
    }
}