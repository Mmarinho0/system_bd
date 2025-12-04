import { Router } from 'express';
import {
  listarPedidos,
  obterPedidoPorId,
  criarPedido,
  atualizarPedido,
  excluirPedido,
  pagarPedido
} from '../controllers/pedidosController.js';

const router = Router();

router.get('/', listarPedidos);
router.get('/:id', obterPedidoPorId);
router.post('/', criarPedido);
router.put('/:id', atualizarPedido);
router.delete('/:id', excluirPedido);

router.post('/:id/pagar', pagarPedido);

export default router;
