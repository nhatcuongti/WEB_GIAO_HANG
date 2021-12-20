import knex from "../utils/knex.js";
import sql from "../utils/mssql.js";

async function test(){
    return sql.connect.request().query('select * from TKTAIXE');
}

export default test;