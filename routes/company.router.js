import express from 'express';
const router = express.Router();
import companyModel from "../models/company.model.js";

router.get('/product' ,async function (req, res) {
    const idUser = req.session.authIDUser;
    var temp = await companyModel.getProductByComID(idUser)
    res.render('company/product',{
        data: temp.recordset
    });
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
    console.log(list.data.docs[0].orders);
    res.render('company/order',{
        data: list.data.docs[0].orders
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
    const idUser = req.session.authIDUser;
    var temp = await companyModel.getContract(idUser)
    res.render('company/contract',{
        data: temp.recordset
    });
});

router.get('/contract/add' ,async function (req, res) {
    const idUser = req.session.authIDUser;
    const br =    await companyModel.getBranchNullConstract(idUser)
     console.log(idUser)
    res.render('company/addContract',{
        data: br.recordset,
        idUser: idUser
    });
});
router.get('/contract/update' ,async function (req, res) {
    const idUser = req.session.authIDUser;
    const idContract = req.query.id;
    const br =    await companyModel.getBranchNullConstract(idUser)
    console.log(br)
    res.render('company/updateContract',{
        data: br.recordset,
        idUser: idUser,
        idContract: idContract
    });
});
router.post('/contract/update' ,async function (req, res) {
    const idUser = req.session.authIDUser;
    await companyModel.insertNewBranchToContract(req.body.selection, idUser, req.body.maHD)
    res.redirect('/company/contract')
});


router.post('/contract/add' ,async function (req, res) {
    const idUser = req.session.authIDUser;
    var temp = await companyModel.getAllContractID(idUser)
    var id = companyModel.increaContractID(temp.recordset)
    var count
    if((typeof req.body.selection) === "string")
        count = 1;
    else
        count = Object.keys(req.body.selection).length
    const check = await companyModel.insertContract(id,idUser,req.body.daidien,count
        ,req.body.date,req.body.time)
    console.log(check)
    console.log()
    if(Object.keys(check.recordsets).length === 0)
        await companyModel.updateBranch_Contract(req.body.selection,idUser,id)
    res.redirect('/company/contract')
});

export default router;