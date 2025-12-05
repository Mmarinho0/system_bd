import pool from '../../db.js';

// GET /produtos - Lista todos os produtos
export const listarProdutos = async (req, res) => {
    try {
        // Seleciona as colunas usando o nome do BD, mas renomeia para manter o padrão JSON (nome/descricao)
        const { rows } = await pool.query('SELECT id_produto, nome_produto AS nome, preco, estoque, descricao_produto AS descricao FROM produto ORDER BY id_produto');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /produtos/:id - Obtém um produto por ID
export const obterProdutoPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        // Seleciona e renomeia as colunas
        const { rows } = await pool.query('SELECT id_produto, nome_produto AS nome, preco, estoque, descricao_produto AS descricao FROM produto WHERE id_produto = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ mensagem: 'Produto não encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// POST /produtos - Cria um novo produto
export const criarProduto = async (req, res) => {
    try {
        const { nome, preco, estoque, descricao } = req.body;
        
        // 1. Validação: Checa se os dados JSON (nome e preco) foram fornecidos
        if (!nome || preco === undefined) { 
            return res.status(400).json({ erro: 'Nome e Preço do produto são obrigatórios.' });
        }

        // 2. Validação para garantir que o preço seja um número positivo
        if (isNaN(preco) || preco <= 0) {
            return res.status(400).json({ erro: 'O Preço deve ser um valor numérico positivo.' });
        }

        // 3. Execução da Inserção (usando os nomes de coluna CORRETOS do BD: nome_produto e descricao_produto)
        const { rows } = await pool.query(
            `INSERT INTO produto (nome_produto, preco, estoque, descricao_produto)
             VALUES ($1, $2, $3, $4)
             RETURNING id_produto, nome_produto AS nome, preco, estoque, descricao_produto AS descricao`,
            [nome, preco, estoque || 0, descricao || null] 
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        // Captura e retorna erros do banco, como falha na FK de categoria, se aplicável
        res.status(400).json({ erro: err.message });
    }
};

// PUT /produtos/:id - Atualiza um produto
export const atualizarProduto = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nome, preco, estoque, descricao } = req.body;

        if (!nome || preco === undefined) { 
            return res.status(400).json({ erro: 'Nome e Preço do produto são obrigatórios para a atualização.' });
        }
        
        if (isNaN(preco) || preco <= 0) {
            return res.status(400).json({ erro: 'O Preço deve ser um valor numérico positivo.' });
        }

        // 3. Execução da Atualização (usando os nomes de coluna CORRETOS do BD: nome_produto e descricao_produto)
        const { rows } = await pool.query(
            `UPDATE produto SET nome_produto=$1, preco=$2, estoque=$3, descricao_produto=$4 
             WHERE id_produto=$5 
             RETURNING id_produto, nome_produto AS nome, preco, estoque, descricao_produto AS descricao`,
            [nome, preco, estoque, descricao, id]
        );
        if (rows.length === 0) return res.status(404).json({ mensagem: 'Produto não encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

// DELETE /produtos/:id - Exclui um produto
export const excluirProduto = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { rowCount } = await pool.query('DELETE FROM produto WHERE id_produto = $1', [id]);
        if (rowCount === 0) return res.status(404).json({ mensagem: 'Produto não encontrado' });
        res.json({ mensagem: 'Produto excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};