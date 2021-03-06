import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Theatre } from './theatres.model';
import { ITheatreData } from '../../shared/interfaces/ITheatreData';
import { API_URL, httpOptions } from '../../app.constants';
import { TheatreBasic } from './theatreBasic.model';
import { TheatreWithDetails } from './theatreWithDetails.model';

@Injectable({
  providedIn: 'root'
})

export class TheatreService {

  private readonly API_URL = API_URL;

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

  getTheatreList(): Observable<TheatreBasic[]>{

    let params = new HttpParams();
    params = params.append('type', 'getTheatresList');

    return this.httpClient.get<TheatreBasic[]>(this.API_URL + '/theatres', { params })
      .pipe(
        map((theatreList: TheatreBasic[]) => theatreList),
        catchError(err => throwError(err))
      )
  }

  getAllTheatreList(): Observable<TheatreBasic[]>{

    let params = new HttpParams();
    params = params.append('type', 'getAllTheatresList');

    return this.httpClient.get<TheatreBasic[]>(this.API_URL + '/theatres', { params })
      .pipe(
        map((theatreList: TheatreBasic[]) => theatreList),
        catchError(err => throwError(err))
      )
  }

  addTheatre(theatre) : Observable<Theatre> {
    return this.httpClient.post<Theatre>(this.API_URL + "/theatres", theatre)
      .pipe(
        map((theatre: Theatre) => theatre),
        catchError(err => throwError(err))
      );
  }

  getTheatre(id: number) : Observable<TheatreWithDetails> {
    return this.httpClient.get<TheatreWithDetails>(this.API_URL + '/theatres/' + id)
      .pipe(
        map((theatre : TheatreWithDetails) => theatre),
        catchError(err => throwError(err))
      );
    }

    editTheatre(id: number, theatre) : Observable<Theatre>{
      return this.httpClient.put<Theatre>(this.API_URL + '/theatres/' + id, theatre)
        .pipe(
          map((theatre: Theatre) => theatre),
          catchError(err => throwError(err))
        )
    }

  deleteTheatre(id: number) {
    return this.httpClient.delete<any>(this.API_URL + '/theatres/' + id)
    .subscribe();
  }

}
