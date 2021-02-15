import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../app.constants';
import { Credentials } from './credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly API_URL = API_URL;

constructor(private httpClient: HttpClient) { }

  loginUser(credentials: Credentials) : Observable<Credentials>{
    return this.httpClient.post<Credentials>(this.API_URL + '/token', credentials)
      .pipe(
        map((credentials: Credentials) => credentials),
        catchError(err => throwError(err))
      )
  }

}
