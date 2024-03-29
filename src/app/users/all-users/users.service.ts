import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { User } from './users.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { API_URL, httpOptions } from '../../app.constants';
import { IUserData } from '../../shared/interfaces/IUserData';
import { UserFilteredByStatus } from '../../users/all-users/usersFilteredByStatus.model';
import { UserDetails } from './userDetails.model';


@Injectable()
export class UserService {
  private readonly API_URL = API_URL;

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private httpClient: HttpClient) { }

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

  getUsersFilteredByStatus() : Observable<number> {
    
    let params = new HttpParams();
    params = params.append('type', 'usersFilteredByStatus');
    params = params.append('status', 'Pending');

    return this.httpClient.get<number>(this.API_URL + '/users', { params })
    .pipe(
      map((userData: number) => userData),
      catchError(err => throwError(err)),
    )
  }

  getOneUser(user: number) : Observable<User> {
    return this.httpClient.get<User>(this.API_URL + '/users/' + user)
    .pipe(
      map((userData: User) => userData),
      catchError(err => throwError(err)),
    )
  }

  addUser(user: UserDetails): Observable<UserDetails> {
    return this.httpClient.post(this.API_URL + "/users", user, httpOptions)
    .pipe(
      map((user: UserDetails) => user),
      catchError(err => throwError(err)));
  }

  editUser(id: number, user : UserDetails) {
    return this.httpClient.put<UserDetails>(this.API_URL + "/users/" + id, user)
    .pipe(
      map((user: UserDetails) => user),
      catchError(err => throwError(err)));
  }

  deleteUser(id: number) {
    return this.httpClient.delete<any>(this.API_URL + "/users/" + id )
    .subscribe();
  }

}
