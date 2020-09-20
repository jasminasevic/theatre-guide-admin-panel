import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, pipe, throwError, Observable } from 'rxjs';
import { User } from './users.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json; charset=utf-8;',
    'Accept':'*/*'
  })
};

export interface IUserData {
  data: User[],
  pageNumber: number,
  totalCount: number,
  pagesCount: number
}


@Injectable()
export class UserService {
  private readonly API_URL = "http://localhost:50484/api";

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  //addUserData: Subject<User> = new Subject<User>();
  //addUserData: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) { }

  get data(): User[] {
    console.log("data change is " + this.dataChange.value);
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  getAllUsers(perPage: number, pageNumber: number, sortOrder: string, searchQuery: string) : Observable<IUserData> {
    let params = new HttpParams();

    params = params.append('perPage', String(perPage));
    params = params.append('pageNumber', String(pageNumber));
    params = params.append('sortOrder', String(sortOrder));
    params = params.append('searchQuery', String(searchQuery));


    return this.httpClient.get<IUserData>(this.API_URL + '/users', { params })
    .pipe(
      map((userData: IUserData) => userData),
      catchError(err => throwError(err)),
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

  getOneUser(user) : Observable<User> {
    return this.httpClient.get<User>(this.API_URL + '/users/' + user)
    .pipe(
      map((userData: User) => userData),
      catchError(err => throwError(err)),
    )

  }

  // DEMO ONLY, you can find working methods below
  addUser(user: User): any {
    return this.httpClient.post(this.API_URL + "/users", user, httpOptions)
    .pipe(
      map((user: User) => user),
      catchError(err => throwError(err)));
  }

  updateUser(id: number, user : User) {
    // this.dialogData = user;
    return this.httpClient.put<User>(this.API_URL + "/users/" + id, user)
    .pipe(
      map((user: User) => user),
      catchError(err => throwError(err)));
  }

  deleteUser(id: number) {
    return this.httpClient.delete<any>(this.API_URL + "/users/" + id )
    .subscribe(data  => {
      console.log("ok");
    },
    error  => {
      console.log("Error", error);
    });
  }
}
