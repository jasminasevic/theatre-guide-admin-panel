import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../app.constants';
import { IShowData } from '../../shared/interfaces/IShowData';
import { Show, ShowBaseInfo, ShowForRepertoire } from './shows.model';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  private readonly API_URL = API_URL;
  constructor(private httpClient: HttpClient) { }

  getAllShows(perPage: number, pageNumber: number, sortOrder: String, searchQuery: String)
    : Observable<IShowData>{

      let params = new HttpParams();

      params = params.append('perPage', String(perPage));
      params = params.append('pageNumber', String(pageNumber));
      params = params.append('sortOrder', String(sortOrder));
      params = params.append('searchQuery', String(searchQuery));

      return this.httpClient.get<IShowData>(this.API_URL + '/shows/', { params })
        .pipe(
          map((show: IShowData) => show),
          catchError(err => throwError(err))
        )
    }

  getShowList() : Observable<ShowBaseInfo>{
    return this.httpClient.get<ShowBaseInfo>(this.API_URL + '/shows/')
      .pipe(
        map((show: ShowBaseInfo) => show),
        catchError(err => throwError(err))
      )
  }

  getShowsForRepertoire(showId: number) : Observable<ShowForRepertoire>{

    let params = new HttpParams();
    params = params.append('type', 'repertoire');

    return this.httpClient.get<ShowForRepertoire>(this.API_URL + '/shows/' + showId, { params })
      .pipe(
        map((showForRepertoire: ShowForRepertoire) => showForRepertoire),
        catchError(err => throwError(err))
      )
  }

  getShow(showId: number) : Observable<Show>{

    let params = new HttpParams();
    params = params.append('type', 'allInfo');

    return this.httpClient.get<Show>(this.API_URL + '/shows/' + showId, { params })
      .pipe(
        map((show: Show) => show),
        catchError(err => throwError(err))
      )
  }

  addShow(show) : Observable<Show>{
    return this.httpClient.post<Show>(this.API_URL + '/shows', show)
      .pipe(
        map((show: Show) => show),
        catchError(err => throwError(err))
      )
  }

  editShow(id: number, show) : Observable<void>{
    return this.httpClient.put<void>(this.API_URL + '/shows/' + id, show)
      .pipe(
        map(show => show),
        catchError(err => throwError(err))
      )
  }

  deleteShow(id: number) {
    return this.httpClient.delete<any>(this.API_URL + '/shows/' + id)
      .subscribe();
  }

}
