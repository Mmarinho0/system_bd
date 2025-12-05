import pool from '../../db.js';

// Função auxiliar para rota /produtos/:id/repor
export const reporEstoque = async (req, res) => {
  try {
    const id_produto = parseInt(req.params.id, 10);
    const { quantidade } = req.body; 

    if (!quantidade || quantidade <= 0) {
        return res.status(400).json({ erro: 'A quantidade de reposição deve ser um número positivo.' });
    }

    // Chama a procedure de BD: CALL repor_estoque(p_id_produto, p_quantidade)
    await pool.query('CALL repor_estoque($1, $2)', [id_produto, quantidade]);
    
    const { rows } = await pool.query('SELECT estoque FROM produto WHERE id_produto = $1', [id_produto]);
    
    res.json({ 
        mensagem: `Estoque do produto ${id_produto} reposto com sucesso.`,
        estoque_atual: rows[0].estoque
    });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// Função auxiliar para rota /produtos/:id/estoque
export const obterEstoquePorProduto = async (req, res) => {
    try {
        const id_produto = parseInt(req.params.id, 10);
        
        const { rows } = await pool.query('SELECT estoque FROM produto WHERE id_produto = $1', [id_produto]);
        
        if (rows.length === 0) return res.status(404).json({ mensagem: 'Produto não encontrado' });

        res.json({
            id_produto: id_produto,
            estoque_atual: rows[0].estoque
        });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}