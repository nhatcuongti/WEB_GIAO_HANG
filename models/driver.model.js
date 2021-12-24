import sql from "../utils/mssql.js";
import knexObj from '../utils/knex.js'

export default{
    async getAll(){
        return sql.connect.request().query('select * from TAIXE');
    },
    async getDriverWithID(driverID){
        const rawData = await sql.connect.request()
            .input('driverID', sql.mssql.VarChar, driverID)
            .query('SELECT * FROM TAIXE WHERE MATX = @driverID');
        return rawData.recordset[0];
    }
}