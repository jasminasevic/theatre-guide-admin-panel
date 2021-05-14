import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL, TOKEN_KEY } from '../app.constants';
import { Credentials } from './credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly API_URL = API_URL;
  private readonly TOKEN_KEY = TOKEN_KEY;

constructor(private httpClient: HttpClient,
  private router: Router) { }

  loginUser(credentials: Credentials) : Observable<Credentials>{
    return this.httpClient.post<Credentials>(this.API_URL + '/token', credentials)
      .pipe(
        map((credentials: Credentials) => credentials),
        catchError(err => throwError(err))
      )
  }

  logOut(){
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/authentication/signin']);
  }

}
