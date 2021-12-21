import sql from "../utils/mssql.js";
import knexObj from '../utils/knex.js'

export default{
    async getAll(){
        return sql.connect.request().query('select * from KHACHHANG');
    }
}