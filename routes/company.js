import express from 'express';
const router = express.Router();


router.get('/product' ,async function (req, res) {
    res.render('company/product');
});
router.get('/product/add' ,async function (req, res) {
    res.render('company/addProduct');
});


router.get('/branch' ,async function (req, res) {
    res.render('company/branch');
});

router.get('/branch/add' ,async function (req, res) {
    res.render('company/addBranch');
});

router.get('/order' ,async function (req, res) {
    res.render('company/order');
});
router.get('/order/detail' ,async function (req, res) {
    res.render('company/orderDetail');
});
router.get('/contract' ,async function (req, res) {
    res.render('company/contract');
});

router.get('/contract/add' ,async function (req, res) {
    res.render('company/addContract');
});

export default router;