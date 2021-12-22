import sql from "../utils/mssql.js";
import knexObj from '../utils/knex.js'

export default{
    async insertOrder(user, generalInfor, cart){
        const orderData = {};
        orderData.MaDH = '1';
        orderData.phiVanChuyen = generalInfor.shipPrice;
        orderData.TinhTrang = 0;
        orderData.HinhThucThanhToan = generalInfor.typePurchase;
        orderData.NgayDat = new Date();
        orderData.DiaChiGiao = user.address;
        //order.MaChiNhanh =
        orderData.MaDoanhNghiep = generalInfor.idCompany;
        orderData.MaKH = generalInfor.idUser;



        return null;
    },
    async getAllOrder(idUser){
        return [
            {
                id: '1',
                purchaseDate: '27/05/2020',
                typePurchase: 'Tiền Mặt',
                shipPice: '20000',
                totalPrice: '50000',
                status: 'Đã giao',
            }
        ]
    },
    async getOrderDetail(idOrder){
        return {
            taxCode : '12312',
            companyName : 'FPT',
            phoneNumberCompany : '0909845284',
            email : 'nhatcuongti@gmail.com',
            companyAddress : 'Thành Phố Hồ Chí Minh',
            branchAddress : 'Thành Phố HỒ Chí Minh, Q10',
            driverName : 'Lê Hoàng Nhật',
            phoneNumberDriver : '0902313232',
            licensePlates : '74H1-9999'
        }
    },
    async getProductWithOrder(idOrder){
        return [
            {
                idProduct : '1',
                idCompany : '1',
                number: 3,
                name : 'Khẩu Trang',
                price : 20000
            },
            {
                idProduct : '2',
                idCompany : '2',
                number: 2,
                name : 'Bánh mì Sandwidth',
                price : 10000
            },
            {
                idProduct : '3',
                idCompany : '2',
                number: 1,
                name : 'Xe đạp',
                price : 1000000
            },
            {
                idProduct : '4',
                idCompany : '1',
                number: 1,
                name : 'Iphone 13',
                price : 20000000
            }
        ]
    }
}