import { ISectorBaseInfo } from 'src/app/shared/interfaces/ISectorBaseInfo';
import { ShowForScene } from '../../shows/all-shows/showForScene.model';

export class SceneWithShows {
  id: number;
  sceneName: String;
  getSectorDtos: ISectorBaseInfo[];
  showBaseInfoDtos: ShowForScene[];

  constructor(scene){
    this.id = scene.id;
    this.sceneName = scene.sceneName || '';
    this.getSectorDtos = scene.getSectorDtos || '';
    this.showBaseInfoDtos = scene.showForScene || '';
  }
}
