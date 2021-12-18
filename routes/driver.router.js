import express from 'express'

const router = express();

//Profile
router.get('/profile', async function (req, res) {
    res.render('driver/driver_profile', {
        layout: 'driver.hbs'
    });
});

//Delivery
//Find Near You
router.get('/delivery', async function (req, res) {
    res.render('driver/driver_order_NearYou', {
        layout: 'driver.hbs'
    });
});

//Find search
router.get('/delivery/search', async function (req, res) {
    res.render('driver/driver_order_search', {
        layout: 'driver.hbs'
    });
});

//Purchase
router.get('/purchase', async function (req, res) {
    res.render('driver/driver_order_summary', {
        layout: 'driver.hbs'
    });
});




export default router;