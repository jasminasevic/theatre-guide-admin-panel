import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Theatre } from './theatres.model';
import { ITheatreData } from '../../shared/interfaces/ITheatreData';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Accept':'*/*',
    'Access-Control-Allow-Headers':'*',
    'X-Requested-With':'XMLHttpRequest'
  })
};


@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  private readonly API_URL = "http://localhost:50484/api";

  dataChange: BehaviorSubject<Theatre[]> = new BehaviorSubject<Theatre[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  get data(): Theatre[] {
    console.log("data change is " + this.dataChange.value);
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

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
