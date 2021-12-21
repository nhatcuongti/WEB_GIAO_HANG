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
    async insertContract(contract){
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
    // increaContractID(arr){
    //     var str = 'HD'
    // }
}