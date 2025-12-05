import pool from '../../db.js';

// GET /pedidos/:id/auditoria
export const listarAuditoriaPorPedido = async (req, res) => {
  try {
    const id_pedido = parseInt(req.params.id, 10);
    const { rows } = await pool.query('SELECT * FROM auditoria_pedido WHERE id_pedido = $1 ORDER BY data_alteracao DESC', [id_pedido]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};