export const commonPresenter = {
    alertFail: (title) => {
        alert(title)
    },
    showPagination: (count, nameTemplate) => {
        var htmlBtn ='';
        try {
            var number_of_pages = getNumberOfPage(count, Filter.limit)
        } catch (error) {
            var number_of_pages = 1;
        }
        if(number_of_pages > 1){
           
            document.getElementsByClassName('startDate')[0].value =  Filter.start_date;
            document.getElementsByClassName('endDate')[0].value =  Filter.end_date;
            htmlBtn += `<li><a href="${nameTemplate}.html?page=all&start_date=${Filter.start_date}&end_date=${Filter.end_date}">All</a></li>`
            for(var i = 0; i < number_of_pages; i++){
                htmlBtn += `<li><a href="${nameTemplate}.html?page=${i+1}&start_date=${Filter.start_date}&end_date=${Filter.end_date}">${i + 1}</a></li>`
            }
            document.querySelector(".details .recentOrders .pages ul").innerHTML = htmlBtn;
        }
        
    },
    showPreview(event){
        if(event.target.files.length > 0){
            var src = URL.createObjectURL(event.target.files[0]);
            var preview = $("#file-div-preview").find("img");
            $(preview).attr("src", src);
            $("#file-div-preview").removeClass("d-none");
            $("#file-div-preview").addClass("d-block");
        }
    }
}