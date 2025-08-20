import axios from 'axios';
import { ICountry } from './interfaces'; // Certifique-se de que o caminho está correto

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags';

export async function fetchAllCountries(): Promise<ICountry[]> {
  try {
    const response = await axios.get<ICountry[]>(API_URL);
    // Retornamos apenas os dados, já tipados corretamente pelo axios
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os países:', error);
    // Lançamos o erro novamente para que o código que chamou a função possa tratá-lo
    throw new Error('Não foi possível obter a lista de países da API.');
  }
}