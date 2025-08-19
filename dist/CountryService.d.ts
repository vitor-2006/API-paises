import { ICountry, Region } from './interfaces';
export declare class CountryService {
    private countries;
    constructor(countries: ICountry[]);
    searchByName(searchTerm: string): ICountry[];
    filterByRegion(region: Region): ICountry[];
}
//# sourceMappingURL=CountryService.d.ts.map