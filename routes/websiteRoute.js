const passport = require('passport');
const router = require('express').Router();
const Account = require('../models/Account');

function authenticationMiddleware(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/login');
}

router.get('/login', (req, res)=>{
    res.render('login', {});
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), (req, res) => {
    res.redirect('/');
});

router.get('/register', (req, res)=>{
    res.render('register', {});
});

router.post('/register', (req, res, next)=>{
    Account.register(new Account({username: req.body.username, phone: req.body.phone,
                                    street: req.body.street, suite: req.body.suite,
                                    city: req.body.city, province: req.body.province,
                                    postal: req.body.postal}), req.body.password, (err) => {
        if(err){
            console.log('error during user registration!', err);
            return next(err);
        }

        console.log('user registered!');
        res.redirect('/');
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

router.get('/', authenticationMiddleware, (req, res) => {
    console.log('Inside / user: ', req.user.username);
    res.render('index');
});

router.get('/order', (req, res) => {
    res.render('order', {});
});

router.get('/orderDetails', (req, res) => {
    res.render('orderDetails', {username: req.user.username});
});

router.get('/delivery-time', (req, res) => {
    res.render('delivery-time', {});
});

router.get('/orderHistory', (req, res)=>{
    let name = req.user.username;
    res.render('orderHistory', {username: name});
});

module.exports = router;