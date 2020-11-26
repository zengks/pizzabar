$(function ready() {

    $("#submitPizzaChoices").submit(function (event){
        event.preventDefault();
        var toppings = [];
        var sauces = [];
        var i = 0;
        var j = 0;

        $('input[name=sauce]:checked').each(function () {
           sauces[i++] = $(this).val();
        });

        $('input[name=topping]:checked').each(function () {
            toppings[j++] = $(this).val();
         }); 
        
        var pizzaChoices = JSON.stringify({
            size: $("input[name=size]:checked","#submitPizzaChoices").val(),
            crust: $("input[name=crust]:checked","#submitPizzaChoices").val(),
            topping: toppings,
            sauce: sauces,
            quantity: parseInt($('#quantity').val()),
            status: {
                created: true,
                confirmed: false
            }
        });

        console.log("Pizza Choices with username: ", pizzaChoices);
        
        $.ajax({

            url: '/api/order',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: pizzaChoices,
    
            success: function(json, status, request){
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-success');
                $('#statusMsg').html('Added the order');
                console.log("successful order added status: ", status);
            },
            
            error: function(request, status){
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-danger');
                $('#statusMsg').html('Error adding the order');
                console.log('Request failed : ', status);
            }
        });
        
        window.location.replace("/orderDetails");

    });
});

