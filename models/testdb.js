import knex from "../utils/knex.js";
import sql from "../utils/mssql.js";

function test(){
    return sql.connect.request().query('select st.* from student st')

}

export default test;