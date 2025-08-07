const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

(async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to the database successfully!');
    client.release();
  } catch (err) {
    console.error('Database connection error:', err.stack);
  }
})();

module.exports = pool;
