import sql from "../utils/mssql.js";
import knexObj from '../utils/knex.js'

export default{
    async getNameProductWithID(idProduct){
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
        const rawData = await sql.connect.request()
            .input('idProduct', sql.mssql.VarChar, idProduct)
            .query('SELECT MASP AS idProduct, TENSP AS name, GIA AS price FROM SANPHAM WHERE MASP = @idProduct');
        const products = rawData.recordset;

        for (const product of products){
            if (product.idProduct === idProduct)
                return product;
        }
        return null;
    }
}