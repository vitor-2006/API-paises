import axios from 'axios';
import express, { Request, Response, NextFunction, ErrorRequestHandler }  from 'express'
import {loggingMiddleware} from './middleware/logging'
import { AppError, errorHandler } from './middleware/error';
import { API_URL, API_URL_NAME } from './routes/routes';

// 1. Definindo a interface para o objeto de país
interface Country {
    name: {
        common: string;
        official: string;
    };
    region: string;
    population: number;
    // Adicione outras propriedades relevantes que você queira usar
}

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggingMiddleware);

// Rota para buscar e filtrar os países
app.get('/countries', async (req: Request, res: Response) => {
    try {
        const { name, region } = req.query;

        // 2. Buscar dados da API REST Countries
        const response = await axios.get<Country[]>(API_URL);
        const countries: Country[] = response.data;

        // 3. Lógica de filtragem e busca
        let filteredCountries = countries;

        if (region && typeof region === 'string') {
            filteredCountries = filteredCountries.filter(
                (country) => country.region.toLowerCase() === region.toLowerCase()
            );
        }

        if (name && typeof name === 'string') {
            filteredCountries = filteredCountries.filter(
                (country) => country.name.common.toLowerCase().includes(name.toLowerCase())
            );
        }

        res.status(200).json(filteredCountries);
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        res.status(500).json({ message: 'Erro ao processar a requisição.' });
    }
});

app.get('/countries/:pais', async (req: Request<{pais:string}>, res: Response, next: NextFunction) => {
    const response = await axios.get<Country[]>(API_URL_NAME + req.params.pais);
    const countries: Country[] = response.data;
    if(countries){
        return res.json(countries)
    }
    // Pass error to the global error handler
    return next(new AppError('país não encontrado!', 404));
})

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});