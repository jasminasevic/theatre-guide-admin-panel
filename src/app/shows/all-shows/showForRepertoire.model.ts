import { ISector } from '../../shared/interfaces/ISector';

export class ShowForRepertoire {
  id: number;
  title: String;
  theatreName: String;
  theatreId: number;
  sceneName: String;
  sceneId: number;
  isPremiere: boolean;
  getSectorDtos: ISector;

  constructor(show){
    this.id = show.id;
    this.title = show.title || '';
    this.theatreName = show.theatreName || '';
    this.theatreId = show.theatreId || '';
    this.sceneName = show.scene || '';
    this.sceneId = show.sceneId || '';
    this.isPremiere = show.isPremiere || '';
    this.getSectorDtos = show.getSectorDtos || '';
  }
}
