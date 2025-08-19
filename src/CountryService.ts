import { ICountry, Region } from './interfaces';

export class CountryService {
  private countries: ICountry[] = [];

  constructor(countries: ICountry[]) {
    this.countries = countries;
  }

  // Método para buscar por nome (case-insensitive)
  public searchByName(searchTerm: string): ICountry[] {
    const term = searchTerm.toLowerCase();
    return this.countries.filter(country =>
      country.name.common.toLowerCase().includes(term)
    );
  }

  // Método para filtrar por região
  public filterByRegion(region: Region): ICountry[] {
    return this.countries.filter(country => country.region === region);
  }
}