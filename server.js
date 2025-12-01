import express from 'express';
import clientesRoutes from './src/routers/clientes.js';
import pedidosRoutes from './src/routers/pedidos.js';

import 'dotenv/config';

const app = express();
app.use(express.json());

app.use('/clientes', clientesRoutes);
app.use('/pedidos', pedidosRoutes);

app.get('/', (req, res) => res.send('API E-commerce rodando'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
