import { IPrice } from 'src/app/shared/interfaces/IPrice';

export class PurchaseWithDetails {
  id: number;
  userId: number;
  userName: String;
  categoryId: number;
  category: String;
  theatreId: number;
  theatreName: String;
  sceneId: number;
  sceneName: String;
  showId: number;
  showName: String;
  sectorId: number;
  sectorName: String;
  seatNumber: number;
  rowNumber: number;
  entrance: String;
  date: Date;
  getPriceBasicDtos: IPrice;
  purchasedAt: Date;

  constructor(purchase){
    this.id = purchase.id,
    this.userId = purchase.userId,
    this.userName = purchase.userName,
    this.theatreId = purchase.theatreId,
    this.theatreName = purchase.theatreName,
    this.sceneId = purchase.sceneId,
    this.sceneName = purchase.sceneName,
    this.showId = purchase.showId,
    this.showName = purchase.showName,
    this.date = purchase.date,
    this.categoryId = purchase.categoryId,
    this.category = purchase.category;
    this.sectorId = purchase.sectorId;
    this.sectorName = purchase.sectorName;
    this.seatNumber = purchase.seatNumber;
    this.rowNumber = purchase.rowNumber;
    this.entrance = purchase.entrance;
    this.date = purchase.date;
    this.getPriceBasicDtos = purchase.getPriceBasicDtos;
    this.purchasedAt = purchase.purchasedAt;
  }
}
