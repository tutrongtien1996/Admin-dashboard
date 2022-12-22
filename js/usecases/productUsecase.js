import { API_URL } from "../config/constant.js";
import { productRepository } from "../repositories/productRepository.js";
import { Helper } from "../utils/helper.js";
import { commonPresenter } from "./commonUsecase.js";

export const productUsecase = {
    list: async (callback) => {
       var response = await productRepository.list(Helper.getFilter())
       commonPresenter.displayPagination(response.count, "product")
       return callback(response.results)
    },

    create: (product, callback) => {
        let container_popup_elememt = document.querySelector(".container_popup");
        let content_popup_element = document.querySelector(".popup_content");
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
                productUsecase.list(callback);
            })
            .catch((err) => {
                console.log(err)
            })
    },

    update: async (id, product, callback) => {
        let container_popup_elememt = document.querySelector(".container_popup");
        let content_popup_element = document.querySelector(".popup_content");
        container_popup_elememt.style.display = "block"
        content_popup_element.classList.remove("edit")
        content_popup_element.classList.add("edit")

        product.name = content_popup_element.querySelector('input[name="name"]').value;
        product.price = content_popup_element.querySelector('input[name="price"]').value;
        // product.category_id = document.querySelector('#address_edit').value;
        var formData = new FormData();
        formData.append("avatar", product.avatar);
        formData.append("name", product.name);
        formData.append("price", product.price);
        axios.patch(API_URL + "/admin/products/"+id, formData, {
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

            productUsecase.list(callback);
        })
        .catch((err) => {
            if (err) throw err
        })
    },

    delete: async (item, callback) => {
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
            axios.delete(API_URL + '/admin/products/'+JSON.parse(item.dataset.product).id, Helper.requestOption)
            .then((response) => {
                content_popup_element.classList.remove("delete")
                container_popup_elememt.style.display = "none"
                content_popup_element.innerHTML = ""

                productUsecase.list(callback);
            })
            .catch((err) => {
                console.log(err)
            })
        }

        cancel_popup_element.onclick = () => {
            content_popup_element.classList.remove("delete")
            content_popup_element.innerHTML = ""
            container_popup_elememt.style.display = "none"
            productUsecase.list(callback);
        }
    }
}