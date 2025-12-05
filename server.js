import express from 'express';
import clientesRoutes from './src/routers/clientes.js';
import pedidosRoutes from './src/routers/pedidos.js';
import remessasRoutes from './src/routers/remessa.js';
import enderecosRoutes from './src/routers/endereco.js';
import produtosRoutes from './src/routers/produtos.js'; // Assumindo que você terá rotas para produtos

import 'dotenv/config';

const app = express();
app.use(express.json());

app.use('/clientes', clientesRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/remessas', remessasRoutes);
app.use('/enderecos', enderecosRoutes);
app.use('/produtos', produtosRoutes);

app.get('/', (req, res) => res.send('API E-commerce rodando'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));