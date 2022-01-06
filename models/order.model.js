import sql from "../utils/mssql.js";
import couch from "../utils/couchDB.js";

const dbName = 'delivery';

export default{
    async insertOrder(orderID, clientID, cart){
        console.log(orderID);
        console.log(cart);
        //Get store
        const mangoQuery = {
            selector: {
                "_id":orderID
            }
        };
        const parameters = {};

        couch.mango(dbName, mangoQuery, parameters).then(
            function (data, headers, status){
                couch.uniqid().then(function(ids){
                    const storeData = data.data.docs[0];
                    const id = ids[0];

                    const orders = storeData.orders;
                    const productOnOrder = [];

                    couch.uniqid().then(function(ids){
                        for (const product of cart){
                            productOnOrder.push({
                                "_id" : product.idProduct,
                                "quantity" : product.numberProduct
                            })
                        }

                        orders.push({
                            "_id" : ids[0],
                            "products": productOnOrder,
                            "transportPrice": 20000,
                            "client" : clientID,
                            "driver" : null
                        })

                        couch.update(dbName, {
                            "_id" : storeData['_id'],
                            "_rev" : storeData._rev,
                            "type": "store",
                            "name": storeData.name,
                            "Username": storeData.Username,
                            "Password": storeData.Password,
                            "typeProduct": storeData.typeProduct,
                            "products" : storeData.products,
                            "orders": orders
                        }).then(
                            function (data, headers, status){
                                console.log("Successfully !!");
                            },
                            function (err){
                                console.log(err);
                            }
                        )
                    })
                })
            },
            function (err){
                console.log(err);
            }
        )




    },
    async getAllOrderFormat(idUser){
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
    },
    async getOrderDetailWithID_Driver(orderID) {
        const rawData =  await sql.connect.request()
                                .input('orderID', sql.mssql.NVarChar, orderID)
                                .query('SELECT MaDH, KH.HoTen AS TenKH, KH.SDT AS SDT_KH, DH.DiaChiGiao AS DC_KH, DN.TenDoanhNghiep AS TenDN, CN.DiaChi as DC_CN, DN.SoDT AS SDT_CN\n' +
                                    '        FROM DonHang DH JOIN KhachHang KH ON DH.MaKH = KH.MaKH\n' +
                                    '        JOIN ChiNhanh CN ON (DH.MaDoanhNghiep = CN.MaDoanhNghiep AND DH.MACHINHANH = CN.MACHINHANH)\n' +
                                    '        JOIN DoanhNghiep DN ON (DN.MaSoThue = DH.MaDoanhNghiep)\n' +
                                    'WHERE MADH = @orderID ')

        const orderData = rawData.recordset[0];
        return orderData;

        // return {
        //     MaDH : '1',
        //     TenKH : 'Bùi Nguyễn Nhật Hào',
        //     SDT_KH: '0909845284',
        //     DC_KH : 'Bình Phước, Lộc Ninh',
        //     TenDN : 'FPT',
        //     DC_CN : 'Hà Nội',
        //     SDT_CN : '0987783897'
        // }
    },
    async getOrderDetail_Driver() {
        const rawData =  await sql.connect.request()
                                .query('SELECT MaDH, CN.DiaChi AS DiaChi_ChiNhanh, DH.PhiVanChuyen, KH.HoTen, DH.DiaChiGiao as DiaChi_KhachHang, KH.SDT, DH.TinhTrang AS status\n' +
                                    'FROM DonHang DH JOIN ChiNhanh CN ON DH.MACHINHANH = CN.MACHINHANH\n' +
                                    '        \t\tJOIN KhachHang KH ON DH.MaKH = KH.MaKH');
        const orderList = rawData.recordset;
        return orderList;

        // return [
        //     {
        //         MaDH : '1',
        //         DiaChi_ChiNhanh : 'Hà Nội',
        //         PhiVanChuyen : 20000,
        //         HoTen : 'Bùi Nguyễn Nhật Hào',
        //         DiaChi_KhachHang : 'Sài Gòn',
        //         SDT : '0909845284',
        //         status : 0
        //     },
        //     {
        //         MaDH : '2',
        //         DiaChi_ChiNhanh : 'Sài Gòn',
        //         PhiVanChuyen : 10000,
        //         HoTen : 'Bùi Nguyễn Nhật Cường',
        //         DiaChi_KhachHang : 'Bình Phước',
        //         SDT : '0987783897',
        //         status : 0
        //     },
        //     {
        //         MaDH : '3',
        //         DiaChi_ChiNhanh : 'Huế',
        //         PhiVanChuyen : 20000,
        //         HoTen : 'Lê Hoàng Nhật',
        //         DiaChi_KhachHang : 'Sài Gòn',
        //         SDT : '0909878548',
        //         status : 2
        //     },
        //     {
        //         MaDH : '4',
        //         DiaChi_ChiNhanh : 'Đà Nẵng',
        //         PhiVanChuyen : 20000,
        //         HoTen : 'Bùi Nguyễn Nhật Cường',
        //         DiaChi_KhachHang : 'Bình Phước',
        //         SDT : '0909845284',
        //         status : 1
        //     }
        // ];
    },
    async updateStatusOrder(orderID, newStatus){
        return sql.connect.request()
                .input('orderID', sql.mssql.VarChar, orderID)
                .input('newStatus', sql.mssql.Int, newStatus)
                .query('UPDATE DonHang\n' +
                    'Set TinhTrang = @newStatus\n' +
                    'where MaDH = @orderID')
    },
    async updateDriverIDForOrder(orderID, driverID) {
        console.log(driverID);
        return sql.connect.request()
            .input('orderID', sql.mssql.VarChar, orderID)
            .input('driverID', sql.mssql.VarChar, driverID)
            .query('        UPDATE DonHang\n' +
                '        SET MaTX = @driverID\n' +
                '        where MaDH = @orderID');
    },
    async getOrderOfDriver(driverID) {
        const rawData = await sql.connect.request()
                        .input('driverID', sql.mssql.VarChar, driverID)
                        .query('SELECT * FROM DonHang\n' +
                            'WHERE MaTX=@driverID');
        const orderList = rawData.recordset;
        return orderList;
    }
}