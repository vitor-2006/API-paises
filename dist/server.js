"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const PORT = 3000;
const API_URL = 'https://restcountries.com/v3.1/all';
// Rota para buscar e filtrar os países
app.get('/countries', async (req, res) => {
    try {
        const { name, region } = req.query;
        // 2. Buscar dados da API REST Countries
        const response = await axios_1.default.get(API_URL);
        const countries = response.data;
        // 3. Lógica de filtragem e busca
        let filteredCountries = countries;
        if (region && typeof region === 'string') {
            filteredCountries = filteredCountries.filter((country) => country.region.toLowerCase() === region.toLowerCase());
        }
        if (name && typeof name === 'string') {
            filteredCountries = filteredCountries.filter((country) => country.name.common.toLowerCase().includes(name.toLowerCase()));
        }
        res.status(200).json(filteredCountries);
    }
    catch (error) {
        console.error('Erro ao buscar os dados:', error);
        res.status(500).json({ message: 'Erro ao processar a requisição.' });
    }
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map