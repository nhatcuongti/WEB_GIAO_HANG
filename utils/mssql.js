import mssql from 'mssql/msnodesqlv8.js'

const config = {
    user: 'sa',
    password: '123',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'StudentManagement',
    driver: 'msnodesqlv8'
}

const connect = new mssql.ConnectionPool(config).connect(pool =>{ return pool})
// file nay de test sd mssql de thuc hien excute proc

export default {
    connect: connect,
    mssql : mssql
}