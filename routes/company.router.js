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
    const id = req.session.authIDUser;
    const branch = await companyModel.getBranchByID(id)


    res.render('company/branch', {
        data: branch.recordset
    });
});



router.get('/branch/add' ,async function (req, res) {
    var list = await companyModel.getActivityZone();
    res.render('company/addBranch', {
        data: list.recordset
    });
});

router.post('/branch/add' ,async function (req, res) {
    const idUser = req.session.authIDUser;
    var temp = await companyModel.getBranch(idUser)
    var id = companyModel.increaBranchID(temp.recordset)
    req.body.name = id;

    const check = await companyModel.insertBranch(req.body, idUser);
    res.redirect('/company/branch');
});

router.post('/branch/del' ,async function (req, res) {
    const idUser = req.session.authIDUser;
    const idBra = req.body.id
    await companyModel.deleteBranch(idBra, idUser)
    res.redirect('back');
});

router.get('/branch/update' ,async function (req, res) {
    var list = await companyModel.getActivityZone();
    console.log(list.recordset)
    res.render('company/updateBranch', {
        data:[ req.query],
        list: list.recordset
    });
});

router.post('/branch/update' ,async function (req, res) {
    const idUser = req.session.authIDUser;
    console.log(req.body)
    companyModel.updateBranch(req.body.id, idUser, req.body.address)
    res.redirect('/company/branch')
});

router.get('/order' ,async function (req, res) {
    const idUser = req.session.authIDUser;
    const list = await companyModel.getOrderByID(idUser)
    res.render('company/order',{
        data: list.recordset
    });
});
router.get('/order/detail' ,async function (req, res) {
    const id = req.query.id
    const list = await companyModel.getOrderByOrderID(req.query.id)
    const listProduct = await companyModel.getProductDetailByOrderID(req.query.id)
    const total = parseFloat(list.recordset[0].PhiVanChuyen) + parseFloat(list.recordset[0].PhiSanPham)
    console.log(listProduct.recordset);
    res.render('company/orderDetail', {
        data: list.recordset,
        total:total,
        listProduct:listProduct.recordset
    });
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