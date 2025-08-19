export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Antarctic';
interface Flags {
    png: string;
    svg: string;
}
export interface ICountry {
    name: {
        common: string;
        official: string;
    };
    region: Region;
    capital: string[];
    population: number;
    flags: Flags;
}
export {};
//# sourceMappingURL=interfaces.d.ts.map