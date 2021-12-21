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
    var temp = await companyModel.getBranch('dn01')
    var id = companyModel.increaBranchID(temp.recordset)
    req.body.name = id;
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
    var temp = await companyModel.getContract('dn01')
    res.render('company/contract',{
        data: temp.recordset
    });
});

router.get('/contract/add' ,async function (req, res) {
    const br =    await companyModel.getBranchNullConstract('dn01')
    // console.log(br.recordset)
    res.render('company/addContract',{
        data: br.recordset
    });
});
router.post('/contract/add' ,async function (req, res) {
    var temp = await companyModel.getContract('dn01')
    var id = companyModel.increaContractID(temp.recordset)
    await companyModel.insertContract(id,'dn01',req.body.daidien,
        Object.keys(req.body.selection).length,req.body.date,req.body.time)
    console.log(req.body.selection)
    await companyModel.updateBranch_Contract(req.body.selection,'dn01',id)
    res.redirect('/company/contract')
});

export default router;