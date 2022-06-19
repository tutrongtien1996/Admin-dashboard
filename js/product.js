

// 

var option = {
    headers: {
        'Authorization': "Bearer "+localStorage.getItem('access_token')
    }
};

function start(){
    getListProduct(renderListProduct)
}
start();

function getListProduct(callback){
    axios.get(API_URL + '/public/source/api_items', option)
        .then((reponse) => {
            var productEntity = new Product();
            var listProducts = productEntity.parseFromAPI(reponse.data.data)
            callback(listProducts)
        })
        .catch(function (error) {
            console.log(error)
        })
}


function renderListProduct(listProducts){
    var html = "";
    listProducts.forEach(element => {

        html += `<li class="item">
                <div data-product='${element.toJson()}'>
                    ${renderImage(element.image)}
                    <h3>${element.name}</h3>
                    <h4>${Util.formatNumber(element.price)}đ / kg</span></h4>
                    </div>
                </li>`
        });
    document.getElementsByClassName("listProducts")[0].innerHTML = html;

    // document.getElementsByClassName('listProducts').innerHTML = html;
}
const renderImage = (image) => {
    if (image != "") {
       return `<img src="${image}" onerror="this.src='/img/products/quan_ao_thong_thuong.jpeg'"/>`;
    } 
    return `<img src="/img/products/quan_ao_thong_thuong.jpeg"/>`;

}
setTimeout(function(){
    var listItems = document.querySelectorAll(".listProducts .item div");
    renderCustomer(listItems);
}, 1000)

function renderCustomer(listItems){
    var html = "";
    listItems.forEach(item => {
        item.onclick = () =>{
        var result = JSON.parse(item.dataset.product);
        html += `<li class="item">
            <div class="content_item">
                <span class="item_name">${result.name}</span>
                <div class="item_quantity"><input type="number"></div>
                <span class="item_price">${result.price}</span>
            </div>
        </li>`
        
        document.getElementsByClassName("listCustomers")[0].innerHTML = html;
        }
        
    });
    
}
