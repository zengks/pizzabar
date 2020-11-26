const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    lastName: String,
    firstName: String,
    address: String,
    phone: Number,
    street: String,
    suite: Number,
    city: String,
    province: String,
    postal: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);