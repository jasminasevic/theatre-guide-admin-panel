import { ISectorBaseInfo } from '../../shared/interfaces/ISectorBaseInfo';

export class Scene {
  id: number;
  sceneName: String;
  theatreId: number;
  addSectorDtos: ISectorBaseInfo[];

  constructor(scene){
    this.id = scene.id;
    this.sceneName = scene.sceneName || '';
    this.theatreId = scene.theatreId || '';
    this.addSectorDtos = scene.sectorRows || '';
  }
}
