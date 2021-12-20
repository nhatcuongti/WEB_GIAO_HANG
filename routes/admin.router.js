import express from 'express'

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
    res.redirect('/admin/ManageUser/driver', {
        layout: 'admin.hbs'
    });
});

router.get('/ManageUser', async function (req, res) {
    res.redirect('/admin/ManageUser/driver', {
        layout: 'admin.hbs'
    });
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
router.get('/ManageReport', async function (req, res) {
    res.locals.isManageReport = true;
    res.render('admin/ManageReport', {
        layout: 'admin.hbs'
    });
});

//Manage Updates
router.get('/ManageUpdate', async function (req, res) {
    res.locals.isManageUpdate = true;
    res.render('admin/ManageUpdates', {
        layout: 'admin.hbs'
    });
});

router.get('/ManageUpdate/detail', async function (req, res) {
    res.locals.isManageUpdate = true;
    res.render('admin/ManageUpdates_detail', {
        layout: 'admin.hbs'
    });
});



export default router;