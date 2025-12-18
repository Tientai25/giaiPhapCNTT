// Database Configuration for TDT eContract
// PostgreSQL Connection Settings

const { Pool } = require('pg');

// Database connection configuration
// Support both Railway (POSTGRES*) and custom environment variables
const dbConfig = {
  host: process.env.PGHOST || process.env.DB_HOST || 'localhost',
  port: process.env.PGPORT || process.env.DB_PORT || 5432,
  user: process.env.PGUSER || process.env.DB_USER || 'postgres',
  password: process.env.PGPASSWORD || process.env.DB_PASSWORD || 'postgres',
  database: process.env.PGDATABASE || process.env.DB_NAME || 'tdt_econtract',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Create connection pool
const pool = new Pool(dbConfig);

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to PostgreSQL database:', err.message);
    return;
  }
  console.log('✅ Successfully connected to TDT eContract PostgreSQL database');
  release();
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

// Export pool and query functions
module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect()
};
