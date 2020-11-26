const express = require('express');
const Order = require('../models/Order');

var router = express.Router();

function apiAuthenticationMiddleware(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).json({error: 'Unauthenticated Request'});
}

router.get('/', apiAuthenticationMiddleware, (req, res) => {
   
    Order.find({}, (err, orders) => {
        if(err){
            console.log("Failed to retrieve orders...");
        };
       
        res.json(orders);
    });
});

router.post('/', apiAuthenticationMiddleware, (req, res) => {
    
    let orderBody = req.body;
    let userBody = req.user;

    if(!orderBody.size || !orderBody.crust || !orderBody.topping || !orderBody.sauce || !orderBody.quantity){
            return res.status(400).json({error: 'Missing required fields...Try again!'});
        }
    
    if(!userBody.username){
        return res.status(400).json({error: 'Missing username...'});
    }

    orderBody['username'] = req.user.username;

    let order = new Order(orderBody);

    order.save((err, savedOrder) => {
        if(err){
            console.log(`error ${err}`);
            res.status(500).json({
                status: 'Failed to save the order...'
            });
            return;
        }
        console.log("Saved Order", savedOrder);
        res.json({
            status: "Successfully added the order",
            id: savedOrder._id
        });
    });
});

module.exports = router;