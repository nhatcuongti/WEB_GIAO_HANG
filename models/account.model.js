import sql from "../utils/mssql.js";

export default{
    async getAccount(){
        return sql.connect.request().query('select * from TKTAIXE');
    },
    async insertAccount(account){
        try{
            return sql.connect.request().query(`EXEC INSERT_ACCOUNT ${account.ID}, ${account.MK}`);
        }catch(e){
            return false;
        }
    }
}