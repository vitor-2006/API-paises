import express, { Request, Response } from 'express';
import axios from 'axios';

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
const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags';
const API_URL_NAME = 'https://restcountries.com/v3.1/name/'

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

app.get('/countries/:pais', async (req: Request<{pais:string}>, res: Response) => {
    const response = await axios.get<Country[]>(API_URL_NAME + req.params.pais);
    const countries: Country[] = response.data;
    return res.json(countries)
})
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});