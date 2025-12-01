import pool from './db.js';

async function testar() {
  const result = await pool.query("SELECT NOW()");
  console.log(result.rows);
}

testar();
