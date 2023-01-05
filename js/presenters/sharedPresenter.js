import { SampleProductRepository } from "../repositories/sampleProductRepository.js";

export const sharedPresenter = {
    handleDataSample: async function (){
        let list_business = await SampleProductRepository.listBusiness();
        let businessElement = document.querySelector(".popup_contai_sample select");
        let html = "";
        list_business.forEach(business => {
            html += `<option value="${business.id}">${business.name}</option>`
        });
        businessElement.innerHTML = html;
        document.querySelector(".popup_contai_sample").style.display = "block"
        document.querySelector(".popup_contai_sample .process").onclick = async () => {
            
            await sharedPresenter.addDataSample()
            document.querySelector(".popup_contai_sample").style.display = "none";
            location.reload();  
        }

        document.querySelector(".popup_contai_sample .cancel").onclick = () => {
            localStorage.removeItem("register")
            document.querySelector(".popup_contai_sample").style.display = "none";
        } 
    },

    addDataSample: async function (){
            let business_id = 1
            let sample_products = await SampleProductRepository.list(business_id);
            await SampleProductRepository.createProducts(sample_products);
            localStorage.removeItem("register")
    }
}