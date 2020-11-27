import { IActorShow } from '../../shared/interfaces/IActorShow';

export class Show {
  Id: number;
  Title: String;
  Category: String;
  CategoryId: number;
  Description: String;
  Theatre: String;
  TheatreId: number;
  Scene: String;
  SceneId: number;
  DirectorId: number;
  Duration: number;
  PremiereDate: Date;
  Writer: String;
  ShowImg: File;
  ActorShowDtos: IActorShow;

  constructor(show){
    this.Id = show.Id;
    this.Title = show.Title || '';
    this.Category = show.Category || '';
    this.CategoryId = show.CategoryId || '';
    this.Description = show.Description || '';
    this.Theatre = show.Theatre || '';
    this.TheatreId = show.TheatreId || '';
    this.Scene = show.Scene || '';
    this.SceneId = show.SceneId || '';
    this.DirectorId = show.DirectorId || '';
    this.Duration = show.Duration || '';
    this.PremiereDate = show.PremiereDate || '';
    this.Writer = show.Writer || '';
    this.ShowImg = show.showImg || '';
    this.ActorShowDtos = show.ActorShowsDto || '';
  }
}


export class ShowBaseInfo {
  Id: number;
  Title: String;
  Theatre: String;
  TheatreId: number;
  Scene: String;
  SceneId: number;

  constructor(show){
    this.Id = show.Id;
    this.Title = show.Title || '';
    this.Theatre = show.Theatre || '';
    this.TheatreId = show.TheatreId || '';
    this.Scene = show.Scene || '';
    this.SceneId = show.SceneId || '';
  }
}
