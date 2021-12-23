import express from 'express'
import companyModel from "../models/company.model.js";
import formatData from "../utils/formatData.js";

const router = express();

router.get('/', async function (req, res) {
    res.locals.StaffProfile = true;
    res.render('staff/staff_profile', {
        layout:'staff.hbs'
    });
});

router.get('/contract/valid', async function (req, res) {
    const contractDataTmp = await companyModel.getAllContract();
    const contractData = [];
    for (let contract of contractDataTmp){
        // console.log("---------------------------------------------");
        const dateEndContract = formatData.addMonths(contract.NgayBatDau, contract.HieuLuc);
        // console.log("Date End : " + dateEndContract.toLocaleString());
        const nowDate = new Date();
        // console.log("Now Date : " + nowDate.toLocaleDateString())
        const diffDays = Math.abs(nowDate - dateEndContract) / (1000 * 60 * 60 * 24 );
        // console.log("duration : " + Math.floor(diffDays));

        if (dateEndContract > nowDate && diffDays > 30)
            contractData.push(contract);
        // console.log("---------------------------------------------");
    }

    let isValid = true;
    let status = 0;

    res.render('staff/contract', {
        layout:'staff.hbs',
        contractData,
        isValid,
        status
    });
});

router.post('/contract/valid', async function (req, res) {

    const idContract = req.body.idContract;
    await companyModel.updateDangGiaHanContract(idContract);

    res.redirect('/staff/contract/valid');
});

router.get('/contract/pending', async function (req, res) {
    const contractDataTmp = await companyModel.getAllContract();
    const contractData = [];
    for (let contract of contractDataTmp){
        console.log("---------------------------------------------");
        const dateEndContract = formatData.addMonths(contract.NgayBatDau, contract.HieuLuc);
        console.log("Date End : " + dateEndContract.toLocaleString());
        const nowDate = new Date();
        console.log("Now Date : " + nowDate.toLocaleDateString())
        const diffDays = Math.abs(nowDate - dateEndContract) / (1000 * 60 * 60 * 24 );
        console.log("duration : " + Math.floor(diffDays));

        if (contract.DangGiaHan === true)
            contractData.push(contract);
        console.log("---------------------------------------------");
    }
    let isPending = true;
    let status = 1;

    res.render('staff/contract', {
        layout:'staff.hbs',
        contractData,
        isPending,
        status
    });
});

router.get('/contract/expired', async function (req, res) {
    const contractDataTmp = await companyModel.getAllContract();
    const contractData = [];
    for (let contract of contractDataTmp){
        console.log("---------------------------------------------");
        const dateEndContract = formatData.addMonths(contract.NgayBatDau, contract.HieuLuc);
        console.log("Date End : " + dateEndContract.toLocaleString());
        const nowDate = new Date();
        console.log("Now Date : " + nowDate.toLocaleDateString())
        const diffDays = Math.abs(nowDate - dateEndContract) / (1000 * 60 * 60 * 24 );
        console.log("duration : " + Math.floor(diffDays));

        if (dateEndContract <= nowDate || diffDays < 30)
            if (contract.DangGiaHan !== true)
                contractData.push(contract);
        console.log("---------------------------------------------");
    }

    let isExpired = true;
    let status = 2;

    res.render('staff/contract', {
        layout:'staff.hbs',
        contractData,
        isExpired,
        status
    });
});


router.get('/contract/detail/:id', async function (req, res) {
    const idContract = req.params.id;
    const contractData = await companyModel.getContractWithID(idContract);
    const branchList = await companyModel.getBranchWithIDContract(idContract);

    let isValid = false, isPending = false, isExpired = false;
    let urlReturn = null;
    if (+req.query.status === 0){
        isValid = true;
        urlReturn = 'valid';
    }
    else if (+req.query.status === 1){
        isPending = true;
        urlReturn = 'pending';
    }
    else{
        isExpired = true;
        urlReturn = 'expired';
    }

    res.render('staff/contract_detail', {
        layout:'staff.hbs',
        contractData,
        branchList,
        isValid,
        isPending,
        isExpired,
        urlReturn
    });
});

export default router;