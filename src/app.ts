import { fetchAllCountries } from './api';
import { CountryService } from './CountryService';
import { Region } from './interfaces';

async function main() {
  console.log('Buscando dados da API...');
  try {
    const allCountries = await fetchAllCountries();
    const countryService = new CountryService(allCountries);

    console.log(`\nTotal de países encontrados: ${allCountries.length}`);

    // Testando a pesquisa por nome
    const searchTerm = 'brazil';
    console.log(`\nPesquisando por "${searchTerm}":`);
    const searchResults = countryService.searchByName(searchTerm);
    searchResults.forEach(country => console.log(`- ${country.name.common}`));

    // Testando o filtro por região
    const regionToFilter: Region = 'Americas';
    console.log(`\nFiltrando por região "${regionToFilter}":`);
    const filteredResults = countryService.filterByRegion(regionToFilter);
    filteredResults.forEach(country => console.log(`- ${country.name.common}`));

  } catch (error) {
    if (error instanceof Error) {
      console.error(`Erro: ${error.message}`);
    }
  }
}

main();
