import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../app.constants';
import { IRoleData } from '../../shared/interfaces/IRoleData';
import { Role } from './roles.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private readonly API_URL = API_URL;

  constructor(private httpClient: HttpClient) { }

  getAllRoles(perPage: number, pageNumber: number, sortOrder: String, searchQuery: String)
    : Observable<IRoleData>{
    let params = new HttpParams;

    params = params.append('perPage', String(perPage));
    params = params.append('pageNumber', String(pageNumber));
    params = params.append('sortOrder', String(sortOrder));
    params = params.append('searchQuery', String(searchQuery));

    return this.httpClient.get<IRoleData>(this.API_URL + '/roles', { params })
      .pipe(
        map((role: IRoleData) => role),
        catchError(err => throwError(err))
      )
  }

  getRoleList() : Observable<Role[]>{
    return this.httpClient.get<Role[]>(this.API_URL + '/roles')
      .pipe(
        map((role: Role[]) => role ),
        catchError(err => throwError(err))
      )
  }

  addRole(role: Role) : Observable<Role>{
    return this.httpClient.post<Role>(this.API_URL + '/roles', role)
      .pipe(
        map((role: Role) => role ),
        catchError(err => throwError(err))
      )
  }

  editRole(id: number, role: Role) : Observable<Role>{
    return this.httpClient.put<Role>(this.API_URL + '/roles/' + id, role)
      .pipe(
        map((role: Role) => role),
        catchError(err => throwError(err))
      )
  }

  getRole(id: number) : Observable<Role>{
    return this.httpClient.get<Role>(this.API_URL + '/roles/' + id)
      .pipe(
        map((role: Role) => role),
        catchError(err => throwError(err))
      )
  }

  deleteRole(id: number) {
    return this.httpClient.delete<any>(this.API_URL + '/roles/' + id)
      .subscribe();
  }

}
