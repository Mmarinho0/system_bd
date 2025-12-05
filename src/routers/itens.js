// Se você está importando itensRoutes no server.js
import { Router } from 'express';
import { removerItem } from '../controllers/itemPedidoController.js';

const router = Router();

// DELETE /itens/:id (Para remover um item de pedido pelo seu ID)
router.delete('/:id', removerItem);

export default router;