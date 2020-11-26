const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    size: String,
    crust: String,
    topping: [String],
    sauce: [String],
    quantity: Number,
    username: String,
    status: {
        created: false,
        confirmed: false
    },
    createdOn: {type: Date, default: Date.now}
    
});

module.exports = mongoose.model('Order', orderSchema);