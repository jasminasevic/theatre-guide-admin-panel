import { IPrice } from '../../shared/interfaces/IPrice';

export class Repertoire {
  Id: number;
  ShowId: number;
  Date: Date;
  AddPriceDtos: IPrice[]
}
