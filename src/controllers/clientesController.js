import pool from '../../db.js';

export const listarClientes = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id_cliente, cpf, nome, email FROM cliente ORDER BY id_cliente');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const obterClientePorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { rows } = await pool.query('SELECT id_cliente, cpf, nome, email FROM cliente WHERE id_cliente = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const criarCliente = async (req, res) => {
  try {
    const { cpf, nome, email, senha } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO cliente (cpf, nome, email, senha) VALUES ($1, $2, $3, $4) RETURNING id_cliente, cpf, nome, email`,
      [cpf, nome, email, senha]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const atualizarCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { cpf, nome, email, senha } = req.body;
    const { rows } = await pool.query(
      `UPDATE cliente SET cpf=$1, nome=$2, email=$3, senha=$4 WHERE id_cliente=$5 RETURNING id_cliente, cpf, nome, email`,
      [cpf, nome, email, senha, id]
    );
    if (rows.length === 0) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const excluirCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await pool.query('DELETE FROM cliente WHERE id_cliente = $1', [id]);
    res.json({ mensagem: 'Cliente excluído (se existia)' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const totalGastoCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { rows } = await pool.query('SELECT fn_cliente_total_gasto($1) AS total', [id]);
    res.json({ id_cliente: id, total_gasto: rows[0].total });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
