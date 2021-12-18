import express from 'express'

const router = express();

router.get('/', async function (req, res) {
    res.render('guest/login', {
        layout:false
    });
});

router.get('/register', async function (req, res) {
    res.render('guest/register', {
        layout:false
    });
});

router.get('/register/client', async function (req, res) {
    res.render('guest/register_client', {
        layout:false
    });
});

router.get('/register/driver', async function (req, res) {
    res.render('guest/register_driver', {
        layout:false
    });
});

router.get('/register/partner', async function (req, res) {
    res.render('guest/register_partner', {
        layout:false
    });
});






export default router;