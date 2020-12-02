import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from 'src/app/app.constants';
import { Repertoire } from './repertoires.model';
import { IRepertoireData } from '../../shared/interfaces/IRepertoireData';
import { Play } from './plays.model';

@Injectable({
  providedIn: 'root'
})
export class RepertoiresService {

  constructor(private httpClient: HttpClient) { }

  private API_URL = API_URL;

  getAllRepertoires(perPage: number, pageNumber: number, sortOrder: String, searchQuery: String) : Observable<IRepertoireData>{
    let params = new HttpParams();

    params = params.append('perPage', String(perPage));
    params = params.append('pageNumber', String(pageNumber));
    params = params.append('sortOrder', String(sortOrder));
    params = params.append('searchQuery', String(searchQuery));

    return this.httpClient.get<IRepertoireData>(this.API_URL + '/repertoires', { params })
      .pipe(
        map((repertoire: IRepertoireData) => repertoire),
        catchError(err => throwError(err))
      )
  }

  getRepertoire(id): Observable<Play>{
    return this.httpClient.get<Play>(this.API_URL + '/repertoires/' + id)
      .pipe(
        map((repertoire: Play) => repertoire),
        catchError(err => throwError(err))
      )
  }

  addRepertoire(repertoire) : Observable<Repertoire>{
    return this.httpClient.post<Repertoire>(this.API_URL + '/repertoires', repertoire)
      .pipe(
        map((repertoire:Repertoire) => repertoire),
        catchError(err => throwError(err))
      )
    }

  editRepertoire(id, repertoire) : Observable<Play>{
    return this.httpClient.put<Play>(this.API_URL + '/repertoires/' + id, repertoire)
      .pipe(
        map((repertoire: Play) => repertoire),
        catchError(err => throwError(err))
      )
  }

  deleteRepertoire(id: number) {
    return this.httpClient.delete<any>(this.API_URL + '/repertoires/' + id)
      .subscribe()
  }
}
