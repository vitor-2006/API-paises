"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryService = void 0;
class CountryService {
    countries = [];
    constructor(countries) {
        this.countries = countries;
    }
    // Método para buscar por nome (case-insensitive)
    searchByName(searchTerm) {
        const term = searchTerm.toLowerCase();
        return this.countries.filter(country => country.name.common.toLowerCase().includes(term));
    }
    // Método para filtrar por região
    filterByRegion(region) {
        return this.countries.filter(country => country.region === region);
    }
}
exports.CountryService = CountryService;
//# sourceMappingURL=CountryService.js.map