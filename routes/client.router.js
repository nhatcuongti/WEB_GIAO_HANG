import express from 'express';
import clientModel from "../models/client.model.js";
import accountModel from "../models/account.model.js";
import productModel from "../models/product.model.js";
import orderModel from "../models/order.model.js";
import companyModel from "../models/company.model.js";
const router = express.Router();


router.get('/' ,async function (req, res) {
    const companyList = await clientModel.getCompany();
    res.render('client/client_home', {
        layout:'client.hbs',
        companyList
    });
});

router.get('/branch/:id' ,async function (req, res) {
    const idCompany = req.params.id;
    // const branchList = companyModel.getBranch(idCompany);
    const branchList = [
        {
            MaChiNhanh : '1',
            MaDoanhNghiep : idCompany,
            DiaChi : 'Thành Phố Hồ Chí Minh, Quận 10'
        },
        {
            MaChiNhanh : '2',
            MaDoanhNghiep : idCompany,
            DiaChi : 'Bình Phước'
        },
        {
            MaChiNhanh : '1',
            MaDoanhNghiep : idCompany,
            DiaChi : 'Hà Nội'
        }
    ]
    res.render('client/client_home_branch', {
        layout:'client.hbs',
        branchList
    });
});

router.get('/product/:idCompany/:idBranch' ,async function (req, res) {
    const idCompany = req.params.idCompany;
    const idBranch = req.params.idBranch;
    const products = await clientModel.getProductOfCompany(idCompany, idBranch);
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
    const myAccount = await accountModel.getAccountClientWithID('1');
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
    console.log("Post list ");
    console.log(req.body);
    console.log(req.session.cart);
    //Insert database

    res.redirect('/client');
})

router.get('/my-order' ,async function (req, res) {
    const orderData = await orderModel.getAllOrder('1');
    res.render('client/client_myOrder', {
        layout: 'client.hbs',
        orderData
    });
});

router.get('/my-order/detail' ,async function (req, res) {
    const orderDetailData = await orderModel.getOrderDetail('1');
    const listProducts = await orderModel.getProductWithOrder('1');
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