import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from 'src/app/app.constants';
import { IDirectorData } from '../../shared/interfaces/IDirectorData';
import { Director } from './directors.model';

@Injectable({
  providedIn: 'root'
})
export class DirectorsService {

  private readonly API_URL = API_URL;

  constructor(private httpClient: HttpClient) { }

  getAllDirectors(perPage: number, pageNumber: number, sortOrder: String, searchQuery: String)
    : Observable<IDirectorData>{

      let params = new HttpParams();

      params = params.append('perPage', String(perPage));
      params = params.append('pageNumber', String(pageNumber));
      params = params.append('sortOrder', String(sortOrder));
      params = params.append('searchQuery', String(searchQuery));

      return this.httpClient.get<any>(this.API_URL + '/directors', { params })
        .pipe(
          map((director: IDirectorData) => director),
          catchError(err => throwError(err))
        );
  }


}
