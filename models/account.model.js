import sql from "../utils/mssql.js";

export default{
    async getAccount(){
        return sql.connect.request().query('select * from TKTAIXE');
    },
    async insertAccount(account){
        return sql.connect.request().execute('');
    }
}