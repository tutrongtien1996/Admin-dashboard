import { productUsecase } from "../usecases/productUsecase.js";
import { Helper } from "../utils/helper.js";
import { commonPresenter } from "./commonPresenter.js";

var activeProduct = {}

function resetProduct() {
    $("#file-div-preview").removeClass("d-block");
    $("#file-div-preview").addClass("d-none");
    $('#productForm').trigger("reset");
}


function start() {
    resetProduct();
    Helper.setFilter();
    $(document).ready(() => productUsecase.list(renderListproducts))
    $("#addBtn").on("click", showProductFormModal)
    $(document).on("click", ".viewBtn", function () { showInfoProduct(this) })
    $(document).on("click", ".editBtn", function () { showEditProduct(this) })
    $(document).on("click", ".deleteBtn", function () { showEditProduct(this) })
    $("input[name='avatar']").on("change", commonPresenter.showPreview)
    $("#saveBtn").on("click", () => productUsecase.create(refreshPage))
}
start()

function refreshPage() {
    location.reload();
}

function showProductFormModal() {
    resetProduct();
    $("#productForm").attr("action", "POST")
    $("#productFormPopup").modal("show");
}

function renderListproducts(list){
    let renderProducts = document.querySelector(".renderproducts tbody");
    var html = "";
    list.forEach(item => {
        html += item.toHTMLTable()
    });
    renderProducts.innerHTML = html;
}

function getDataProduct(element) {
    var dataEle = $(element).parent();
    if (dataEle) {
        var dataStr = $(dataEle).attr("data-product");
        if (!dataStr) {
            commonPresenter.alertFail("System error")
        } else {
            activeProduct = JSON.parse(dataStr)
        }
    }
}

function showInfoProduct(element) {
    getDataProduct(element);
    $("#detail_name").val(activeProduct.name)
    $("#detail_price").val(activeProduct.price)
    $("#detail_image").attr("src", activeProduct.image)
    $("#productDetailPopup").modal("show");
}

function showEditProduct(element) {
    getDataProduct(element);
    $("#productForm").attr("action", "UPDATE")
    $("#productForm").find(".product_input[name='name']").val(activeProduct.name)
    $("#productForm").find(".product_input[name='price']").val(activeProduct.price)
    $("#productFormPopup").modal("show");
}


function deleteproduct() {
    let deleteBtn = document.querySelectorAll(".status.return");
    deleteBtn.forEach(item => {
        item.onclick = () => {
            productUsecase.delete(item, renderListproducts)
        }
    })
}