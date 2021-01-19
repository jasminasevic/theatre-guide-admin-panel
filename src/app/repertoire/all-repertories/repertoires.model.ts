import { IPrice } from '../../shared/interfaces/IPrice';

export class Repertoire {
  id: number;
  showId: number;
  theatreId: number;
  showDate: Date;
  addPriceDtos: IPrice[]

  constructor(repertoire){
    this.id = repertoire.id;
    this.showId = repertoire.showId || '';
    this.theatreId = repertoire.theatreId || '';
    this.showDate = repertoire.showDate || '';
    this.addPriceDtos = repertoire.addPriceDtos || '';
  }
}
