"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllCountries = fetchAllCountries;
const axios_1 = __importDefault(require("axios"));
const API_URL = 'https://restcountries.com/v3.1/all';
async function fetchAllCountries() {
    try {
        const response = await axios_1.default.get(API_URL);
        // Retornamos apenas os dados, já tipados corretamente pelo axios
        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar os países:', error);
        // Lançamos o erro novamente para que o código que chamou a função possa tratá-lo
        throw new Error('Não foi possível obter a lista de países da API.');
    }
}
//# sourceMappingURL=api.js.map