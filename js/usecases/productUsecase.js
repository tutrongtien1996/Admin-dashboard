import { API_URL } from "../config/constant.js";
import { productRepository } from "../repositories/productRepository.js";
import { commonPresenter } from "./commonUsecase.js";

export const productUsecase = {
    list: async (callback) => {
       var response = await productRepository.list()
       commonPresenter.displayPagination(response.count, "product")
       return callback(response.results)
    },

    delete: async (item) => {
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
}