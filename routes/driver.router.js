import express from 'express'
import orderModel from "../models/order.model.js";

const router = express();


router.get('/', async function (req, res) {
    res.locals.MyOrder = true;
    const orderID = req.session.orderID;
    let isMyOrder = true;
    if (orderID === undefined){
        isMyOrder = false;
        return res.render('driver/driver_MyOrder', {
            layout: 'driver.hbs',
            isMyOrder
        });
    }

    //Get Products of orderID
    const products = await orderModel.getProductWithOrder(orderID)
    // const products = [
    //     {
    //         name : 'Khẩu Trang',
    //         price : 20000,
    //         numberProduct: 3
    //     },
    //     {
    //         name : 'Bánh mì Sandwidth',
    //         price : 10000,
    //         numberProduct: 5
    //     },
    //     {
    //         name : 'Xe đạp',
    //         price : 1000000,
    //         numberProduct: 1
    //     },
    //     {
    //         name : 'Iphone 13',
    //         price : 20000000,
    //         numberProduct : 2
    //     }
    // ]
    const orderData = await orderModel.getOrderDetailWithID_Driver(orderID);

    let totalPriceProduct = 0;
    for (const product of products)
        totalPriceProduct += product.number * product.price;

    res.render('driver/driver_MyOrder', {
        layout: 'driver.hbs',
        products,
        totalPriceProduct,
        orderData,
        isMyOrder
    });
});

router.post('/MyOrder', async (req, res) => {
    const orderID = req.body.orderID;
    req.session.orderID = undefined;
    // Update orderID from Status = 1 => status = 2
    await orderModel.updateStatusOrder(orderID, 2);

    res.redirect('/driver/delivery');
})


router.get('/delivery', async function (req, res) {
    res.locals.Delivery = true;
    //(MaDH, DiaChi_ChiNhanh, PhiVanChuyen, HoTen, DiaChi_KhachHang, SDT)
    const listOrderTmp  = await orderModel.getOrderDetail_Driver();
    console.log(listOrderTmp);
    const driverActivePlace = req.session.activePlace;
    console.log(driverActivePlace);

    const listOrder = [];
    for (const order of listOrderTmp)
        if (order.status === 0 && order.DiaChi_ChiNhanh === driverActivePlace)
            listOrder.push(order);

    res.render('driver/driver_orderList', {
        layout: 'driver.hbs',
        listOrder
    });
});

router.post('/delivery', async function (req, res) {
    //(MaDH, DiaChi_ChiNhanh, PhiVanChuyen, HoTen, DiaChi_KhachHang, SDT)
    const orderID = req.body.orderID;


    req.session.orderID = orderID;
    //Update Status order from status = 0 => status = 1
    await orderModel.updateStatusOrder(orderID, 1);
    //Update driverID to order
    const driverID = req.session.authIDUser;
    await orderModel.updateDriverIDForOrder(orderID, driverID);

    res.redirect('/driver');
});

//Purchase
router.get('/revenue', async function (req, res) {
    res.locals.Revenue = true;
    const driverID = req.session.authIDUser;
    const orderDriverList = await orderModel.getOrderOfDriver(driverID);

    let revenue = 0;
    for (const orderDriver of orderDriverList)
        revenue += orderDriver.PhiVanChuyen;

    console.log(orderDriverList);

    res.render('driver/driver_revenue', {
        layout: 'driver.hbs',
        orderDriverList,
        revenue
    });
});




export default router;