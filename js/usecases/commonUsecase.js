import { Helper } from "../utils/helper.js";

function _getNumberOfPage(count, limit) {
    if (limit == 0) {
        throw("Limit can not be zero");
    }
    var number_of_pages = Math.floor(count / limit);
    var numberMod = count % limit;
    if(numberMod > 0){
        number_of_pages +=1;
    }
    return number_of_pages;
}


export const commonUsecase = {
   displayPagination: (count, nameTemplate) => {
        var htmlBtn ='';
        try {
            var number_of_pages = _getNumberOfPage(count, Helper.getFilter().limit)
        } catch (error) {
            var number_of_pages = 1;
        }
        if(number_of_pages > 1){
            console.log(number_of_pages)
            htmlBtn += `<li><a href="${nameTemplate}.html?limit=-1&start_date=${Helper.getFilter().start_date}&end_date=${Helper.getFilter().end_date}">All</a></li>`
            for(var i = 0; i < number_of_pages; i++){
                htmlBtn += `<li><a href="${nameTemplate}.html?page=${i+1}&start_date=${Helper.getFilter().start_date}&end_date=${Helper.getFilter().end_date}">${i + 1}</a></li>`
            }
            document.querySelector(".details .recentOrders .pages ul").innerHTML = htmlBtn;
        }
   }
}