import sql from "../utils/mssql.js";
import couch from '../utils/couchDB.js';
import knexObj from '../utils/knex.js'

const dbName = "delivery";

export default{
    async getAll(){
        return sql.connect.request().query('select * from KHACHHANG');
    },
    getCompany(){
        const viewUrl = "_design/store/_view/view-store";
        return couch.get(dbName, viewUrl);
    },
    async getProductOfCompany(idCompany, idBranch){
        return sql.connect.request()
        .input('MADOANHNGHIEP', sql.mssql.NVarChar, idCompany)
        .input('MACHINHANH', sql.mssql.NVarChar, idBranch)
        .query('SELECT SP.MASP AS idProduct, DN.MaSoThue AS idCompany, SP.TENSP AS name, SP.GIA AS price\n' +
            '\t\tFROM DoanhNghiep DN JOIN ChiNhanh CN ON DN.MaSoThue = CN.MaDoanhNghiep\n' +
            '\t\t\t\t\t\t\tJOIN CHINHANH_SP CNSP ON (CNSP.MACHINHANH = CN.MaChiNhanh AND CNSP.MADOANHNGHIEP = DN.MaSoThue)\n' +
            '\t\t\t\t\t\t\tJOIN SANPHAM SP ON SP.MASP = CNSP.MASP\n' +
            '\t\tWHERE DN.MaSoThue = @MADOANHNGHIEP AND CN.MaChiNhanh = @MACHINHANH')
        // .query('exec viewProductOfCompany @MADOANHNGHIEP, @MACHINHANH')

        // const products = [
        //     {
        //         idProduct : '1',
        //         idCompany : '1',
        //         name : 'Khẩu Trang',
        //         price : 20000
        //     },
        //     {
        //         idProduct : '2',
        //         idCompany : '2',
        //         name : 'Bánh mì Sandwidth',
        //         price : 10000
        //     },
        //     {
        //         idProduct : '3',
        //         idCompany : '2',
        //         name : 'Xe đạp',
        //         price : 1000000
        //     },
        //     {
        //         idProduct : '4',
        //         idCompany : '1',
        //         name : 'Iphone 13',
        //         price : 20000000
        //     }
        // ]
        //
        // return products;
    }
}