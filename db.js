import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

// Configuração de conexão do PostgreSQL
const config = {
    user: process.env.PGUSER || 'postgres', // Usando PGUSER como padrão
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'ecommerce_db',
    password: process.env.PGPASSWORD || 'sua_senha_secreta', // MUDAR AQUI SE NECESSÁRIO
    port: process.env.PGPORT || 5432,
    // Remover a configuração de SSL do arquivo original, que não era necessária na nova sintaxe.
    // Você pode reativar se estiver em ambiente de produção com SSL.
};

const pool = new Pool(config);

// Teste de conexão usando .then/.catch
pool.connect()
  .then(() => console.log("🟢 Conectado ao PostgreSQL!"))
  .catch(err => console.error("🔴 Erro ao conectar:", err.message)); // Adicionando .message para clareza

export default pool;