import { Router } from 'express';
import {
  listarPedidos,
  obterPedidoPorId,
  criarPedido,
  atualizarPedido,
  excluirPedido,
  pagarPedido
} from '../controllers/pedidosController.js';
// Importa controllers aninhados
import { listarAuditoriaPorPedido } from '../controllers/auditoriaPedidoController.js';
import { criarRemessa } from '../controllers/remessaController.js';
import { listarItensPorPedido, adicionarItem } from '../controllers/itemPedidoController.js'; // Importação do novo Controller

const router = Router();

// Rotas CRUD padrão de Pedidos
router.get('/', listarPedidos);
router.get('/:id', obterPedidoPorId);
router.post('/', criarPedido);
router.put('/:id', atualizarPedido);
router.delete('/:id', excluirPedido);

// Rotas de Ação e Aninhadas
router.post('/:id/pagar', pagarPedido); // Finaliza e registra pagamento
router.post('/:id/remessa', criarRemessa); // Cria remessa (tracking)
router.get('/:id/auditoria', listarAuditoriaPorPedido); // Consulta histórico de alterações

// Rotas de Itens de Pedido (Aninhadas no ID do pedido)
router.get('/:id/itens', listarItensPorPedido); // Lista todos os itens de um pedido
router.post('/:id/itens', adicionarItem);      // Adiciona um item a um pedido

export default router;