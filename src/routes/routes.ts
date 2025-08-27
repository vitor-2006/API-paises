import axios from 'axios';
import express, { Router, Request, Response, NextFunction, ErrorRequestHandler }  from 'express'
import { AppError, errorHandler } from '../middleware/error';
import { Country } from '../interfaces/interfaces';

const routes: Router = express.Router();

const PORT = 3000;
export const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags';
export const API_URL_NAME = 'https://restcountries.com/v3.1/name/'

routes.get('/countries', async (req: Request, res: Response) => {
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

routes.get('/countries/:pais', async (req: Request<{pais:string}>, res: Response, next: NextFunction) => {
    const response = await axios.get<Country[]>(API_URL_NAME + req.params.pais);
    const countries: Country[] = response.data;
    if(countries){
        return res.json(countries)
    }
    // Pass error to the global error handler
    return next(new AppError('país não encontrado!', 404));
})

export {routes}