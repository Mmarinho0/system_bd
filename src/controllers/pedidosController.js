import pool from '../../db.js';

export const listarPedidos = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id_pedido, data_pedido, status, id_cliente, valor_total FROM pedido ORDER BY id_pedido');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const obterPedidoPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { rows } = await pool.query('SELECT * FROM pedido WHERE id_pedido = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ mensagem: 'Pedido não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const criarPedido = async (req, res) => {
  try {
    const { id_cliente, status = 'Aberto' } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO pedido (id_cliente, status) VALUES ($1, $2) RETURNING id_pedido, data_pedido, status, id_cliente, valor_total`,
      [id_cliente, status]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const atualizarPedido = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;
    const { rows } = await pool.query(
      `UPDATE pedido SET status = $1 WHERE id_pedido = $2 RETURNING id_pedido, data_pedido, status, id_cliente, valor_total`,
      [status, id]
    );
    if (rows.length === 0) return res.status(404).json({ mensagem: 'Pedido não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const excluirPedido = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await pool.query('DELETE FROM pedido WHERE id_pedido = $1', [id]);
    res.json({ mensagem: 'Pedido excluído (se existia)' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const finalizarPedido = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    await pool.query('CALL finalizar_pedido($1)', [id]);

    const { rows } = await pool.query('SELECT id_pedido, status, valor_total FROM pedido WHERE id_pedido = $1', [id]);

    res.json({ mensagem: 'Procedure finalizar_pedido executada', pedido: rows[0] });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};
