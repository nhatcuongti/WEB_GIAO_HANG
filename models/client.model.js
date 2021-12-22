import sql from "../utils/mssql.js";
import knexObj from '../utils/knex.js'

export default{
    async getAll(){
        return sql.connect.request().query('select * from KHACHHANG');
    },
    async getCompany(){
        //return sql.connect.request()
        const companyList = [
            {
                id : '1',
                Name : 'Thế Giới Di Động',
                typeProduct : 'Điện Thoại'
            },
            {
                id : '2',
                Name : 'Tập đoàn Vingroup',
                typeProduct : 'Nội thất'
            },
            {
                id : '3',
                Name : 'FPT',
                typeProduct : 'Laptop'
            },
            {
                id : '4',
                Name : 'FastFood',
                typeProduct : 'Đồ ăn'
            },
            {
                id : '5',
                Name : 'Công ty cổ phần Trường Hải',
                typeProduct : 'Xe máy'
            }
        ]
        return companyList;
    },
    async getProductOfCompany(idCompany){
        const products = [
            {
                idProduct : '1',
                idCompany : '1',
                name : 'Khẩu Trang',
                price : 20000
            },
            {
                idProduct : '2',
                idCompany : '2',
                name : 'Bánh mì Sandwidth',
                price : 10000
            },
            {
                idProduct : '3',
                idCompany : '2',
                name : 'Xe đạp',
                price : 1000000
            },
            {
                idProduct : '4',
                idCompany : '1',
                name : 'Iphone 13',
                price : 20000000
            }
        ]

        return products;
    }
}