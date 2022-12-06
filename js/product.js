





var option = {
    headers: {
        'Authorization': "Bearer "+localStorage.getItem("access_token")
    }
};

var product = {}


function initOrder() {
    product = {
        name: "",
        price: "",
        category_id: "",
        avatar: ""
    }
}


function start() {
    initOrder();
    setFilter();
    getListproducts(renderListproducts);
    createproduct();
}
start()


function renderListproducts(list){
    let renderproducts = document.querySelector(".renderproducts tbody");
    var html = "";

    list.forEach(item => {
        item.image = API_URL +"/"+ item.image;
        let data_product = JSON.stringify(item)
        html += `<tr>
            <td>
                <div><img src="${item.image}" alt="product name"></div>
            </td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.category_id}</td>
            <td>
                <span class="status delivered show_profile" data-product='${data_product}'>Prof</span>
                <span class="status PENDING edit" data-product='${data_product}'>Edit</span>
                <span class="status return" data-product='${data_product}'>Del</span>
            </td>
        </tr>`
    });
    renderproducts.innerHTML = html;
    deleteproduct();
    editproduct();
    showProfile();
}



function getListproducts(callback) {
    axios.get(API_URL+'/admin/products', 
    {
        params: Filter ,
        headers: option.headers
    }
    )
    .then((response) => {
        getOderpages(response.data.data.count, "product")
        return callback(response.data.data.results)
    })
    .catch(function (error) {
        console.log(error)
    })
};

function getDataproduct(){
    
    // product.category_id = document.querySelector('#address').value;
    var inputFileElement = document.querySelector(".contai_file input");

    inputFileElement.onchange = () => {
        product.avatar = inputFileElement.files[0];
    }
}

function createproduct() {

    let create = document.querySelector(".cardHeaders .add")
    
    create.onclick = () => {
    let container_popup_elememt = document.querySelector(".container_popup");
    let content_popup_element = document.querySelector(".popup_content");
    content_popup_element.classList.add("edit")

    content_popup_element.innerHTML = getPopup(product_popup.edit);
    container_popup_elememt.style.display = "block"

    
    let create_popup_element = document.querySelector(".popup_content .proccess");
    let cancel_popup_element = document.querySelector(".popup_content .cancel");


    getDataproduct()
    create_popup_element.onclick = () => {
        product.name = content_popup_element.querySelector('input[name="name"]').value;
        product.price = content_popup_element.querySelector('input[name="price"]').value;
        // product.category_id = document.querySelector('#address_edit').value;
        var formData = new FormData();
        formData.append("avatar", product.avatar);
        formData.append("name", product.name);
        formData.append("price", product.price);
        axios.post(API_URL+'/admin/products', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': "Bearer "+localStorage.getItem("access_token")
            }
            })
            .then((response) => {
                alert("create products is Success!")
                content_popup_element.classList.remove("edit")
            content_popup_element.innerHTML = ""
                container_popup_elememt.style.display = "none"
                getListproducts(renderListproducts);
            })
            .catch((err) => {
                console.log(err)
            })
        }    
        cancel_popup_element.onclick = () => {
            content_popup_element.classList.remove("edit")
            content_popup_element.innerHTML = ""
            container_popup_elememt.style.display = "none"
            getListproducts(renderListproducts);
        }  
    }

    
}

    

    
function listElement() {
    let deleteBtn = document.querySelectorAll(".status.return");
    let container_popup_elememt = document.querySelector(".container_popup");
    let content_popup_element =document.querySelector(".popup_content");
    let delete_popup_element = document.querySelector(".popup_content .delete");
    let cancel_popup_element = document.querySelector(".popup_content .cancel");
    
}

function deleteproduct() {
    let deleteBtn = document.querySelectorAll(".status.return");
    deleteBtn.forEach(item => {
        item.onclick = () => {
            deleteHandle(item)
        }
    })
}

function editproduct(){
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
            content_popup_element.classList.add("profile")

            content_popup_element.innerHTML = getPopup(product_popup.profile);

            content_popup_element.querySelector('.image').src = JSON.parse(item.dataset.product).image;
            console.log(content_popup_element.querySelector('.image'))
            content_popup_element.querySelector('.name').innerText = `${JSON.parse(item.dataset.product).name}`;
            content_popup_element.querySelector('.price').innerText = `${JSON.parse(item.dataset.product).price}`;
            content_popup_element.querySelector('.category').innerText = ``;
            content_popup_element.querySelector('.created_at').innerText = `${JSON.parse(item.dataset.product).created_at}`;
            content_popup_element.querySelector('.status.edit').setAttribute("data-product", item.dataset.product);
            content_popup_element.querySelector('.status.delete').setAttribute("data-product", item.dataset.product);
            content_popup_element.querySelector('.status.cancel').setAttribute("data-product", item.dataset.product);
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
                getListproducts(renderListproducts);
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
    let content_popup_element = document.querySelector(".popup_content");

    content_popup_element.classList.remove("edit")

    content_popup_element.classList.add("delete")
    
    content_popup_element.innerHTML = getPopup(customer_popup.delete);
    content_popup_element.querySelector(".name").innerText = `${JSON.parse(item.dataset.product).name}`;
    container_popup_elememt.style.display = "block"
    let delete_popup_element = document.querySelector(".popup_content .delete");
    let cancel_popup_element = document.querySelector(".popup_content .cancel");
    
    delete_popup_element.onclick = () => {
        axios.delete(API_URL + '/admin/products/'+JSON.parse(item.dataset.product).id, option)
        .then((response) => {
            content_popup_element.classList.remove("delete")
            container_popup_elememt.style.display = "none"
            content_popup_element.innerHTML = ""

            getListproducts(renderListproducts);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    cancel_popup_element.onclick = () => {
        content_popup_element.classList.remove("delete")
        content_popup_element.innerHTML = ""
        container_popup_elememt.style.display = "none"
        getListproducts(renderListproducts);
    }
}


function editHandle(item){
    let container_popup_elememt = document.querySelector(".container_popup");
    let content_popup_element = document.querySelector(".popup_content");
    content_popup_element.classList.remove("edit")
    content_popup_element.classList.add("edit")

    content_popup_element.innerHTML = getPopup(product_popup.edit);
    content_popup_element.querySelector('input[name="name"]').value = `${JSON.parse(item.dataset.product).name}`;
    content_popup_element.querySelector('input[name="price"]').value = `${JSON.parse(item.dataset.product).price}`;
    container_popup_elememt.style.display = "block"

    
    let edit_popup_element = document.querySelector(".popup_content .proccess");
    let cancel_popup_element = document.querySelector(".popup_content .cancel");

    getDataproduct()
    edit_popup_element.onclick = () => {
        product.name = content_popup_element.querySelector('input[name="name"]').value;
        product.price = content_popup_element.querySelector('input[name="price"]').value;
        // product.category_id = document.querySelector('#address_edit').value;
        var formData = new FormData();
        formData.append("avatar", product.avatar);
        formData.append("name", product.name);
        formData.append("price", product.price);
        axios.patch(API_URL + "/admin/products/"+JSON.parse(item.dataset.product).id, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': "Bearer "+localStorage.getItem("access_token")
            }
            })
        .then((response) => {
            alert("Update Success!")
            content_popup_element.classList.remove("edit")
            container_popup_elememt.style.display = "none"
            content_popup_element.innerHTML = ""

            getListproducts(renderListproducts);
        })
        .catch((err) => {
            if (err) throw err
        })
    }

    cancel_popup_element.onclick = () => {
        content_popup_element.classList.remove("edit")
        content_popup_element.innerHTML = ""
        container_popup_elememt.style.display = "none"
        getListproducts(renderListproducts);
    }
}