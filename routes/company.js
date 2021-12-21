import express from 'express';
const router = express.Router();
import companyModel from "../models/company.model.js";

router.get('/product' ,async function (req, res) {
    res.render('company/product');
});
router.get('/product/add' ,async function (req, res) {
    res.render('company/addProduct');
});


router.get('/branch' ,async function (req, res) {
    const branch = await companyModel.getBranch('dn01')
    res.render('company/branch', {
        data: branch.recordset
    });
});



router.get('/branch/add' ,async function (req, res) {
    res.render('company/addBranch');
});

router.post('/branch/add' ,async function (req, res) {
    const check = await companyModel.insertBranch(req.body);
    res.redirect('/company/branch');
});

router.post('/branch/del' ,async function (req, res) {
    const idBra = req.body.id
    await companyModel.deleteBranch(idBra, 'dn01')
    res.redirect('back');
});

router.get('/branch/update' ,async function (req, res) {
    res.render('company/updateBranch', {
        data:[ req.query]
    });
});

router.post('/branch/update' ,async function (req, res) {
    companyModel.updateBranch(req.body.id, 'dn01', req.body.address)
    res.redirect('/company/branch')
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
    const br =    await companyModel.getBranchNullConstract('dn01')
    console.log(br.recordset)
    res.render('company/addContract',{
        data: br.recordset
    });
});
router.post('/contract/add' ,async function (req, res) {
    console.log(req.body)
    // res.render('company/addContract',{
    //     data: br.recordset
    // });
});

export default router;