$(function ready(){

    let foundOrders = [];
    
    function checkUsername(dataUsername, loggingName){
        if(dataUsername == loggingName){
            return true;
        }else{
            return false;
        }
    };

    $.getJSON("/api/order", function (data) {

        let loggingName = $('#order-name').html();
        data.forEach(each => {
            if(checkUsername(each.username, loggingName)){
                foundOrders.push(each);
            }
        })

        foundOrders.forEach(order => {
            let element = "<div class='row'><ul><li>"
                        + order.createdOn + "</li>"
                        + "<li>Size: "+ order.size + "</li>"
                        + "<li>Crust: "+ order.crust + "</li>"
                        + "<li>Topping: "+ order.topping + "</li>"
                        + "<li>Sauce: "+ order.sauce + "</li>"
                        + "<li>Quantity: "+ order.quantity
                        +"</li></ul></div>"
            $(".each-order").append(element); 
        });  
    });
});