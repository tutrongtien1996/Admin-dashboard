





var option = {
    headers: {
        'Authorization': "Bearer "+localStorage.getItem("access_token")
    }
};

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
    renderCustomers.innerHTML = html;
    deleteCustomer();
    editCustomer();
    showProfile();
}

function start() {
    initCustomer();
    setFilter();
    getListCustomers(renderListCustomers);
    createCustomer();
}
start()

function getListCustomers(callback) {
    axios.get(API_URL+'/admin/customers', 
    {
        params: Filter ,
        headers: option.headers
    }
    )
    .then((response) => {
        var result = response.data.data.results;
        getOderpages(response.data.data.count, "customer")
        return callback(result)
    })
    .catch(function (error) {
        console.log(error)
    })
};

function getDataCustomer(){
    customer.name = document.querySelector('input[name="name"]').value;
    customer.phone_number = document.querySelector('input[name="phone_number"]').value;
    customer.address = document.querySelector('#address').value;
}

function createCustomer() {
    let create = document.querySelector("#create_customer")

    create.onclick = () => {
        getDataCustomer();

        axios.post(API_URL + '/admin/customers', customer, option)
        .then((response) => {
            getListCustomers(renderListCustomers);
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

    

    
function listElement() {
    let deleteBtn = document.querySelectorAll(".status.return");
    let container_popup_elememt = document.querySelector(".container_popup");
    let content_popup_element =document.querySelector(".popup_content");
    let delete_popup_element = document.querySelector(".popup_content .delete");
    let cancel_popup_element = document.querySelector(".popup_content .cancel");
    
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
            content_popup_element.querySelector('.address').innerText = `${JSON.parse(item.dataset.customer).phone_number}`;
            content_popup_element.querySelector('.created_at').innerText = `${JSON.parse(item.dataset.customer).address}`;
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
                getListCustomers(renderListCustomers);
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
        axios.delete(API_URL + '/admin/customers/'+JSON.parse(item.dataset.customer).id, option)
        .then((response) => {
            content_popup_element.classList.remove("delete")
            container_popup_elememt.style.display = "none"
            content_popup_element.innerHTML = ""

            getListCustomers(renderListCustomers);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    cancel_popup_element.onclick = () => {
        content_popup_element.classList.remove("delete")
        content_popup_element.innerHTML = ""
        container_popup_elememt.style.display = "none"
        getListCustomers(renderListCustomers);
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
        axios.patch(API_URL + "/admin/customers/"+JSON.parse(item.dataset.customer).id, customer, option)
        .then((response) => {
            content_popup_element.classList.remove("edit")
            container_popup_elememt.style.display = "none"
            content_popup_element.innerHTML = ""

            getListCustomers(renderListCustomers);
        })
        .catch((err) => {
            if (err) throw err
        })
    }

    cancel_popup_element.onclick = () => {
        content_popup_element.classList.remove("edit")
        content_popup_element.innerHTML = ""
        container_popup_elememt.style.display = "none"
        getListCustomers(renderListCustomers);
    }
}