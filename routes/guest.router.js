import express from 'express'
import accountModel from "../models/account.model.js";

const router = express();
let data;

router.get('/', async function (req, res) {
    res.render('guest/login', {
        layout:false
    });
});

router.post('/', async function (req, res) {
    console.log('Before check account');
    const account = req.body;
    var type =  accountModel.checkAccount(account);
    console.log("After check account");
    console.log(typeof type);
    if (type === null) {
        console.log("Wrong account");
        var err_message = "Your ID or Password is not valid !!"
        res.render('guest/login', {
            layout: false,
            err_message
        });
    }

    req.session.typeAccount = type;
    req.session.authUser = req.body.username;
    req.session.auth = true;

    if (type === 'client')
        res.redirect('/client')
    else if (type === 'company')
        res.redirect('/company/product');
    else if (type === 'driver')
        res.redirect('/driver/profile');
    else if (type === 'admin')
        res.redirect('/admin')
});

router.get('/register', async function (req, res) {
    res.render('guest/register', {
        layout:false
    });
});

router.post('/register', async function (req, res) {
    const generalInfor = req.body;
    data = generalInfor;
    var type = +req.body.typeUser;
    if (type === 1)
        res.redirect("/register/client");
    else if (type === 2)
        res.redirect('/register/partner');
    else
        res.redirect('/register/driver');
})

router.get('/register/client', async function (req, res) {
    res.render('guest/register_client', {
        layout:false
    });
});

router.post('/register/client', async function (req, res) {
    console.log(data);
    console.log(req.body);
    res.render('guest/register_client', {
        layout:false
    });
});

router.get('/register/driver', async function (req, res) {
    res.render('guest/register_driver', {
        layout:false
    });
});

router.post('/register/driver', async function (req, res) {
    console.log(data);
    console.log(req.body);
    res.render('guest/register_driver', {
        layout:false
    });
});

router.get('/register/partner', async function (req, res) {
    res.render('guest/register_partner', {
        layout:false
    });
});

router.post('/register/partner', async function (req, res) {
    console.log(data);
    console.log(req.body);
    res.render('guest/register_partner', {
        layout:false
    });
});






export default router;