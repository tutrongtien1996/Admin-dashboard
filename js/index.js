
function start() {
    getListOrders(renderListOrders);
}

start();

function getListOrders(callback) {
    fetch(API_URL+'/source/api_orders?offset=0&limit=25&start_date=2022-06-08&end_date=2022-06-08&filters%5B%5D=',
        {
            method: "GET",
            headers: {
                'Authorization': "Bearer "+localStorage.getItem('access_token')
            }
        })
        .then(function(response){
            return response.json();
        })
        .then(callback)
}

function renderListOrders(result) {

}