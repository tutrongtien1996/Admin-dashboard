export const Helper =  {
    playSound: () => {
        const sound = new Audio();
        sound.src = "../assets/sound/beep.mp3";
        sound.play();
        // sound.onended = () => delete(sound);
    },
    errorSound: () => {
        const sound = new Audio();
        sound.src = "../assets/sound/error.mp3";
        sound.play();
        // sound.onended = () => delete(sound);
    },
    getValueFromUrl: (param)  =>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(param)
    },
    filter: {  
        limit: 20, //số lượng orders trên mỗi trang: mặc định 20
        offset: 0, //vị trí đầu tiên trong danh sách order của mỗi trang, (trạng hiện tại - 1)*limit
        start_date: Util.getCurrentDay(), //lọc order theo ngày bắt đầu, mặc địch là ngày hiện tại
        end_date: Util.getCurrentDay() //lọc order theo ngày kết thúc, mặc định là ngày hiện tại
    },
    getFilter: () => {
        return Helper.filter
    },
    setFilter: () => {
        var page = Helper.getValueFromUrl('page');
        
        if (page == null) {
            page = 1;
        }
        if(page != 'all'){
            Helper.filter.offset = (Helper.filter.limit) * (parseInt(page) - 1); 
        }
        
        var start_date = Helper.getValueFromUrl('start_date');
        if(start_date != null){
            Helper.filter.start_date = start_date;
        }
        var end_date = Helper.getValueFromUrl('end_date');
        if(end_date != null){
            Helper.filter.end_date = end_date;
        }
        if(page == 'all'){

            Helper.filter.offset = 0;
            Helper.filter.limit = 10000;
            console.log(Helper.filter)
        }
        //set value to input
        if(document.getElementsByClassName('startDate')[0] && document.getElementsByClassName('endDate')[0].value){

            document.getElementsByClassName('startDate')[0].value =  Util.FormatVNDate(new Date(Helper.filter.start_date));
            document.getElementsByClassName('endDate')[0].value =  Util.FormatVNDate(new Date(Helper.filter.end_date));
        
        }
    },
    requestOption: {
        headers: {
            'Authorization': "Bearer "+localStorage.getItem("access_token")
        }
    }
}
