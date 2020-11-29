import { IPrice } from '../../shared/interfaces/IPrice';

export class Repertoire {
  id: number;
  showId: number;
  showDate: Date;
  addPriceDtos: IPrice[]

  constructor(repertoire){
    this.id = repertoire.id;
    this.showId = repertoire.showId || '';
    this.showDate = repertoire.showDate || '';
    this.addPriceDtos = repertoire.addPriceDtos || '';
  }
}
