import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL, httpOptions } from 'src/app/app.constants';
import { IActorData } from '../../shared/interfaces/IActorData';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  private readonly API_URL = API_URL;
  private readonly httpOptions = httpOptions;

  constructor(private httpClient: HttpClient) { }

  /** CRUD METHODS */

  getAllActors(perPage: number, pageNumber: number, sortOrder: string, searchQuery: string)
   : Observable<IActorData> {

    let params = new HttpParams;

    params = params.append('perPage', String(perPage));
    params = params.append('pageNumber', String(pageNumber));
    params = params.append('sortOrder', String(sortOrder));
    params = params.append('searchQuery', String(searchQuery));

    return this.httpClient.get<IActorData>(this.API_URL + '/actors/', { params })
      .pipe(
        map((actor: IActorData) => actor),
        catchError(err => throwError(err))
      )
  }


}
