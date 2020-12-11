import { ISector } from '../../shared/interfaces/ISector';

export class SceneWithSectors {
  id: number;
  sceneName: String;
  addSectorDtos: ISector[];

  constructor(scene){
    this.id = scene.id;
    this.sceneName = scene.sceneName || '';
    this.addSectorDtos = scene.sectorRows || '';
  }
}
