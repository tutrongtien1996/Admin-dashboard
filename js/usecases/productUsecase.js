import { API_URL } from "../config/constant.js";
import { commonPresenter } from "../presenters/commonPresenter.js";
import { productRepository } from "../repositories/productRepository.js";
import { Helper } from "../utils/helper.js";
import { commonUsecase } from "./commonUsecase.js";

export const productUsecase = {
    list: async (callback) => {
       var response = await productRepository.list(Helper.getFilter())
       commonUsecase.displayPagination(response.count, "product")
       return callback(response.results)
    },

    create: async (callback) => {
        var product = {};
        var formData = new FormData();
        $(document).find(".product_input").each(function() {
            formData.append($(this).attr("name"), $(this).val());
        });
        product.avatar =  $("#inputAvatar")[0].files[0];
        formData.append("avatar", product.avatar);
        var response = await productRepository.create(formData)
        if (response && response.success) {
            callback()
        }
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
        
        delete_popup_element.onclick = async () => {
            var response = await productRepository.delete(JSON.parse(item.dataset.product).id)
            if (response && response.success) {
                content_popup_element.classList.remove("delete")
                container_popup_elememt.style.display = "none"
                content_popup_element.innerHTML = ""
                productUsecase.list(callback);
            } else {
                commonPresenter.alertFail("System error")
            }
        }

        cancel_popup_element.onclick = () => {
            content_popup_element.classList.remove("delete")
            content_popup_element.innerHTML = ""
            container_popup_elememt.style.display = "none"
            productUsecase.list(callback);
        }
    }
}