import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Theatre } from './theatres.model';
import { ITheatreData } from '../../shared/interfaces/ITheatreData';
import { API_URL, httpOptions } from '../../app.constants';
import { TheatreBasic } from '../../theatres/all-theatres/theatreBasic.model';

@Injectable({
  providedIn: 'root'
})

export class TheatreService {

  private readonly API_URL = API_URL;
  private readonly httpOptions = httpOptions;

  dataChange: BehaviorSubject<Theatre[]> = new BehaviorSubject<Theatre[]>([]);

  constructor(private httpClient: HttpClient) { }

  /** CRUD METHODS */

  getAllTheatres(perPage: number, pageNumber: number, sortOrder: string, searchQuery: string) : Observable<ITheatreData> {
    let params = new HttpParams();

    params = params.append('perPage', String(perPage));
    params = params.append('pageNumber', String(pageNumber));
    params = params.append('sortOrder', String(sortOrder));
    params = params.append('searchQuery', String(searchQuery));

    return this.httpClient.get<ITheatreData>(this.API_URL + '/theatres', { params })
      .pipe(
        map((theatreData: ITheatreData) => theatreData),
        catchError(err => throwError(err))
      )
  }

  getTheatreList(): Observable<TheatreBasic>{
    return this.httpClient.get<TheatreBasic>(this.API_URL + '/theatres')
      .pipe(
        map((theatreList: TheatreBasic) => theatreList),
        catchError(err => throwError(err))
      )
  }

  addTheatre(theatre) : any {
    return this.httpClient.post(this.API_URL + "/theatres", theatre)
      .pipe(
        map((theatre: Theatre) => theatre),
        catchError(err => throwError(err))
      );
  }

  getTheatre(id: number) : Observable<Theatre> {
    return this.httpClient.get<Theatre>(this.API_URL + '/theatres/' + id, httpOptions)
      .pipe(
        map((theatre : Theatre) => theatre),
        catchError(err => throwError(err))
      );
    }

  deleteTheatre(id: number) {
    return this.httpClient.delete<any>(this.API_URL + '/theatres/' + id)
    .subscribe();
  }

  editTheatre(id: number, theatre) : Observable<Theatre>{
    return this.httpClient.put<any>(this.API_URL + '/theatres/' + id, theatre)
      .pipe(
        map((theatre: Theatre) => theatre),
        catchError(err => throwError(err))
      )
  }

}
