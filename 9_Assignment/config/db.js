const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',                // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'mydatabase',          // Make sure this is the correct database name
    password: 'Arfat@4545',          // Replace with your PostgreSQL password
    port: 5432,
});

module.exports = pool;
