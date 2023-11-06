import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { ICountry } from '../interfaces/countries.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Array<ICountry>> {
    return this.http
      .get<Array<ICountry>>(url)
      .pipe(
        catchError(() => of([])),
        delay(2000)
      );
  }

  searchCountryByAlphaCode(code: string): Observable<ICountry | null> {
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

  searchCapital(term: string): Observable<Array<ICountry>> {
    let url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url);
  }

  searchCountry(term: string): Observable<Array<ICountry>> {
    let url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url);
  }

  searchRegion(term: string): Observable<Array<ICountry>> {
    let url = `${this.apiUrl}/region/${term}`;
    return this.getCountriesRequest(url);
  }
}
