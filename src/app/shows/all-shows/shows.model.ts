import { ISector } from 'src/app/shared/interfaces/ISector';
import { IActorShow } from '../../shared/interfaces/IActorShow';

export class Show {
  id: number;
  title: String;
  category: String;
  categoryId: number;
  description: String;
  theatre: String;
  theatreId: number;
  scene: String;
  sceneId: number;
  directorId: number;
  duration: number;
  premiereDate: Date;
  writer: String;
  showImg: File;
  actorShowDtos: IActorShow;

  constructor(show){
    this.id = show.id;
    this.title = show.title || '';
    this.category = show.category || '';
    this.categoryId = show.categoryId || '';
    this.description = show.description || '';
    this.theatre = show.theatre || '';
    this.theatreId = show.theatreId || '';
    this.scene = show.scene || '';
    this.sceneId = show.sceneId || '';
    this.directorId = show.directorId || '';
    this.duration = show.duration || '';
    this.premiereDate = show.premiereDate || '';
    this.writer = show.writer || '';
    this.showImg = show.showImg || '';
    this.actorShowDtos = show.actorShowsDto || '';
  }
}


export class ShowBaseInfo {
  id: number;
  title: String;
  theatreName: String;
  theatreId: number;
  scene: String;
  sceneId: number;

  constructor(show){
    this.id = show.id;
    this.title = show.title || '';
    this.theatreName = show.theatreName || '';
    this.theatreId = show.theatreId || '';
    this.scene = show.scene || '';
    this.sceneId = show.sceneId || '';
  }
}

export class ShowForRepertoire {
  id: number;
  title: String;
  theatreName: String;
  theatreId: number;
  sceneName: String;
  sceneId: number;
  getSectorDtos: ISector;

  constructor(show){
    this.id = show.id;
    this.title = show.title || '';
    this.theatreName = show.theatreName || '';
    this.theatreId = show.theatreId || '';
    this.sceneName = show.scene || '';
    this.sceneId = show.sceneId || '';
    this.getSectorDtos = show.getSectorDtos || '';
  }
}
