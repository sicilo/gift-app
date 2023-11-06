import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { ICountry } from '../interfaces/countries.interfaces';
import { ICacheStore } from '../interfaces/cache-store.interfaces';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: ICacheStore = {
    byCapital: {
      term: '',
      countries: []
    },
    byCountries: {
      term: '',
      countries: []
    },
    byRegion: {
      term: '',
      countries: []
    }
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Array<ICountry>> {
    return this.http
      .get<Array<ICountry>>(url)
      .pipe(
        catchError(() => of([])),
        delay(2000)
      );
  }

  public searchCountryByAlphaCode(code: string): Observable<ICountry | null> {
    let url = `${this.apiUrl}/alpha/${code}`;
    return this.http
      .get<Array<ICountry>>(url)
      .pipe(
        map(countries =>
          countries.length > 0 ? countries[0] : null
        ),
        catchError((error: HttpErrorResponse) => {
          return of(null);
        })
      );
  }

  public searchCapital(term: string): Observable<Array<ICountry>> {
    let url = `${this.apiUrl}/capital/${term}`;
    return this
      .getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {
          term,
          countries
        }),
        tap(() => this.saveToLocalStorage())
      )

  }

  public searchCountry(term: string): Observable<Array<ICountry>> {
    let url = `${this.apiUrl}/name/${term}`;
    return this
      .getCountriesRequest(url)
      .pipe(
        tap((countries) => this.cacheStore.byCountries = {
          term,
          countries
        }),
        tap(() => this.saveToLocalStorage())
      );
  }

  searchRegion(term: Region): Observable<Array<ICountry>> {
    let url = `${this.apiUrl}/region/${term}`;
    return this
      .getCountriesRequest(url)
      .pipe(
        tap((countries) => this.cacheStore.byRegion = {
          term,
          countries
        }),
        tap(() => this.saveToLocalStorage())
      );
  }
}
