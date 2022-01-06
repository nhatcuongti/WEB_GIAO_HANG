import sql from "../utils/mssql.js";
import knexObj from '../utils/knex.js'
import formatData from '../utils/formatData.js'
import driverModel from "./driver.model.js";
import clientModel from "./client.model.js";
import couch from "../utils/couchDB.js";

const dbName = "delivery";


export default{
    async getAccount(){
        const viewURL = "_design/all/_view/account";
        return couch.get(dbName, viewURL);
    },
    async checkAccount(username, password){
        const viewURL = "_design/all/_view/view-with-id-password";
        const key = [username, password];
        const queryOptions = {
            key
        };

        return couch.get(dbName, viewURL, queryOptions);

    },
    //Dùng để chạy demo
    async staffLogin(id, mk) {
        const rawData = await sql.connect.request()
            .input('taikhoan', sql.mssql.VarChar, id)
            .input('matkhau', sql.mssql.VarChar, mk)
            .query('exec sp_DangNhapNhanVien @taikhoan, @matkhau');


        console.log("Raw Data : ");
        console.log(rawData);

        const staffList = rawData.recordset[0];
        return staffList;
    },
    async lockStaff(id){
        const rawData = await sql.connect.request()
            .input('taikhoan', sql.mssql.VarChar, id)
            .query('exec sp_KhoaTaiKhoanNhanVien @taikhoan');


        const staffList = rawData.recordset;
        return staffList;
    },
    async deleteStaff(id){
        const rawData = await sql.connect.request()
            .input('taikhoan', sql.mssql.VarChar, id)
            .query('exec sp_XoaTaiKhoanNhanVien @taikhoan');


        console.log(rawData);
        return null;
    },
    async changePassword(id, newPassword){
        const rawData = await sql.connect.request()
            .input('taikhoan', sql.mssql.VarChar, id)
            .input('password', sql.mssql.VarChar, newPassword)
            .query('EXEC DoiMatKhau @taikhoan, @password');

        console.log(rawData);
        return null;
    }


}