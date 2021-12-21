import mssql from 'mssql/msnodesqlv8.js'

const config = {
    user: 'sa',
    password: '0909845284',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'Nhom18_DoAnThucHanh_19HTT2_1',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
}

const connect = new mssql.ConnectionPool(config).connect(pool =>{ return pool})
// let connect = await mssql.connect(config);
// file nay de test sd mssql de thuc hien execute proc

export default {
    connect: connect,
    mssql : mssql
}