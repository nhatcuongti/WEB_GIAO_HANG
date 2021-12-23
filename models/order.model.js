import sql from "../utils/mssql.js";
import knexObj from '../utils/knex.js'
import {raw} from "express";
import {Login7TokenHandler} from "tedious/lib/token/handler.js";
import formatData from "../utils/formatData.js";

export default{
    async insertOrder(body, cart){
        //Insert don hang
        try{
            const orderData = {};
            const rawOrderData = await  sql.connect.request()
                .input('MaDH', sql.mssql.VarChar, orderData.MaDH)
                .query('SELECT * FROM DonHang');

            const orderList = rawOrderData.recordset;
            // orderData.MaDH = formatData.increaseOrderID(orderList);
            orderData.MaDH = '3';
            orderData.phiVanChuyen = body.shipPrice;
            orderData.TinhTrang = 0;
            orderData.HinhThucThanhToan = body.typePurchase;
            orderData.PhiSanPham = body.totalPrice;
            orderData.DiaChiGiao = body.address;
            orderData.MaChiNhanh = cart[0].idBranch;
            orderData.MaDoanhNghiep = cart[0].idCompany;
            orderData.MaKH = body.idUser;
            const rawData = await  sql.connect.request()
                .input('MaDH', sql.mssql.VarChar, orderData.MaDH)
                .input('PhiVanChuyen', sql.mssql.SmallMoney, orderData.phiVanChuyen)
                .input('TinhTrang', sql.mssql.Int, orderData.TinhTrang)
                .input('HinhThucThanhToan', sql.mssql.Int, orderData.HinhThucThanhToan)
                .input('PhiSanPham', sql.mssql.SmallMoney, orderData.PhiSanPham)
                .input('DiaChiGiao', sql.mssql.NVarChar,  orderData.DiaChiGiao)
                .input('MaChiNhanh', sql.mssql.VarChar, orderData.MaChiNhanh)
                .input('MaDoanhNghiep', sql.mssql.VarChar, orderData.MaDoanhNghiep)
                .input('MaKhachHang', sql.mssql.VarChar, orderData.MaKH)
                .query('EXEC insertDonHang @MaDH, @PhiVanChuyen, @TinhTrang, @HinhThucThanhToan, @PhiSanPham, @DiaChiGiao, @MaChiNhanh, @MaDoanhNghiep, @MaKhachHang');
            console.log('insert order');
            console.log(rawData);
            //Insert don hang san pham
            for (const product of cart){
                //insert DONHANG_SANPHAM
                const dhspData = {};
                dhspData.MASP = product.idProduct;
                dhspData.MADH = orderData.MaDH;
                dhspData.SLSP = product.numberProduct;
                await sql.connect.request()
                    .input('MASP', sql.mssql.VarChar, dhspData.MASP)
                    .input('MADH', sql.mssql.VarChar, dhspData.MADH)
                    .input('SLSP', sql.mssql.Int, dhspData.SLSP)
                    .query('INSERT INTO DONHANG_SP VALUES(@MASP, @MADH, @SLSP)');
            }
        }catch(e){
            console.log(e);
        }


        return null;
    },
    async getAllOrder(idUser){
        console.log(idUser);
        const rawData =  await sql.connect.request()
        .input('idUser', sql.mssql.VarChar, idUser)
        .query('SELECT MADH AS id, NgayDat AS purchaseDate, HinhThucThanhToan AS typePurchase,PhiVanChuyen AS shipPrice, PhiSanPham AS productPrice, TinhTrang AS status FROM DonHang  WHERE MaKH = @idUser')
        console.log(rawData);
        const orders = rawData.recordset;
        return orders;
        // return [
        //     {
        //         id: '1',
        //         purchaseDate: '27/05/2020',
        //         typePurchase: 'Tiền Mặt',
        //         shipPrice: '20000',
        //         productPrice: '50000',
        //         status: 'Đã giao',
        //     }
        // ]
    },
    async getOrderDetail(idOrder){
        const rawData =  await sql.connect.request()
                        .input('idOrder', sql.mssql.NVarChar, idOrder)
                        .query('SELECT DN.MaSoThue AS taxCode, DN.TenDoanhNghiep AS companyName, DN.SoDT AS phoneNumberCompany, DN.Email AS email, \n' +
                            '\t\t\tDN.DiaChiKinhDoanh AS companyAddress, CN.DiaChi AS branchAddress, TX.HOTEN AS driverName, TX.SDT AS phoneNumberDriver, TX.BIENSOXE AS licensePlates\n' +
                            '\t\t\tFROM DonHang DH JOIN DoanhNghiep DN ON DH.MaDoanhNghiep = DN.MaSoThue\n' +
                            '\t\t\t\t\t\t\tJOIN ChiNhanh CN ON CN.MaDoanhNghiep = DN.MaSoThue\n' +
                            '\t\t\t\t\t\t\tLEFT JOIN TAIXE TX ON TX.MATX = DH.MaTX\n' +
                            '\t\t\tWHERE DH.MaDH = @idOrder')

        const orderDetail = rawData.recordset[0];
        return orderDetail;
        // return {
        //     taxCode : '12312',
        //     companyName : 'FPT',
        //     phoneNumberCompany : '0909845284',
        //     email : 'nhatcuongti@gmail.com',
        //     companyAddress : 'Thành Phố Hồ Chí Minh',
        //     branchAddress : 'Thành Phố HỒ Chí Minh, Q10',
        //     driverName : 'Lê Hoàng Nhật',
        //     phoneNumberDriver : '0902313232',
        //     licensePlates : '74H1-9999'
        // }
    },
    async getProductWithOrder(idOrder){
        const rawData = await sql.connect.request()
        .input('idOrder', sql.mssql.NVarChar, idOrder)
        .query('SELECT SP.MASP AS idProduct, DN.MaSoThue AS idCompany, DHSP.SLSP AS number, SP.TENSP AS name, SP.GIA AS price \n' +
            '\t\t\t FROM DONHANG_SP DHSP JOIN SANPHAM SP ON DHSP.MASP = SP.MASP \n' +
            '\t\t\t\t\t   JOIN DonHang DH ON DH.MaDH = DHSP.MADH\n' +
            '\t\t\t\t\t   JOIN DoanhNghiep DN ON DN.MaSoThue = DH.MaDoanhNghiep\t\n' +
            '\t\t\t WHERE DH.MaDH = @idOrder')

        const productList = rawData.recordset;
        return productList;
        // return [
        //     {
        //         idProduct : '1',
        //         idCompany : '1',
        //         number: 3,
        //         name : 'Khẩu Trang',
        //         price : 20000
        //     },
        //     {
        //         idProduct : '2',
        //         idCompany : '2',
        //         number: 2,
        //         name : 'Bánh mì Sandwidth',
        //         price : 10000
        //     },
        //     {
        //         idProduct : '3',
        //         idCompany : '2',
        //         number: 1,
        //         name : 'Xe đạp',
        //         price : 1000000
        //     },
        //     {
        //         idProduct : '4',
        //         idCompany : '1',
        //         number: 1,
        //         name : 'Iphone 13',
        //         price : 20000000
        //     }
        // ]
    }
}