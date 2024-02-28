const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'barrioBet',
    password: 'mamaypapa123',
    port: 5432,
});

module.exports = pool;
  