import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../app.constants';
import { IPurchaseData } from '../../shared/interfaces/IPurchaseData';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private httpClient: HttpClient) { }

  private API_URL = API_URL;

  getAllPurchases(perPage: number, pageNumber: number, sortOrder: String, searchQuery: String)
    :Observable<IPurchaseData>{
    let params = new HttpParams();

    params = params.append('perPage', String(perPage));
    params = params.append('pageNumber', String(pageNumber));
    params = params.append('sortOrder', String(sortOrder));
    params = params.append('searchQuery', String(searchQuery));

    return this.httpClient.get<IPurchaseData>(this.API_URL + '/purchases', { params })
      .pipe(
        map((purchases: IPurchaseData) => purchases),
        catchError(err => throwError(err))
      )
  }


}
