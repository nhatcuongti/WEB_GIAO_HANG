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
        // const findUserStaff= await sql.connect.request()
        //     .input('id', sql.mssql.VarChar, account.username)
        //     .input('pass', sql.mssql.VarChar, account.password)
        //     .query('select * from TKNHANVIEN WHERE ID=@id and MK=@pass');

        if (findUserClient.recordset.length > 0) {
            const dataUser = findUserClient.recordset[0];
            dataUser.status = dataUser.TrangThai;
            dataUser.type = 'client';
            return dataUser;
        } else if (findUserDriver.recordset.length > 0) {
            const dataUser = findUserDriver.recordset[0];
            dataUser.status = dataUser.TRANGTHAI;
            dataUser.type = 'driver';
            return dataUser;
        } else if (findUserPartner.recordset.length > 0) {
            const dataUser = findUserPartner.recordset[0];
            dataUser.status = dataUser.trangthai;
            dataUser.type = 'company';
            return dataUser;
        } else if (account.username === 'admin' && account.password === 'admin') {
            const dataUser = {};
            dataUser.username = 'admin';
            dataUser.type = 'admin';
            dataUser.status = true;
            return dataUser;
        } else {
            const data = await this.staffLogin(account.username, account.password);
            console.log("Staff when received : ")
            console.log(data);
            if (data === undefined)
                return null;

            data.type = 'staff';
            data.status = data.TRANGTHAI;
            return data;
        }
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
        const rawData = await sql.connect.request()
            .query('SELECT TX.MATX, HOTEN, EMAIL, SDT, TRANGTHAI\n' +
                'FROM TAIXE TX JOIN TKTAIXE TKTX ON TX.MATX = TKTX.MATX');

        const driverList = rawData.recordset;
        return driverList;

        // return [
        //     {
        //         MATX: 'TX014',
        //         HOTEN: 'Bùi Nguyễn Nhật Hào',
        //         EMAIL: 'nhatcuongti@gmail.com',
        //         SDT: '0909845284',
        //         TRANGTHAI: true
        //     },
        //     {
        //         MATX: 'TX015',
        //         HOTEN: 'Bùi Nguyễn Nhật Cường',
        //         EMAIL: 'nhatcuongti@gmail.com',
        //         SDT: '0987783897',
        //         TRANGTHAI: false
        //     },
        //     {
        //         MATX: 'TX016',
        //         HOTEN: 'Bùi Tấn Tài',
        //         EMAIL: 'nhatcuongti@gmail.com',
        //         SDT: '012316654',
        //         TRANGTHAI: true
        //     }
        // ]
    },
    async updateAccountStatus(typeAccount, userID, statusChoice, TKNV) {
        console.log("Update Account");
        if(typeAccount === 'driver'){
            console.log('driver');
            return sql.connect.request()
                .input('userID', sql.mssql.VarChar, userID)
                .input('statusChoice',  sql.mssql.Int, (statusChoice === 'active' ? 1 : 0))
                .query('UPDATE TKTAIXE SET TRANGTHAI = @statusChoice WHERE MATX=@userID');
        }
        else if (typeAccount === 'staff'){
            console.log('staff');
            console.log("User ID : " + TKNV);
            console.log("Status Choice : " + statusChoice);
            return sql.connect.request()
                .input('userID', sql.mssql.VarChar, TKNV)
                .input('statusChoice',  sql.mssql.Int, (statusChoice === 'active' ? 1 : 0))
                .query('EXEC CapNhatTrangThaiNV @userID, @statusChoice');
                // .query('UPDATE TKNHANVIEN SET TRANGTHAI = @statusChoice WHERE MANV=@userID');
        }
        else if (typeAccount === 'user'){
            console.log('user');
            return sql.connect.request()
                .input('userID', sql.mssql.VarChar, userID)
                .input('statusChoice',  sql.mssql.Int, (statusChoice === 'active' ? 1 : 0))
                .query('UPDATE TKKhachHang SET TrangThai = @statusChoice WHERE MAKH=@userID');
        }
        else{
            console.log('partner');
            return sql.connect.request()
                .input('userID', sql.mssql.VarChar, userID)
                .input('statusChoice',  sql.mssql.Int, (statusChoice === 'active' ? 1 : 0))
                .query('UPDATE TKDoanhNghiep SET trangthai = @statusChoice WHERE MADOANHNGHIEP=@userID');
        }
    },
    async getAllUser() {
        const rawData = await sql.connect.request()
            .query('SELECT KH.MaKH, HOTEN, SDT, EMAIL, TrangThai\n' +
                'FROM KHACHHANG KH JOIN TKKhachHang TKKH ON KH.MaKH = TKKH.MaKH');

        const userList = rawData.recordset;
        return userList;

        // return [
        //     {
        //         MaKH: 'TX014',
        //         HOTEN: 'Bùi Nguyễn Nhật Hào',
        //         EMAIL: 'nhatcuongti@gmail.com',
        //         SDT: '0909845284',
        //         TrangThai: true
        //     },
        //     {
        //         MaKH: 'TX014',
        //         HOTEN: 'Bùi Nguyễn Nhật Cường',
        //         EMAIL: 'nhatcuongti@gmail.com',
        //         SDT: '0987783897',
        //         TrangThai: false
        //     },
        //     {
        //         MaKH: 'TX014',
        //         HOTEN: 'Bùi Nguyễn Nhật Hào',
        //         EMAIL: 'nhatcuongti@gmail.com',
        //         SDT: '0909845284',
        //         TrangThai: true
        //     }
        // ]
    },
    async getAllPartner() {
        const rawData = await sql.connect.request()
            .query('SELECT MaSoThue, TenDoanhNghiep, DiaChiKinhDoanh, TENLOAIHANG, trangthai\n' +
                'FROM DOANHNGHIEP DN JOIN TKDoanhNghiep TKDN ON DN.MaSoThue = TKDN.MADOANHNGHIEP\t\n' +
                '\t\t\t\t\tJOIN LOAIHANG LH ON LH.MALOAIHANG = DN.LoaiHang');

        const partnerList = rawData.recordset;
        return partnerList;

        // return [
        //     {
        //         MaSoThue: 'DN25',
        //         TenDoanhNghiep: 'FedEx',
        //         DiaChiKinhDoanh: 'Trường Chinh',
        //         TENLOAIHANG: 'Automotive',
        //         trangthai: true
        //     },
        //     {
        //         MaSoThue: 'DN95',
        //         TenDoanhNghiep: 'FedEx',
        //         DiaChiKinhDoanh: 'Trường Chinh',
        //         TENLOAIHANG: 'Automotive',
        //         trangthai: true
        //     },
        //     {
        //         MaSoThue: 'DN43',
        //         TenDoanhNghiep: 'FedEx',
        //         DiaChiKinhDoanh: 'Trường Chinh',
        //         TENLOAIHANG: 'Automotive',
        //         trangthai: true
        //     }
        // ]
    },
    async getAllStaff() {
        const rawData = await sql.connect.request()
            .query('SELECT TKNV.ID, NV.MANV, NV.HOTEN, NV.SDT, TKNV.TRANGTHAI\n' +
                'FROM NHANVIEN NV JOIN TKNHANVIEN TKNV ON NV.MANV = TKNV.MANV');

        const staffList = rawData.recordset;
        return staffList;

        // return [
        //     {
        //         MANV: 'NV007',
        //         HOTEN: 'Thy Vân',
        //         SDT: '(370) 344-0452',
        //         TRANGTHAI: true
        //     },
        //     {
        //         MANV: 'NV007',
        //         HOTEN: 'Thy Vân',
        //         SDT: '(370) 344-0452',
        //         TRANGTHAI: false
        //     },
        //     {
        //         MANV: 'NV007',
        //         HOTEN: 'Thy Vân',
        //         SDT: '(370) 344-0452',
        //         TRANGTHAI: true
        //     }
        // ]
    },
    //Dùng để chạy demo
    async staffLogin(id, mk) {
        const rawData = await sql.connect.request()
            .input('taikhoan', sql.mssql.VarChar, id)
            .input('matkhau', sql.mssql.VarChar, mk)
            .query('exec sp_DangNhapNhanVien @taikhoan, @matkhau');


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