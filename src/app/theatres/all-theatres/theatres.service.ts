import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Theatre } from './theatres.model';
import { ITheatreData } from '../../shared/interfaces/ITheatreData';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json; charset=utf-8;',
    'Accept':'*/*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  private readonly API_URL = "http://localhost:50484/api";

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

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  addTheatre(theatre: Theatre) : any {
    return this.httpClient.post(this.API_URL + "/theatres", theatre, httpOptions)
      .pipe(
        map((theatre: Theatre) => theatre),
        catchError(err => throwError(err))
      );
  }

}
