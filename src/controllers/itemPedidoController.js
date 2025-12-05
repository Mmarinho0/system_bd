import pool from '../../db.js';

// GET /pedidos/:id/itens - Lista todos os itens de um pedido
export const listarItensPorPedido = async (req, res) => {
  try {
    const id_pedido = parseInt(req.params.id, 10);
    // Busca os itens do pedido, incluindo o nome do produto para melhor visualização
    const { rows } = await pool.query(
      `SELECT ip.id_item, ip.id_produto, p.nome_produto, ip.quantidade, ip.preco_item
       FROM item_pedido ip
       JOIN produto p ON ip.id_produto = p.id_produto
       WHERE ip.id_pedido = $1
       ORDER BY ip.id_item`,
      [id_pedido]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// POST /pedidos/:id/itens - Adiciona um produto ao pedido
export const adicionarItem = async (req, res) => {
  try {
    const id_pedido = parseInt(req.params.id, 10);
    const { id_produto, quantidade } = req.body;
    
    // 1. Busca o preço atual do produto para registrar o preço de venda no item do pedido
    const produtoResult = await pool.query('SELECT preco FROM produto WHERE id_produto = $1', [id_produto]);
    if (produtoResult.rows.length === 0) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    const preco_item = produtoResult.rows[0].preco;

    // 2. Insere o item. 
    // OBS: Os TRIGGERS de estoque (validação) e cálculo de valor total do pedido são disparados aqui.
    const { rows } = await pool.query(
      `INSERT INTO item_pedido (id_pedido, id_produto, quantidade, preco_item)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id_pedido, id_produto, quantidade, preco_item]
    );
    
    res.status(201).json(rows[0]);
  } catch (err) {
    // Retorna erro amigável se o TRIGGER de estoque falhar
    res.status(400).json({ erro: `Erro ao adicionar item: ${err.message}` });
  }
};

// DELETE /itens/:id - Remove um item específico pelo ID do item
export const removerItem = async (req, res) => {
  try {
    const id_item = parseInt(req.params.id, 10);
    
    // O TRIGGER de cálculo de valor total do pedido será disparado no DELETE
    const { rowCount } = await pool.query('DELETE FROM item_pedido WHERE id_item = $1', [id_item]);
    
    if (rowCount === 0) return res.status(404).json({ mensagem: 'Item de pedido não encontrado' });
    
    res.json({ mensagem: 'Item de pedido removido com sucesso.' });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};