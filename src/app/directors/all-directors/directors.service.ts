import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from 'src/app/app.constants';
import { IDirectorData } from '../../shared/interfaces/IDirectorData';
import { Director } from './directors.model';
import { DirectorBasic } from './directorBasic.model';

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

  getDirector(directorId) : Observable<Director>{
    return this.httpClient.get<Director>(this.API_URL + '/directors/' + directorId)
      .pipe(
        map((director: Director) => director),
        catchError(err => throwError(err))
      )
  }

  getDirectorList() : Observable<DirectorBasic[]>{
    return this.httpClient.get<DirectorBasic[]>(this.API_URL + '/directors/')
      .pipe(
        map((directors: DirectorBasic[]) => directors),
        catchError(err => throwError(err))
      )
  }

  addDirector(director) : Observable<Director>{
    return this.httpClient.post<Director>(this.API_URL + '/directors/', director)
      .pipe(
        map((director: Director) => director),
        catchError(err => throwError(err))
      )
  }

  editDirector(directorId, director) : Observable<Director>{
    return this.httpClient.put<Director>(this.API_URL + '/directors/' + directorId, director)
      .pipe(
        map((director: Director) => director),
        catchError(err => throwError(err))
      )
  }

  deleteDirector(directorId) : void{
    this.httpClient.delete(this.API_URL + '/directors/' + directorId)
      .subscribe();
  }


}
