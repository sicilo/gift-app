import { ICountry } from "./countries.interfaces";
import { Region } from "./region.type";

export interface ICacheStore {
  byCapital: ISearchedCountries,
  byCountries: ISearchedCountries,
  byRegion: ISearchedRegionCountries
}

export interface ISearchedCountries {
  term: string;
  countries: Array<ICountry>
}

export interface ISearchedRegionCountries {
  term: Region;
  countries: Array<ICountry>
}
