import pool from '../../db.js';

// POST /clientes/:id/enderecos - Cria um novo endereço para o cliente
export const criarEndereco = async (req, res) => {
    try {
        const id_cliente = parseInt(req.params.id, 10);
        const { rua, numero, cidade, estado, cep } = req.body;

        if (!rua || !numero || !cidade || !estado || !cep) {
            return res.status(400).json({ erro: 'Todos os campos de endereço (rua, numero, cidade, estado, cep) são obrigatórios.' });
        }

        const { rows } = await pool.query(
            `INSERT INTO endereco (id_cliente, rua, numero, cidade, estado, cep)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [id_cliente, rua, numero, cidade, estado, cep]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

// GET /clientes/:id/enderecos - Lista todos os endereços do cliente
export const listarEnderecosPorCliente = async (req, res) => {
    try {
        const id_cliente = parseInt(req.params.id, 10);
        const { rows } = await pool.query('SELECT * FROM endereco WHERE id_cliente = $1 ORDER BY id_endereco', [id_cliente]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// PUT /enderecos/:id - Atualiza endereço pelo ID do endereço (Rota separada)
export const atualizarEndereco = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { rua, numero, cidade, estado, cep } = req.body;
    const { rows } = await pool.query(
      `UPDATE endereco SET rua=$1, numero=$2, cidade=$3, estado=$4, cep=$5 
       WHERE id_endereco=$6 
       RETURNING *`,
      [rua, numero, cidade, estado, cep, id]
    );
    if (rows.length === 0) return res.status(404).json({ mensagem: 'Endereço não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// DELETE /enderecos/:id - Exclui endereço pelo ID do endereço (Rota separada)
export const excluirEndereco = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { rowCount } = await pool.query('DELETE FROM endereco WHERE id_endereco = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ mensagem: 'Endereço não encontrado' });
    res.json({ mensagem: 'Endereço excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};