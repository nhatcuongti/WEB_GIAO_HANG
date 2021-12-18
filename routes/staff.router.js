import express from 'express'

const router = express();

router.get('/', async function (req, res) {
    res.render('staff/staff_profile', {
        layout:'staff.hbs'
    });
});

router.get('/contract/valid', async function (req, res) {
    res.render('staff/contract_valid', {
        layout:'staff.hbs'
    });
});

router.get('/contract/pending', async function (req, res) {
    res.render('staff/contract_pending', {
        layout:'staff.hbs'
    });
});

router.get('/contract/detail', async function (req, res) {
    res.render('staff/contract_detail', {
        layout:'staff.hbs'
    });
});
export default router;