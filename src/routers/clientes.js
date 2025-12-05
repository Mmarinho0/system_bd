import { Router } from 'express';
import {
  listarClientes,
  obterClientePorId,
  criarCliente,
  atualizarCliente,
  excluirCliente,
  totalGastoCliente
} from '../controllers/clientesController.js';
// Importa funções do controller de endereço
import { 
  criarEndereco, 
  listarEnderecosPorCliente 
} from '../controllers/enderecoController.js';

const router = Router();

// --- ROTAS CRUD BÁSICO DE CLIENTES ---
router.get('/', listarClientes);
router.get('/:id', obterClientePorId);
router.post('/', criarCliente);
router.put('/:id', atualizarCliente);
router.delete('/:id', excluirCliente);

// --- ROTAS DE FUNCIONALIDADE AVANÇADA DE CLIENTES ---

// GET /clientes/:id/total-gasto - Usa fn_cliente_total_gasto
router.get('/:id/total-gasto', totalGastoCliente);

// --- ROTAS ANINHADAS DE ENDEREÇO ---
// POST /clientes/:id/enderecos - Cria um novo endereço para o cliente
router.post('/:id/enderecos', criarEndereco);

// GET /clientes/:id/enderecos - Lista todos os endereços do cliente
router.get('/:id/enderecos', listarEnderecosPorCliente);


export default router;