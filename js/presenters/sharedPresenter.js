import { SampleProductRepository } from "../repositories/sampleProductRepository.js";
import { PaymentMethodRepository } from "../repositories/paymentMethodRepository.js";

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
            
            let business_id = businessElement.value;
            await sharedPresenter.addDataSample(business_id);
            await sharedPresenter.paymentSample();
            document.querySelector(".popup_contai_sample").style.display = "none";
            location.reload();  
            localStorage.removeItem("register")
        }

        document.querySelector(".popup_contai_sample .cancel").onclick = () => {
            localStorage.removeItem("register")
            document.querySelector(".popup_contai_sample").style.display = "none";
        } 
    },

    addDataSample: async function (id){
            let business_id = id;
            let sample_products = await SampleProductRepository.list(business_id);
            await SampleProductRepository.createProducts(sample_products); 
    },

    paymentSample: async function(){
        let pament_sample = await PaymentMethodRepository.listSample();
        await PaymentMethodRepository.createPayments(pament_sample);
    }
}