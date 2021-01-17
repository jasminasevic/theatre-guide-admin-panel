import { IPricePerSector } from '../../shared/interfaces/IPricePerSector';

export class Play {
  id: number;
  title: String;
  theatreId: number;
  theatreName: String;
  date: Date;
  category: String;
  categoryId: number;
  sceneName: String;
  sceneId: number;
  premiereDate: Date;
  description: String;
  isPremiere: boolean;
  getPriceDtos: IPricePerSector[];

  constructor(play){
    this.id = play.id;
    this.title = play.title || '';
    this.theatreName = play.theatreName || '';
    this.theatreId = play.theatreId || '';
    this.date = play.date || '';
    this.category = play.category || '';
    this.categoryId = play.categoryId || '';
    this.sceneName = play.sceneName || '';
    this.sceneId = play.sceneId || '';
    this.premiereDate = play.premiereDate || '';
    this.description = play.description || '';
    this.isPremiere = play.isPremiere || '';
    this.getPriceDtos = play.getPriceDtos || '';
  }

}
