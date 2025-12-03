import { Router } from 'express';
import {
  listarPedidos,
  obterPedidoPorId,
  criarPedido,
  atualizarPedido,
  excluirPedido,
  finalizarPedido
} from '../controllers/pedidosController.js';

const router = Router();

router.get('/', listarPedidos);
router.get('/:id', obterPedidoPorId);
router.post('/', criarPedido);
router.put('/:id', atualizarPedido);
router.delete('/:id', excluirPedido);

router.post('/:id/finalizar', finalizarPedido);

export default router;
