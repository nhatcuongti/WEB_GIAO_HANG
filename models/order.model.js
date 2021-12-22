import sql from "../utils/mssql.js";
import knexObj from '../utils/knex.js'

export default{
    async insertOrder(body, cart){
        //Insert don hang
        const orderData = {};
        orderData.MaDH = '1';
        orderData.phiVanChuyen = body.shipPrice;
        orderData.TinhTrang = 0;
        orderData.HinhThucThanhToan = body.typePurchase;
        orderData.PhiSanPham = body.totalPrice;
        let currentDate = new Date();
        orderData.NgayDat = currentDate.toLocaleDateString();
        orderData.DiaChiGiao = body.address;
        orderData.MaChiNhanh = cart[0].idBranch;
        orderData.MaDoanhNghiep = cart[0].idCompany;
        orderData.MaKH = body.idUser;
        orderData.MaTX = null;
        //return sql.connect.request()
        //.input('MaDH', sql.mssql.VarChar, orderData.MaDH)
        //.input('PhiVanChuyen', sql.mssql.SmallMoney, orderData.phiVanChuyen)
        //.input('TinhTrang', sql.mssql.int, orderData.TinhTrang)
        //.input('HinhThucThanhToan', sql.mssql.int, orderData.HinhThucThanhToan)
        //.input('PhiSanPham', sql.mssql.smallmoney, orderData.PhiSanPham)
        //.input('NgayDat', sql.mssql.Datetime,  orderData.NgayDat)
        //.input('DiaChiGiao', sql.mssql.NVarChar,  orderData.DiaChiGiao)
        //.input('MaChiNhanh', sql.mssql.varchar, orderData.MaChiNhanh)
        //.input('MaDoanhNghiep', sql.mssql.varchar, orderData.MaDoanhNghiep)
        //.input('MaKhachHang', sql.mssql.varchar, orderData.MaKH)
        //.input('MaTX', sql.mssql.varchar, orderData.MaTX)
        //.query('EXEC insertDonHang @MaDH, @PhiVanChuyen, @TinhTrang, @HinhThucThanhToan, @PhiSanPham, @NgayDat, @DiaChiGiao,
        //          @MaChiNhanh, @MaDoanhNghiep, @MaKhachHang, @MaTX)
        //Insert don hang san pham
        for (const product of cart){
            //insert DONHANG_SANPHAM
            const dhspData = {};
            dhspData.MASP = product.idProduct;
            dhspData.MADH = orderData.MaDH;
            dhspData.SLSP = product.numberProduct;
            //return sql.connect.request()
            //.input('MASP', sql.mssql.VarChar, dhspData.MASP)
            //.input('MADH', sql.mssql.VarChar, dhspData.MADH)
            //.input('SLSP', sql.mssql.Int, dhspData.SLSP)
            //.query('INSERT INTO DONHANG_SP VALUES(@MASP, @MADH, @SLSP),
        }


        return null;
    },
    async getAllOrder(idUser){
        //return sql.connect.request()
        //.input('idUser', sql.mssql.NVarChar, idUser)
        //.query('exec viewOrderWithIDUser @idUser')
        return [
            {
                id: '1',
                purchaseDate: '27/05/2020',
                typePurchase: 'Tiền Mặt',
                shipPrice: '20000',
                productPrice: '50000',
                status: 'Đã giao',
            }
        ]
    },
    async getOrderDetail(idOrder){
        //return sql.connect.request()
        //.input('idOrder', sql.mssql.NVarChar, idOrder)
        //.query('exec viewDetailOrder @idOrder')
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
        //return sql.connect.request()
        //.input('idOrder', sql.mssql.NVarChar, idOrder)
        //.query('exec viewProductWithOrderID @idOrder')
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