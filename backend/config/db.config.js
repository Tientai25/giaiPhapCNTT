// Database Configuration for TDT eContract
// MySQL Connection Settings

const mysql = require('mysql2');

// Database connection configuration
// Support both Railway (MYSQL*) and custom environment variables
const dbConfig = {
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  user: process.env.MYSQLUSER || process.env.DB_USER || 'giaiphapcntt',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '0865798099',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'tdt_econtract',
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
