import fn from 'knex';

export const connectionInfo = {
    host: '127.0.0.1',
    port: 1433,
    user: 'sa',
    password: '123',
    database: 'StudentManagement'
};

const knex = fn({
    client: 'mssql',
    connection: connectionInfo,
    pool: { min: 0, max: 10 }
});

export default knex;