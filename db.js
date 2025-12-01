import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Teste de conexão:
pool.connect()
  .then(() => console.log("🟢 Conectado ao PostgreSQL!"))
  .catch(err => console.error("🔴 Erro ao conectar:", err));

export default pool;
