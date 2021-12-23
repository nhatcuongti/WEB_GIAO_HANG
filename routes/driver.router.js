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


    const products = [
        {
            name : 'Khẩu Trang',
            price : 20000,
            numberProduct: 3
        },
        {
            name : 'Bánh mì Sandwidth',
            price : 10000,
            numberProduct: 5
        },
        {
            name : 'Xe đạp',
            price : 1000000,
            numberProduct: 1
        },
        {
            name : 'Iphone 13',
            price : 20000000,
            numberProduct : 2
        }
    ]
    const orderData = await orderModel.getOrderDetail_Driver(orderID);

    let totalPriceProduct = 0;
    for (const product of products)
        totalPriceProduct += product.numberProduct * product.price;

    res.render('driver/driver_MyOrder', {
        layout: 'driver.hbs',
        products,
        totalPriceProduct,
        orderData,
        isMyOrder
    });
});

router.post('/MyOrder', (req, res) => {
    const orderID = req.body.orderID;
    req.session.orderID = undefined;
    // Update orderID
    res.redirect('/driver/delivery');
})


router.get('/delivery', async function (req, res) {
    res.locals.Delivery = true;
    //(MaDH, DiaChi_ChiNhanh, PhiVanChuyen, HoTen, DiaChi_KhachHang, SDT)
    const listOrderTmp = [
        {
            MaDH : '1',
            DiaChi_ChiNhanh : 'Hà Nội',
            PhiVanChuyen : 20000,
            HoTen : 'Bùi Nguyễn Nhật Hào',
            DiaChi_KhachHang : 'Sài Gòn',
            SDT : '0909845284',
            status : 0
        },
        {
            MaDH : '2',
            DiaChi_ChiNhanh : 'Sài Gòn',
            PhiVanChuyen : 10000,
            HoTen : 'Bùi Nguyễn Nhật Cường',
            DiaChi_KhachHang : 'Bình Phước',
            SDT : '0987783897',
            status : 0
        },
        {
            MaDH : '3',
            DiaChi_ChiNhanh : 'Huế',
            PhiVanChuyen : 20000,
            HoTen : 'Lê Hoàng Nhật',
            DiaChi_KhachHang : 'Sài Gòn',
            SDT : '0909878548',
            status : 2
        },
        {
            MaDH : '4',
            DiaChi_ChiNhanh : 'Đà Nẵng',
            PhiVanChuyen : 20000,
            HoTen : 'Bùi Nguyễn Nhật Cường',
            DiaChi_KhachHang : 'Bình Phước',
            SDT : '0909845284',
            status : 1
        }
    ];

    const listOrder = [];
    for (const order of listOrderTmp)
        if (order.status === 0)
            listOrder.push(order);

    res.render('driver/driver_orderList', {
        layout: 'driver.hbs',
        listOrder
    });
});

router.post('/delivery', async function (req, res) {
    //(MaDH, DiaChi_ChiNhanh, PhiVanChuyen, HoTen, DiaChi_KhachHang, SDT)
    const orderID = req.body.orderID;
    console.log(orderID);
    //const order = modelOrder.getOrder(orderID)
    const order = {
            MaDH : '1',
            DiaChi_ChiNhanh : 'Hà Nội',
            PhiVanChuyen : 20000,
            HoTen : 'Bùi Nguyễn Nhật Hào',
            DiaChi_KhachHang : 'Sài Gòn',
            SDT : '0909845284',
            status : 0
        };

    req.session.orderID = orderID;
    //Update Status order from status = 0 => status = 1


    res.redirect('/driver');
});

//Purchase
router.get('/revenue', async function (req, res) {
    res.locals.Revenue = true;
    res.render('driver/driver_revenue', {
        layout: 'driver.hbs'
    });
});




export default router;