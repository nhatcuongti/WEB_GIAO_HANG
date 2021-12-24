import sql from "../utils/mssql.js";
import knexObj from '../utils/knex.js'
import formatData from '../utils/formatData.js'
import driverModel from "./driver.model.js";
import clientModel from "./client.model.js";

export default{
    async getAccount(){
        return sql.connect.request().query('select * from TKTAIXE');
    },
    async insertAccountDriver(generalData, extendData){
        try{
            const rawData = await driverModel.getAll();
            const idtaixe = formatData.increaseDriverID(rawData.recordset);

            console.log(idtaixe);
            console.log(generalData);
            console.log(extendData);


            await sql.connect.request()
                .input('ID', sql.mssql.VarChar,generalData.username)
                .input('IDTAIXE', sql.mssql.VarChar, idtaixe)
                .input('MK', sql.mssql.VarChar, generalData.password)
                .input('HOTEN', sql.mssql.NVarChar, (extendData.firstName + " " + extendData.lastName))
                .input('DIACHI', sql.mssql.NVarChar,generalData.address)
                .input('EMAIL', sql.mssql.VarChar, generalData.email)
                .input('BIENSOXE', sql.mssql.VarChar, extendData.licensePlates)
                .input('TKNH', sql.mssql.VarChar, extendData.bankingAccount)
                .input('KHUVUCHD', sql.mssql.VarChar, extendData.activePlaces)
                .input('SDT', sql.mssql.VarChar, generalData.phoneNumber)
                .query(`exec insert_account_taixe @ID,@IDTAIXE,@MK,@HOTEN,@DIACHI,@EMAIL,@BIENSOXE,@TKNH,@KHUVUCHD,@SDT`);
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    },
    async insertAccountClient(generalData, extendData){
        try{
            const rawData = await clientModel.getAll();
            const idClient = formatData.increaseClientID(rawData.recordset);

            console.log(idClient);
            console.log(generalData);
            console.log(extendData);


            // @MAKH varchar(50),
            // @HOTEN NVARCHAR(50),
            // @SDT VARCHAR(50),
            // @DIACHI NVARCHAR(50),
            // @EMAIL VARCHAR(50),
            // @ID VARCHAR(50),
            // @MK VARCHAR(50)
            await sql.connect.request()
                .input('MAKH', sql.mssql.VarChar, idClient)
                .input('HOTEN', sql.mssql.NVarChar, (extendData.firstName + " " + extendData.lastName))
                .input('SDT', sql.mssql.VarChar, generalData.phoneNumber)
                .input('DIACHI', sql.mssql.NVarChar,generalData.address)
                .input('EMAIL', sql.mssql.VarChar, generalData.email)
                .input('ID', sql.mssql.VarChar, generalData.username)
                .input('MK', sql.mssql.VarChar, generalData.password)
                .query(`exec insert_account_khachhang @MAKH, @HOTEN, @SDT, @DIACHI, @EMAIL, @ID, @MK`);
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    },
    async insertAccountPartner(generalData, extendData) {
        try{
            console.log(generalData);
            console.log(extendData);
            // @MASOTHUE varchar(50),
            // @LOAIHOANG NVARCHAR(50),
            // @DIACHIKINHDOANH NVARCHAR(50),
            // @TENDOANHNGHIEP VARCHAR(50),
            // @NGUOIDAIDIEN NVARCHAR(50),
            // @SODT VARCHAR(50),
            // @EMAIL VARCHAR(50),
            // @ID VARCHAR(50),
            // @MK VARCHAR(50)
            await sql.connect.request()
                .input('MASOTHUE', sql.mssql.VarChar, extendData.taxCode)
                .input('LOAIHANG', sql.mssql.NVarChar, extendData.typeProduct)
                .input('DIACHIKINHDOANH', sql.mssql.VarChar, generalData.address)
                .input('TENDOANHNGHIEP', sql.mssql.NVarChar,generalData.address)
                .input('NGUOIDAIDIEN', sql.mssql.VarChar, extendData.companyName)
                .input('SODT', sql.mssql.VarChar, generalData.phoneNumber)
                .input('EMAIL', sql.mssql.VarChar, generalData.email)
                .input('ID', sql.mssql.VarChar, generalData.username)
                .input('MK', sql.mssql.VarChar, generalData.password)
                .query(`exec insert_account_partner @MASOTHUE, @LOAIHANG, @DIACHIKINHDOANH, @TENDOANHNGHIEP, 
                @NGUOIDAIDIEN, @SODT, @EMAIL, @ID, @MK`);
            return true;
        }catch(e){
            console.log(e);
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
    async checkAccount(account) {
        const findUserDriver = await sql.connect.request()
            .input('id', sql.mssql.VarChar, account.username)
            .input('pass', sql.mssql.VarChar, account.password)
            .query('select * from TKTAIXE WHERE ID=@id and MK=@pass');
        const findUserClient = await sql.connect.request()
            .input('id', sql.mssql.VarChar, account.username)
            .input('pass', sql.mssql.VarChar, account.password)
            .query('select * from TKKHACHHANG WHERE ID=@id and MK=@pass');
        const findUserPartner = await sql.connect.request()
            .input('id', sql.mssql.VarChar, account.username)
            .input('pass', sql.mssql.VarChar, account.password)
            .query('select * from TKDOANHNGHIEP WHERE ID=@id and MK=@pass');
        const findUserStaff= await sql.connect.request()
            .input('id', sql.mssql.VarChar, account.username)
            .input('pass', sql.mssql.VarChar, account.password)
            .query('select * from TKNHANVIEN WHERE ID=@id and MK=@pass');

        if (findUserStaff.recordset.length > 0){
            const dataUser = findUserStaff.recordset[0];
            dataUser.type = 'staff';
            return dataUser;
        }
        else if (findUserClient.recordset.length > 0){
            const dataUser = findUserClient.recordset[0];
            dataUser.type = 'client';
            return dataUser;
        }
        else if (findUserDriver.recordset.length > 0){
            const dataUser = indUserDriver.recordset[0];
            dataUser.type = 'driver';
            return dataUser;
        }
        else if (findUserPartner.recordset.length > 0){
            const dataUser = findUserPartner.recordset[0];
            dataUser.type = 'company';
            return dataUser;
        }
        else if (account.username === 'admin' && account.password === 'admin'){
            const dataUser = {};
            dataUser.username = 'admin';
            dataUser.type = 'admin';
            return dataUser;
        }
        else
            return null;
    },
    async getActivePlace(){
        try{
            return sql.connect.request().query('select * from KHUVUCHOATDONG');
        }catch(e){
            return false;
        }
    },
    async getTypeProduct(){
        try{
            return sql.connect.request().query('select * from LOAIHANG');
        }catch(e){
            return false;
        }
    },
    async getAccountClientWithID(idAccount){
        const rawData = await sql.connect.request()
            .input('idAccount', sql.mssql.VarChar, idAccount)
            .query('SELECT KH.MaKH AS id, KH.HoTen AS name, KH.DiaChi AS address FROM TKKhachHang TKKH JOIN KhachHang KH ON TKKH.MaKH = KH.MaKH where kh.MaKH = @idAccount');
        const clientAccount = rawData.recordset[0];
        return clientAccount;

        // return {
        //     id : '1',
        //     name : 'Bùi Nguyễn Nhật Hào',
        //     address : 'Bình Phước, Lộc Ninh'
        // }
    },
    async getAllDriver(){
        return [
            {
                MATX: 'TX014',
                HOTEN: 'Bùi Nguyễn Nhật Hào',
                EMAIL: 'nhatcuongti@gmail.com',
                SDT: '0909845284',
                TRANGTHAI: true
            },
            {
                MATX: 'TX015',
                HOTEN: 'Bùi Nguyễn Nhật Cường',
                EMAIL: 'nhatcuongti@gmail.com',
                SDT: '0987783897',
                TRANGTHAI: false
            },
            {
                MATX: 'TX016',
                HOTEN: 'Bùi Tấn Tài',
                EMAIL: 'nhatcuongti@gmail.com',
                SDT: '012316654',
                TRANGTHAI: true
            }
        ]
    },
    async updateAccountStatus(typeAccount, userID, statusChoice) {
        if(typeAccount === 'driver'){
            console.log('driver');
            // return await sql.connect.request()
            //     .input('userID', sql.mssql.VarChar, userID)
            //     .input('statusChoice',  sql.mssql.Int, (statusChoice === 'active' ? 1 : 0)
            //     .query('UPDATE TKTAIXE SET TRANGTHAI = @statusChoice WHERE MATX=@userID');
        }
        else if (typeAccount === 'staff'){

        }
        else if (typeAccount === 'user'){
            console.log('user');
            // return await sql.connect.request()
            //     .input('userID', sql.mssql.VarChar, userID)
            //     .input('statusChoice',  sql.mssql.Int, (statusChoice === 'active' ? 1 : 0)
            //     .query('UPDATE TKTAIXE SET TRANGTHAI = @statusChoice WHERE MAKH=@userID');
        }
        else{

        }
    },
    async getAllUser() {
        return [
            {
                MaKH: 'TX014',
                HOTEN: 'Bùi Nguyễn Nhật Hào',
                EMAIL: 'nhatcuongti@gmail.com',
                SDT: '0909845284',
                TrangThai: true
            },
            {
                MaKH: 'TX014',
                HOTEN: 'Bùi Nguyễn Nhật Cường',
                EMAIL: 'nhatcuongti@gmail.com',
                SDT: '0987783897',
                TrangThai: false
            },
            {
                MaKH: 'TX014',
                HOTEN: 'Bùi Nguyễn Nhật Hào',
                EMAIL: 'nhatcuongti@gmail.com',
                SDT: '0909845284',
                TrangThai: true
            }
        ]
    },
    async getAllPartner() {
        return [
            {
                MaSoThue: 'DN25',
                TenDoanhNghiep: 'FedEx',
                DiaChiKinhDoanh: 'Trường Chinh',
                TENLOAIHANG: 'Automotive',
                trangthai: true
            },
            {
                MaSoThue: 'DN95',
                TenDoanhNghiep: 'FedEx',
                DiaChiKinhDoanh: 'Trường Chinh',
                TENLOAIHANG: 'Automotive',
                trangthai: true
            },
            {
                MaSoThue: 'DN43',
                TenDoanhNghiep: 'FedEx',
                DiaChiKinhDoanh: 'Trường Chinh',
                TENLOAIHANG: 'Automotive',
                trangthai: true
            }
        ]
    },
    async getAllStaff() {
        return [
            {
                MANV: 'NV007',
                HOTEN: 'Thy Vân',
                SDT: '(370) 344-0452',
                TRANGTHAI: true
            },
            {
                MANV: 'NV007',
                HOTEN: 'Thy Vân',
                SDT: '(370) 344-0452',
                TRANGTHAI: false
            },
            {
                MANV: 'NV007',
                HOTEN: 'Thy Vân',
                SDT: '(370) 344-0452',
                TRANGTHAI: true
            }
        ]
    }
}