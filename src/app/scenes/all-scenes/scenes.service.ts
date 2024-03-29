import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ISceneData } from '../../shared/interfaces/ISceneData';
import { API_URL } from '../../app.constants';
import { catchError, map } from 'rxjs/operators';
import { Scene } from './scenes.model';
import { SceneWithShows } from './scenesWithShows.model';

@Injectable({
  providedIn: 'root'
})
export class ScenesService {

  private readonly API_URL = API_URL;
  constructor(private httpClient: HttpClient) { }

  getAllScenes(perPage: number, pageNumber: number, sortOrder: String, searchQuery: String)
    : Observable<ISceneData>{

    let params = new HttpParams();
    params = params.append('perPage', String(perPage));
    params = params.append('pageNumber', String(pageNumber));
    params = params.append('sortOrder', String(sortOrder));
    params = params.append('searchQuery', String(searchQuery));

    return this.httpClient.get<ISceneData>(this.API_URL + '/scenes', { params })
      .pipe(
        map((scene: ISceneData) => scene),
        catchError(err => throwError(err))
      )
  }

  getScenesInTheatre(theatreId: number) : Observable<Scene[]>{
    let params = new HttpParams();
    params = params.append('theatreId', String(theatreId));

    return this.httpClient.get<Scene[]>(this.API_URL + '/scenes', { params })
      .pipe(
        map((scene: Scene[]) => scene),
        catchError(err => throwError(err))
      )
  }

  getScene(id: number) : Observable<Scene>{
    return this.httpClient.get<Scene>(this.API_URL + '/scenes/' + id)
      .pipe(
        map((scene: Scene) => scene),
        catchError(err => throwError(err))
      )
  }

  getSceneWithShows(id: number) : Observable<SceneWithShows>{
    let params = new HttpParams();
    params = params.append('type', 'sceneWithShows');

    return this.httpClient.get<SceneWithShows>(this.API_URL + '/scenes/' + id, { params })
      .pipe(
        map((sceneWithShows: SceneWithShows) => sceneWithShows),
        catchError(err => throwError(err))
      )
  }

  addScene(scene) : Observable<Scene>{
    return this.httpClient.post<Scene>(this.API_URL + '/scenes', scene)
      .pipe(
        map((scene: Scene) => scene),
        catchError(err => throwError(err))
      )
  }

  editScene(id:number, scene: Scene) : Observable<Scene>{
    return this.httpClient.put<Scene>(this.API_URL + '/scenes/' + id, scene)
      .pipe(
        map((scene: Scene) => scene),
        catchError(err => throwError(err))
      )
  }

  deleteScene(id: number) {
    return this.httpClient.delete<any>(this.API_URL + '/scenes/' + id)
      .subscribe();
  }

}
