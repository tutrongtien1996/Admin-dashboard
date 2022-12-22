import { productUsecase } from "../usecases/productUsecase.js";
import { Helper } from "../utils/helper.js";
import { commonPresenter } from "./commonPresenter.js";

var product = {}


function resetProduct() {
    $("#file-div-preview").removeClass("d-block");
    $("#file-div-preview").addClass("d-none");
    $('#productForm').trigger("reset");
}


function start() {
    resetProduct();
    Helper.setFilter();
    productUsecase.list(renderListproducts);
    $("#addBtn").on("click", showProductFormModal)
    $("input[name='avatar']").on("change", commonPresenter.showPreview)
    $("#saveBtn").on("click", () => productUsecase.create(refreshPage))
}
start()

function refreshPage() {
    location.reload();
}

function showProductFormModal() {
    resetProduct();
    $("#productFormPopup").modal("show");
}

function renderListproducts(list){
    let renderproducts = document.querySelector(".renderproducts tbody");
    var html = "";

    list.forEach(item => {
        let data_product = JSON.stringify(item)
        html += `<tr>
            <td>
                <div><img src="${item.image}" alt="product name"></div>
            </td>
            <td>${item.name}</td>
            <td>${Util.formatNumber(item.price)}VND</td>
            <td>
                <span class="status delivered show_profile" data-product='${data_product}'>View</span>
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

function deleteproduct() {
    let deleteBtn = document.querySelectorAll(".status.return");
    deleteBtn.forEach(item => {
        item.onclick = () => {
            productUsecase.delete(item, renderListproducts)
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
            var parsedData = JSON.parse(item.dataset.product)
            content_popup_element.querySelector('.image').src = parsedData.image;
            content_popup_element.querySelector('.name').innerText = `${parsedData.name}`;
            content_popup_element.querySelector('.price').innerText = `${parsedData.price}`;
            content_popup_element.querySelector('.category').innerText = ``;
            content_popup_element.querySelector('.created_at').innerText = `${parsedData.created_at}`;
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
                productUsecase.list(renderListproducts);
            }

            delete_popup_element.onclick = () => {
                content_popup_element.classList.remove("edit")
                productUsecase.delete(edit_popup_element, renderListproducts)
            }
        }
    })
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
        productUsecase.update(JSON.parse(item.dataset.product).id, product, renderListproducts)
    }

    cancel_popup_element.onclick = () => {
        content_popup_element.classList.remove("edit")
        content_popup_element.innerHTML = ""
        container_popup_elememt.style.display = "none"
        productUsecase.list(renderListproducts);
    }
}