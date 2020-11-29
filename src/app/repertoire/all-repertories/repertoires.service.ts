import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from 'src/app/app.constants';
import { Repertoire } from './repertoires.model';

@Injectable({
  providedIn: 'root'
})
export class RepertoiresService {

  constructor(private httpClient: HttpClient) { }

  private API_URL = API_URL;

  addRepertoire(repertoire) : Observable<Repertoire>{
    return this.httpClient.post<Repertoire>(this.API_URL + '/repertoires', repertoire)
      .pipe(
        map((repertoire:Repertoire) => repertoire),
        catchError(err => throwError(err))
        )}
}
