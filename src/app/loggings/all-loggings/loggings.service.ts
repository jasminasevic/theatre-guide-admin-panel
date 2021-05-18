import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from 'src/app/app.constants';
import { ILoggingData } from '../../shared/interfaces/ILoggingData';

@Injectable({
  providedIn: 'root'
})
export class LoggingsService {

  private readonly API_URL = API_URL;

  constructor(private httpClient: HttpClient) { }

  getAllLoggings(perPage: number, pageNumber: number, sortOrder: String, searchQuery: String) 
  : Observable<ILoggingData>{
    let params = new HttpParams();

    params = params.append('perPage', String(perPage));
    params = params.append('pageNumber', String(pageNumber));
    params = params.append('sortOrder', String(sortOrder));
    params = params.append('searchQuery', String(searchQuery));

    return this.httpClient.get<ILoggingData>(this.API_URL + '/loggings', {params})
      .pipe(
        map((loggings: ILoggingData) => loggings),
        catchError(err => throwError(err))
      )
  }

}
