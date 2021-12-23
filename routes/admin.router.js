import express from 'express'
import accountModel from "../models/account.model.js";

const router = express();

//Manage User
//Driver
router.get('/ManageUser/driver', async function (req, res) {
    res.locals.isManageUser = true;
    res.render('admin/ManageUser_Driver', {
        layout: 'admin.hbs'
    });
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
    res.render('admin/ManageUser_User', {
        layout: 'admin.hbs'
    });
});

//partner
router.get('/ManageUser/partner', async function (req, res) {
    res.locals.isManageUser = true;
    res.render('admin/ManageUser_Partner', {
        layout: 'admin.hbs'
    });
});

//staff
router.get('/ManageUser/staff', async function (req, res) {
    res.locals.isManageUser = true;
    res.render('admin/ManageUser_Staff', {
        layout: 'admin.hbs'
    });
});

//Manage Report
// router.get('/ManageReport', async function (req, res) {
//     res.locals.isManageReport = true;
//     res.render('admin/ManageReport', {
//         layout: 'admin.hbs'
//     });
// });

//Manage Updates
// router.get('/ManageUpdate', async function (req, res) {
//     res.locals.isManageUpdate = true;
//     res.render('admin/ManageUpdates', {
//         layout: 'admin.hbs'
//     });
// });

// router.get('/ManageUpdate/detail', async function (req, res) {
//     res.locals.isManageUpdate = true;
//     res.render('admin/ManageUpdates_detail', {
//         layout: 'admin.hbs'
//     });
// });


router.get('/ManageTypeProduct', async function (req, res) {
    // const typeProduct = await accountModel.getTypeProduct();
    const typeProduct = [
        {
            MALOAIHANG : '1',
            TENLOAIHANG : 'Điện Thoại'
        },
        {
            MALOAIHANG : '2',
            TENLOAIHANG : 'Laptop'
        },
        {
            MALOAIHANG : '3',
            TENLOAIHANG : 'Nội Thất'
        },
        {
            MALOAIHANG : '4',
            TENLOAIHANG : 'Đồ Ăn'
        }
    ]

    res.locals.isManageTypeProduct = true;
    res.render('admin/ManageTypeProduct', {
        layout: 'admin.hbs',
        typeProduct
    });
});

router.get('/ManagePlaces', async function (req, res) {
    // const places = await accountModel.getActivePlace();
    const places = [
        {
            MAKHUVUC : '1',
            TENKHUVUC : 'Thành phố Hồ Chí Minh'
        },
        {
            MAKHUVUC : '2',
            TENKHUVUC : 'Hà Nội'
        },
        {
            MAKHUVUC : '3',
            TENKHUVUC : 'Đà Nẵng'
        },
        {
            MAKHUVUC : '4',
            TENKHUVUC : 'Bình Phước'
        }
    ]

    res.locals.isManagePlaces = true;
    res.render('admin/ManagePlaces', {
        layout: 'admin.hbs',
        places
    });
});


export default router;