import express from 'express';
const router = express.Router();


router.get('/' ,async function (req, res) {
    res.render('client/client_home');
});

router.get('/list' ,async function (req, res) {
    res.render('client/client_list');
});
router.get('/my-order' ,async function (req, res) {
    res.render('client/client_myOrder');
});

export default router;