import express from 'express';
import clientModel from "../models/client.model.js";
import accountModel from "../models/account.model.js";
import productModel from "../models/product.model.js";
import orderModel from "../models/order.model.js";
import companyModel from "../models/company.model.js";
import couch from "../utils/couchDB.js";

const dbName = "delivery";
const router = express.Router();


router.get('/' , function (req, res) {
    clientModel.getCompany().then(
        function (data, headers, status){
            const companyList = [];
            const rawData = data.data.docs;
            for (const data of rawData){
                companyList.push({
                    "id" : data['_id'],
                    "Name" : data.name,
                    "typeProduct" : data.typeProduct
                });
            }

            res.render('client/client_home', {
                layout:'client.hbs',
                companyList
            });
        },
        function (err){
            res.send("Something wrong happen, Refresh again");
        }
    )
    // res.send("TAO LAO");
});

router.get('/product/:id' , function (req, res) {
    const idCompany = req.params.id;
    req.session.order_idCompany = idCompany;
    companyModel.getProductByComID(idCompany).then(
        function (data, headers, status){
            const products = data.data.docs[0].products;

            res.render('client/client_product', {
                layout: 'client.hbs',
                products,
                idCompany
            });
        },
        function (err){
            console.log(err);
        }
    )

    // res.render('client/client_home_branch', {
    //     layout:'client.hbs',
    //     branchList
    // });
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
        const rawData = await productModel.getNameProductWithID(product.idProduct);
        const findProduct = rawData.data.rows[0];
        console.log(findProduct);

        product.price = findProduct.value.price;
        product.name = findProduct.value.name;

        totalPriceProduct += product.price * product.numberProduct;
    }
    totalPriceProduct += 20000;


    res.render('client/client_list', {
        layout: 'client.hbs',
        cart,
        totalPriceProduct
    });
});

router.post('/list', async (req, res) => {
    await orderModel.insertOrder(req.session.order_idCompany, req.session.authIDUser, req.session.cart);
    req.session.cart = [];
    res.redirect('/client');
})

router.get('/my-order' ,async function (req, res) {
    const idAccount = req.session.authIDUser;
    const orderData = await orderModel.getAllOrderFormat(idAccount);
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