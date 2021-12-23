import express from 'express';
import clientModel from "../models/client.model.js";
import accountModel from "../models/account.model.js";
import productModel from "../models/product.model.js";
import orderModel from "../models/order.model.js";
import companyModel from "../models/company.model.js";
import {Login7TokenHandler} from "tedious/lib/token/handler.js";
const router = express.Router();


router.get('/' ,async function (req, res) {
    const rawData = await clientModel.getCompany();
    const companyList = rawData.recordset;
    res.render('client/client_home', {
        layout:'client.hbs',
        companyList
    });
});

router.get('/branch/:id' ,async function (req, res) {
    const idCompany = req.params.id;
    const rawData = await companyModel.getBranch(idCompany);
    const branchList = rawData.recordset;
    res.render('client/client_home_branch', {
        layout:'client.hbs',
        branchList
    });
});

router.get('/product/:idCompany/:idBranch' ,async function (req, res) {
    const idCompany = req.params.idCompany;
    const idBranch = req.params.idBranch;
    const rawData = await clientModel.getProductOfCompany(idCompany, idBranch);
    const products = rawData.recordset;
    res.render('client/client_product', {
        layout: 'client.hbs',
        products,
        idCompany,
        idBranch
    });
});

router.post('/product' ,async function (req, res) {
    const newAddProduct = req.body;
    const cart = req.session.cart;

    let isExists = false;
    for (const product of cart)
        if (product.idProduct === newAddProduct.idProduct){
            product.numberProduct += +newAddProduct.numberProduct;
            isExists = true;
            break;
        }

    if (!isExists){
        let number = +newAddProduct.numberProduct;
        newAddProduct.numberProduct = number;
        cart.push(newAddProduct);
    }


    const url = req.headers.referer
    res.redirect(url);
});


router.get('/list' ,async function (req, res) {
    //Get account with ID
    const idAccount = req.session.authIDUser;
    const myAccount = await accountModel.getAccountClientWithID(idAccount);
    //get product
    const cart = req.session.cart;
    if (cart.length === 0){
        return res.render('client/client_list', {
            layout: 'client.hbs',
            cart
        })
    }
    let totalPriceProduct = 0;

    for (const product of cart){
        const findProduct = await productModel.getNameProductWithID(product.idProduct);
        product.price = findProduct.price;
        product.name = findProduct.name;

        totalPriceProduct += product.price * product.numberProduct;
    }

    res.render('client/client_list', {
        layout: 'client.hbs',
        cart,
        myAccount,
        totalPriceProduct
    });
});

router.post('/list', async (req, res) => {
    await orderModel.insertOrder(req.body, req.session.cart);
    req.session.cart = [];
    res.redirect('/client');
})

router.get('/my-order' ,async function (req, res) {
    const idAccount = req.session.authIDUser;
    const orderData = await orderModel.getAllOrder(idAccount);
    res.render('client/client_myOrder', {
        layout: 'client.hbs',
        orderData
    });
});

router.get('/my-order/detail/:id' ,async function (req, res) {
    const idOrder = req.params.id;
    const orderDetailData = await orderModel.getOrderDetail(idOrder);
    const listProducts = await orderModel.getProductWithOrder(idOrder);
    console.log("Order Detail : ");
    console.log(orderDetailData);
    console.log("Product list");
    console.log(listProducts);
    let totalPriceProduct = 0;
    for (const product of listProducts)
        totalPriceProduct += (product.price * product.number);
    res.render('client/client_myOrder_detail', {
        layout: 'client.hbs',
        orderDetailData,
        listProducts,
        totalPriceProduct
    });
});


export default router;