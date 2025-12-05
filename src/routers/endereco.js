import { Router } from 'express';
import {
  atualizarEndereco,
  excluirEndereco
} from '../controllers/enderecoController.js';

const router = Router();

// Rotas para manipular endereços individualmente (já existe GET/POST aninhado em /clientes)
router.put('/:id', atualizarEndereco);
router.delete('/:id', excluirEndereco);

export default router;