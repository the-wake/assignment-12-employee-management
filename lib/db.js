const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'RootRoot',
        database: 'a12_Staff'
    },
);

module.exports = db;
