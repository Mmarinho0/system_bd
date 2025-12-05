import { Router } from 'express';
// 1. Importa as funções CRUD básicas do Controller de Produtos
import {
  listarProdutos,
  obterProdutoPorId,
  criarProduto,
  atualizarProduto,
  excluirProduto
} from '../controllers/produtoController.js';

// 2. Importa a função reporEstoque do Controller de Estoque (local correto)
import { reporEstoque } from '../controllers/estoqueController.js'; 

const router = Router();

// Rotas CRUD
router.get('/', listarProdutos);
router.get('/:id', obterProdutoPorId);
router.post('/', criarProduto);
router.put('/:id', atualizarProduto);
router.delete('/:id', excluirProduto);

// ROTA PARA TESTAR A PROCEDURE: POST /produtos/:id/repor-estoque
// Chama a função reporEstoque, que executa a Stored Procedure 'repor_estoque' no banco.
router.post('/:id/repor-estoque', reporEstoque);

export default router;