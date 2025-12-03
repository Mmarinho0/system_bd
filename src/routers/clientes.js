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

router.get('/:id/total-gasto', totalGastoCliente);

export default router;
