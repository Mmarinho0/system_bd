import { Router } from 'express';
import {
  listarPedidos,
  obterPedidoPorId,
  criarPedido,
  atualizarPedido,
  excluirPedido,
  finalizarPedido  // endpoint que chama a procedure
} from '../controllers/pedidosController.js';

const router = Router();

router.get('/', listarPedidos);
router.get('/:id', obterPedidoPorId);
router.post('/', criarPedido);
router.put('/:id', atualizarPedido);
router.delete('/:id', excluirPedido);

// endpoint que chama a procedure finalizar_pedido(p_id_pedido)
router.post('/:id/finalizar', finalizarPedido);

export default router;
