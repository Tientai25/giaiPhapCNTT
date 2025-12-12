// Database Configuration for TDT eContract
// MySQL Connection Settings

const mysql = require('mysql2');

// Database connection configuration
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'giaiphapcntt',
  password: '0865798099',
  database: 'tdt_econtract',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Create promise pool for async/await
const promisePool = pool.promise();

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    return;
  }
  console.log('✅ Successfully connected to TDT eContract database');
  connection.release();
});

// Export pool for use in other modules
module.exports = {
  pool,
  promisePool,
  query: (sql, params) => promisePool.query(sql, params),
  execute: (sql, params) => promisePool.execute(sql, params)
};
