
function formatDate(d){
    function formatNumber(x) {
        x = String(x)
        if(x.length == 2){
            return x;
        }else{
            x = '0'+ x;
            return x;
        }
    }
    let year = d.getFullYear();
    let month = formatNumber(d.getMonth() + 1);
    let date = formatNumber(d.getDate());
    let hour = formatNumber(d.getHours());
    let minute = formatNumber(d.getMinutes());
    let second = formatNumber(d.getSeconds());
    let fullDate = `${year}-${month}-${date} ${hour}:${minute}:${second}`;

    return fullDate
}