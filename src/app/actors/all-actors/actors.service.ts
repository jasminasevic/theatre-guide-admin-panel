import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from 'src/app/app.constants';
import { IActorData } from '../../shared/interfaces/IActorData';
import { Actor } from './actors.model';
import { ActorBasic } from './actorBasic.model';
import { ActorAllInfo } from './actorAllInfo.model';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  private readonly API_URL = API_URL;

  constructor(private httpClient: HttpClient) { }

  /** CRUD METHODS */

  getAllActors(perPage: number, pageNumber: number, sortOrder: string, searchQuery: string)
   : Observable<IActorData> {

    let params = new HttpParams;

    params = params.append('perPage', String(perPage));
    params = params.append('pageNumber', String(pageNumber));
    params = params.append('sortOrder', String(sortOrder));
    params = params.append('searchQuery', String(searchQuery));

    return this.httpClient.get<IActorData>(this.API_URL + '/actors/', { params })
      .pipe(
        map((actor: IActorData) => actor),
        catchError(err => throwError(err))
      )
  }

  getActor(id: number) : Observable<ActorAllInfo>{
    return this.httpClient.get<ActorAllInfo>(this.API_URL + '/actors/' + id)
      .pipe(
        map((actor: ActorAllInfo) => actor),
        catchError(err => throwError(err))
      )
  }

  getActorList() : Observable<ActorBasic[]>{
    return this.httpClient.get<ActorBasic[]>(this.API_URL + '/actors')
      .pipe(
        map((actors: ActorBasic[]) => actors),
        catchError(err => throwError(err))
      )
  }

  addActor(actor) : Observable<Actor>{
    return this.httpClient.post<Actor>(this.API_URL + '/actors', actor)
      .pipe(
        map((actor: Actor) => actor),
        catchError(err => throwError(err))
      )
  }

  editActor(id: number, actor) : Observable<Actor>{
    return this.httpClient.put<Actor>(this.API_URL + '/actors/' + id, actor)
      .pipe(
        map((actor: Actor) => actor),
        catchError(err => throwError(err))
      )
  }

  deleteActor(id: number) : void {
    this.httpClient.delete<any>(this.API_URL + '/actors/' + id)
      .subscribe();
  }


}
