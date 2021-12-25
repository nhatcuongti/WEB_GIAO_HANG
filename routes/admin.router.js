import express from 'express'
import accountModel from "../models/account.model.js";
import productModel from "../models/product.model.js";

const router = express();

//Manage User
//Driver
router.get('/ManageUser/driver', async function (req, res) {
    res.locals.isManageUser = true;

    const driverList = await accountModel.getAllDriver();
    res.render('admin/ManageUser_Driver', {
        layout: 'admin.hbs',
        driverList
    });
});

router.post('/ManageUser/driver', async function (req, res) {
    res.locals.isManageUser = true;

    const driverID = req.body.driverID;
    const statusChoice = req.body.statusChoice;
    await accountModel.updateAccountStatus('driver' , driverID, statusChoice)

    res.redirect('/admin/ManageUser/driver');
});

router.get('/', async function (req, res) {
    res.redirect('/admin/ManageUser/driver');
});

router.get('/ManageUser', async function (req, res) {
    res.redirect('/admin/ManageUser/driver');
});

//User
router.get('/ManageUser/user', async function (req, res) {
    res.locals.isManageUser = true;

    const userList = await accountModel.getAllUser();
    res.render('admin/ManageUser_User', {
        layout: 'admin.hbs',
        userList
    });
});

router.post('/ManageUser/user', async function (req, res) {
    res.locals.isManageUser = true;

    const userID = req.body.userID;
    const statusChoice = req.body.statusChoice;
    console.log(userID);
    await accountModel.updateAccountStatus('user' , userID, statusChoice)

    res.redirect('/admin/ManageUser/user');
});

//partner
router.get('/ManageUser/partner', async function (req, res) {
    res.locals.isManageUser = true;

    const userList = await accountModel.getAllPartner();
    res.render('admin/ManageUser_Partner', {
        layout: 'admin.hbs',
        userList
    });
});

router.post('/ManageUser/partner', async function (req, res) {
    res.locals.isManageUser = true;

    const userID = req.body.userID;
    const statusChoice = req.body.statusChoice;
    console.log(userID);
    await accountModel.updateAccountStatus('partner' , userID, statusChoice)

    res.redirect('/admin/ManageUser/partner');
});

//staff
router.get('/ManageUser/staff', async function (req, res) {
    res.locals.isManageUser = true;

    const userList = await accountModel.getAllStaff();
    console.log(userList);
    res.render('admin/ManageUser_Staff', {
        layout: 'admin.hbs',
        userList
    });
});

router.post('/ManageUser/staff', async function (req, res) {
    res.locals.isManageUser = true;

    const userID = req.body.userID;
    let statusChoice = req.body.statusChoice;
    const TKNV = req.body.TKNV;

    await accountModel.updateAccountStatus('staff', userID, statusChoice, TKNV);

    // if (statusChoice === 'lock')
    //     await accountModel.lockStaff(TKNV);
    // else if (statusChoice === 'delete')
    //     await accountModel.deleteStaff(TKNV);
    // else
    //     await accountModel.updateAccountStatus('staff' , userID, statusChoice, TKNV)

    res.redirect('/admin/ManageUser/staff');
});


//Manage Type Product
router.get('/ManageTypeProduct', async function (req, res) {
    const rawData = await accountModel.getTypeProduct();
    const typeProduct = rawData.recordset;
    // const typeProduct = [
    //     {
    //         MALOAIHANG : '1',
    //         TENLOAIHANG : 'Điện Thoại'
    //     },
    //     {
    //         MALOAIHANG : '2',
    //         TENLOAIHANG : 'Laptop'
    //     },
    //     {
    //         MALOAIHANG : '3',
    //         TENLOAIHANG : 'Nội Thất'
    //     },
    //     {
    //         MALOAIHANG : '4',
    //         TENLOAIHANG : 'Đồ Ăn'
    //     }
    // ]

    res.locals.isManageTypeProduct = true;
    res.render('admin/ManageTypeProduct', {
        layout: 'admin.hbs',
        typeProduct
    });
});

router.get('/ManageTypeProduct/add', async function (req, res) {
    res.locals.isManageTypeProduct = true;
    res.render('admin/ManageTypeProduct_add', {
        layout: 'admin.hbs'
    });
});

router.post('/ManageTypeProduct/add', async function (req, res) {
    //Insert into them loai san pham
    const typeProduct = req.body.typeProduct;
    console.log(typeProduct);
    await productModel.insertTypeProduct(typeProduct)

    res.redirect('/admin/ManageTypeProduct')
});

//Manage Places
router.get('/ManagePlaces', async function (req, res) {
    const rawData = await accountModel.getActivePlace();
    const places = rawData.recordset;
    // const places = [
    //     {
    //         MAKHUVUC : '1',
    //         TENKHUVUC : 'Thành phố Hồ Chí Minh'
    //     },
    //     {
    //         MAKHUVUC : '2',
    //         TENKHUVUC : 'Hà Nội'
    //     },
    //     {
    //         MAKHUVUC : '3',
    //         TENKHUVUC : 'Đà Nẵng'
    //     },
    //     {
    //         MAKHUVUC : '4',
    //         TENKHUVUC : 'Bình Phước'
    //     }
    // ]

    res.locals.isManagePlaces = true;
    res.render('admin/ManagePlaces', {
        layout: 'admin.hbs',
        places
    });
});

//Add places
router.get('/ManagePlaces/add', async function (req, res) {

    res.locals.isManagePlaces = true;
    res.render('admin/ManagePlaces_add', {
        layout: 'admin.hbs'
    });
});

router.post('/ManagePlaces/add', async function (req, res) {
    //Insert into them loai san pham
    const place = req.body.place;
    await productModel.insertPlace(place)

    res.redirect('/admin/ManagePlaces')
});


export default router;