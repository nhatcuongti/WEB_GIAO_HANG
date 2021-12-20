import fn from 'knex';

export const connectionInfo = {
    host: '127.0.0.1',
    port: 1433,
    user: 'sa',
    password: '0909845284',
    database: 'Nhom18_DoAnThucHanh_19HTT2_1'
};

const knex = fn({
    client: 'mssql',
    connection: connectionInfo,
    pool: { min: 0, max: 10 }
});

export default knex;