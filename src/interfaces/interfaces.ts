// Definindo um Type Alias ou Enum para as regiões
export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Antarctic';

// Interface para as bandeiras
interface Flags {
  png: string;
  svg: string;
}

// Interface principal para um país
export interface ICountry {
  name: {
    common: string;
    official: string;
  };
  region: Region;
  capital: string[];
  population: number;
  flags: Flags;
  // Se precisar de mais propriedades, adicione aqui (ex: languages, currencies)
}

export interface Country {
  name: {
      common: string;
      official: string;
  };
  region: string;
  population: number;
  // Adicione outras propriedades relevantes que você queira usar
}