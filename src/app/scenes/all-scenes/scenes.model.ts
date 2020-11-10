import { ISector } from '../../shared/interfaces/ISector';

export class Scene {
  Id: number;
  SceneName: String;
  TheatreId: number;
  AddSectorDtos: ISector[];

  constructor(scene){
    this.Id = scene.Id;
    this.SceneName = scene.SceneName || '';
    this.TheatreId = scene.TheatreId || '';
    this.AddSectorDtos = scene.SectorRows || '';
  }
}
