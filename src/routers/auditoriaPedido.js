import { Router } from 'express';
import {
  listarPedidos,
  obterPedidoPorId,
  criarPedido,
  atualizarPedido,
  excluirPedido,
  pagarPedido,
  adicionarItem
} from '../controllers/pedidosController.js';

// Importa o Controller de Auditoria que você forneceu
import { listarAuditoriaPorPedido } from '../controllers/auditoriaController.js'; 

const router = Router();

router.get('/', listarPedidos);
router.get('/:id', obterPedidoPorId);
router.post('/', criarPedido);
router.put('/:id', atualizarPedido);
router.delete('/:id', excluirPedido);

router.post('/:id/pagar', pagarPedido);
router.post('/:id/itens', adicionarItem);

// NOVA ROTA: Obtém histórico de auditoria para um pedido específico
router.get('/:id/auditoria', listarAuditoriaPorPedido); 

export default router;