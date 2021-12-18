import express from 'express'

const router = express();

//Manage User
//Driver
router.get('/ManageUser/driver', async function (req, res) {
    res.locals.isManageUser = true;
    res.render('admin/ManageUser_Driver');
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
    res.render('admin/ManageUser_User');
});

//partner
router.get('/ManageUser/partner', async function (req, res) {
    res.locals.isManageUser = true;
    res.render('admin/ManageUser_Partner');
});

//staff
router.get('/ManageUser/staff', async function (req, res) {
    res.locals.isManageUser = true;
    res.render('admin/ManageUser_Staff');
});

//Manage Report
router.get('/ManageReport', async function (req, res) {
    res.locals.isManageReport = true;
    res.render('admin/ManageReport');
});

//Manage Updates
router.get('/ManageUpdate', async function (req, res) {
    res.locals.isManageUpdate = true;
    res.render('admin/ManageUpdates');
});

router.get('/ManageUpdate/detail', async function (req, res) {
    res.locals.isManageUpdate = true;
    res.render('admin/ManageUpdates_detail');
});



export default router;