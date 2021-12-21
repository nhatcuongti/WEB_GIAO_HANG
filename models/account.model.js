import sql from "../utils/mssql.js";
import knexObj from '../utils/knex.js'

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
    },
    async insertAccount_tmp(account){
        try{
            return knexObj('TKTAIXE');
        }catch(e){
            return false;
        }
    },
    checkAccount(account) {
        if (account.username === 'admin')
            return 'admin';
        else if (account.username === 'client')
            return 'client';
        else if (account.username === 'driver')
            return 'driver'
        else if (account.username === 'company')
            return 'company';
        else
            return null;

    }
}