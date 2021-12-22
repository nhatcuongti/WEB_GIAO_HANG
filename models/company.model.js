import sql from "../utils/mssql.js";

export default{
    async getBranch(idCompany){
        return sql.connect.request().input('idCompany', sql.mssql.VarChar, idCompany).
        query('select cn.* from ChiNhanh cn where cn.MaDoanhNghiep = @idCompany');
    },
    async getBranchNullConstract(idCompany){
        return sql.connect.request().input('idCompany', sql.mssql.VarChar, idCompany).
        query('select cn.* from ChiNhanh cn where cn.MaDoanhNghiep = @idCompany and cn.MaHopDong is null');
    },
    async insertBranch(branch){
        try{
            return sql.connect.request().input('idBranch', sql.mssql.VarChar(5), branch.name).
            input('idCompany', sql.mssql.VarChar, "dn01").
            input('addressBranch',sql.mssql.VarChar, branch.address).
            input('ds', sql.mssql.Money, 0).
            input('idContract', sql.mssql.VarChar, null).
            query('EXEC INSERT_CHINHANH @idBranch, @idCompany, @addressBranch, @ds, @idContract');
        }catch(e){
            console.log(e)
            return false;
        }
    },
    async deleteBranch(idBranch, idCompany){
        try{
            return sql.connect.request().input('idBranch', sql.mssql.VarChar(5), idBranch).
            input('idCompany', sql.mssql.VarChar, idCompany).
            query('EXEC DELETE_CHINHANH @idBranch, @idCompany');
        }catch(e){
            console.log(e)
            return false;
        }
    },
    async updateBranch(idBranch, idCompany, address){
        try{
            return sql.connect.request().input('idBranch', sql.mssql.VarChar(5), idBranch).
            input('idCompany', sql.mssql.VarChar, idCompany).
            input('addressBranch',sql.mssql.VarChar, address).
            query('UPDATE ChiNhanh Set diachi=@addressBranch where MaChiNhanh = @idBranch and MaDoanhNghiep = @idCompany');
        }catch(e){
            console.log(e)
            return false;
        }
    },
    async insertContract(idContract, idCompany,ngdaidien, sochinhanhdk, date, time){
        try{
            return sql.connect.request().input('idContract', sql.mssql.VarChar(5), idContract).
            input('idCompany', sql.mssql.VarChar, idCompany).
            input('ngdaidien',sql.mssql.VarChar, ngdaidien).
            input('sochinhanhdk', sql.mssql.Int, sochinhanhdk).
            input('date', sql.mssql.DateTime, date).
            input('time', sql.mssql.Int, time).
            query('EXEC INSERT_HopDong @idContract, @ngdaidien, @sochinhanhdk, @time, 0.1,@date, @idCompany ');
        }catch(e){
            console.log(e)
            return false;
        }
    },
    async getContract(idCompany){
        return sql.connect.request().input('idCompany', sql.mssql.VarChar, idCompany).
        query('select cn.* from HopDong cn where cn.MaDoanhNghiep = @idCompany');
    },
    async updateBranch_Contract(idBranch, idCompany, idContract){
        try{
            idBranch.forEach(function (e){
                sql.connect.request().input('idBranch', sql.mssql.VarChar(5), e).
                input('idCompany', sql.mssql.VarChar, idCompany).
                input('idContract',sql.mssql.VarChar, idContract).
                query('UPDATE ChiNhanh Set MaHopDong=@idContract where MaChiNhanh = @idBranch and MaDoanhNghiep = @idCompany');
            })
        }catch(e){
            console.log(e)
            return false;
        }
    },
    increaBranchID(arr){
        if(Object.keys(arr).length === 0 || arr === null)
            return '0'

        for(var i = 0; i < 100; i++){
            var check = 0;
            arr.forEach(function (e){
                if(e.MaChiNhanh === (i.toString()))
                    check = 1;
            })
            if(check === 0)
                return i.toString()
        }
    },
    increaContractID(arr){
        if(Object.keys(arr).length === 0 || arr === null)
            return '0'

        for(var i = 0; i < 100; i++){
            var check = 0;
            arr.forEach(function (e){
                if(e.MaHD === (i.toString()))
                    check = 1;
            })
            if(check === 0)
                return i.toString()
        }
    }

}