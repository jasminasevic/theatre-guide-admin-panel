export class Purchase {
  id: number;
  userId: number;
  theatreName: String;
  showName: number;
  title: String;
  date: Date;
  currencyName: String;

  constructor(purchase){
    this.id = purchase.id,
    this.userId = purchase.userId,
    this.theatreName = purchase.theatreName,
    this.showName = purchase.showName,
    this.title = purchase.title,
    this.date = purchase.date,
    this.currencyName = purchase.currencyName
  }
}
