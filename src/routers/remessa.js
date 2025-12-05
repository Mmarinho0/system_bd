import { Router } from 'express';
import {
  obterRemessaPorId,
  atualizarRemessa
} from '../controllers/remessaController.js';

const router = Router();

// GET /remessas/:id - Obter detalhes de uma remessa específica
router.get('/:id', obterRemessaPorId);

// PUT /remessas/:id - Atualizar detalhes (como código de rastreio) de uma remessa
router.put('/:id', atualizarRemessa);

export default router;