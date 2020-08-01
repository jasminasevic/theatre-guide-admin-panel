import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, pipe, throwError, Observable } from 'rxjs';
import { User } from './users.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type':  'application/json',
    // 'Accept': 'application/json'
    'Content-Type':'application/json; charset=utf-8;',
    'Accept':'*/*'
  })
};


@Injectable()
export class UserService {
  // private readonly API_URL = 'assets/data/users.json';
  private readonly API_URL = "http://localhost:50484/api";

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  //addUserData: Subject<User> = new Subject<User>();
  //addUserData: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) { }
  get data(): User[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllUsers(): void {
    this.httpClient.get<User[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
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



  // DEMO ONLY, you can find working methods below
  onSubmit(user: User): any {

    // const body = JSON.stringify(user);
    // console.log("Prosledjujem mu body " + body + httpOptions);
    // return this.httpClient.post<User>(this.API_URL + '/users', body, httpOptions)
    // .pipe(
    //   catchError(err => {
    //       console.log("Err name je staaa " + err);
    //     return this.handleError(new HttpErrorResponse({status:400}))
    //   })
    // );
    this.httpClient.post("http://localhost:50484/api/users", user, httpOptions)
      .subscribe(data  => {
        console.log("POST Request is successful ", data);
      },
      error  => {
        console.log("Error", error);
      });


    // .subscribe(
    //   data  => {
    //     this.addUserData.next(data);
    //   console.log("POST Request is successful ", data);
    //   },
    //   error  => {
    //   console.log("Error", error);
    //   }
    // );


    //  .pipe(
    //   catchError(this.handleError(new HttpErrorResponse({status:400})
    //   )))
    //   .subscribe(() => {
    //     console.log("ubicu se" + user);
    //     return user;
    //   });

      // data => {
      //   this.addUserData.next(data);
      //   console.log('ajd pls');
      // },
      // (error: HttpErrorResponse) => {
      //   console.log(error.name + ' ' + error.message);
      //   console.log("nista ne valja");


  // this.httpClient.post(this.API_URL + '/Users', user);
  }
  updateUser(user: User): void {
    this.dialogData = user;
  }
  deleteUser(id: number): void {
    console.log(id);
  }
}
