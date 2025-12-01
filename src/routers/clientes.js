import { Router } from 'express';
import {
  listarClientes,
  obterClientePorId,
  criarCliente,
  atualizarCliente,
  excluirCliente,
  totalGastoCliente
} from '../controllers/clientesController.js';

const router = Router();

router.get('/', listarClientes);
router.get('/:id', obterClientePorId);
router.post('/', criarCliente);
router.put('/:id', atualizarCliente);
router.delete('/:id', excluirCliente);

// endpoint que usa a função fn_cliente_total_gasto(p_id_cliente)
router.get('/:id/total-gasto', totalGastoCliente);

export default router;
