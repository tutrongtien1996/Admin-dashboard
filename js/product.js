

var option = {
    method: "GET",
    headers: {
        'Authorization': "Bearer "+localStorage.getItem('access_token')
    }
};
function start(){
    getListProduct(result =>{
        return result;
    });
}
start()

function getListProduct(callback){
    fetch(API_URL + '/public/source/api_items', option)
        .then(reponse => {
            return reponse.json()
        })
        .then(callback)
}


