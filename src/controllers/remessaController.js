import pool from '../../db.js';

// POST /pedidos/:id/remessa - Cria uma remessa (Disparado após pagamento)
export const criarRemessa = async (req, res) => {
    try {
      const id_pedido = parseInt(req.params.id, 10);
      const { codigo_rastreio, transportadora } = req.body;
  
      // Verifica se o pedido existe e está pago/finalizado
      const pedidoResult = await pool.query('SELECT status FROM pedido WHERE id_pedido = $1', [id_pedido]);
      if (pedidoResult.rows.length === 0) {
          return res.status(404).json({ mensagem: 'Pedido não encontrado.' });
      }
      if (pedidoResult.rows[0].status !== 'Pago') {
          return res.status(400).json({ mensagem: 'O pedido deve estar Pago antes de criar a remessa.' });
      }

      // Cria a remessa e atualiza o status do pedido
      const { rows } = await pool.query(
        `INSERT INTO remessa (id_pedido, codigo_rastreio, transportadora)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [id_pedido, codigo_rastreio, transportadora]
      );

      // Atualiza o status do pedido para 'Enviado'
      await pool.query(`UPDATE pedido SET status = 'Enviado' WHERE id_pedido = $1`, [id_pedido]);
      
      res.status(201).json({ 
        mensagem: 'Remessa criada e pedido atualizado para Enviado.',
        remessa: rows[0] 
      });

    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  };


// GET /remessas/:id - Obtém detalhes de uma remessa
export const obterRemessaPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { rows } = await pool.query('SELECT * FROM remessa WHERE id_remessa = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ mensagem: 'Remessa não encontrada' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// PUT /remessas/:id - Atualiza detalhes de uma remessa
export const atualizarRemessa = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { codigo_rastreio, data_envio } = req.body;
    const { rows } = await pool.query(
      `UPDATE remessa SET codigo_rastreio=$1, data_envio=$2 
       WHERE id_remessa=$3 
       RETURNING *`,
      [codigo_rastreio, data_envio, id]
    );
    if (rows.length === 0) return res.status(404).json({ mensagem: 'Remessa não encontrada' });
    res.json(rows[0]);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};