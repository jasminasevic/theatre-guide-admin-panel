import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../app.constants';
import { ICurrencyData } from '../../shared/interfaces/ICurrencyData';
import { Currency } from './currencies.model';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  private API_URL = API_URL;

  constructor(private httpClient: HttpClient) { }

  getAllCurrencies(perPage: number, pageNumber: number, sortOrder: string, searchQuery: string)
    : Observable<ICurrencyData>{

      let params = new HttpParams();

      params = params.append('perPage', String(perPage));
      params = params.append('pageNumber', String(pageNumber));
      params = params.append('sortOrder', String(sortOrder));
      params = params.append('searchQuery', String(searchQuery));

      return this.httpClient.get<ICurrencyData>(this.API_URL + '/currencies', { params })
        .pipe(
          map((currencies: ICurrencyData) => currencies),
          catchError(err => throwError(err))
        )
  }

  getCurrencyList(): Observable<Currency[]>{
    return this.httpClient.get<Currency[]>(this.API_URL + '/currencies')
      .pipe(
        map((currency: Currency[]) => currency),
        catchError(err => throwError(err))
      )
  }

  getCurrency(id: number) : Observable<Currency>{
    return this.httpClient.get<Currency>(this.API_URL + '/currencies/' + id)
      .pipe(
        map((currency: Currency) => currency),
        catchError(err => throwError(err))
      )
  }

  addCurrency(currency: Currency) : Observable<Currency>{
    return this.httpClient.post<Currency>(this.API_URL + '/currencies', currency)
      .pipe(
        map((currency: Currency) => currency),
        catchError(err => throwError(err))
      )
  }

  editCurrency(id: number, currency: Currency) : Observable<Currency>{
    return this.httpClient.put<Currency>(this.API_URL + '/currencies/' + id, currency)
      .pipe(
        map((currency: Currency) => currency),
        catchError(err => throwError(err))
      )
  }

  deleteCurrency(id:number){
    return this.httpClient.delete<Currency>(this.API_URL + '/currencies/' + id)
      .subscribe()
  }

}
