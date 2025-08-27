import express, { Request, Response, NextFunction, ErrorRequestHandler }  from 'express'
import {loggingMiddleware} from './middleware/logging'
import { AppError, errorHandler } from './middleware/error';
import { routes } from './routes/routes';

// 1. Definindo a interface para o objeto de país

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggingMiddleware);
app.use(routes)

// Rota para buscar e filtrar os países

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});