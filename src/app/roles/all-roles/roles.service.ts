import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../app.constants';
import { IRoleData } from '../../shared/interfaces/IRoleData';

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

    return this.httpClient.get(this.API_URL + '/roles', { params })
      .pipe(
        map((role: IRoleData) => role),
        catchError(err => throwError(err))
      )
  }

}
