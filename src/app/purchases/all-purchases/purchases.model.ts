export class Purchase {
  id: number;
  repertoireId: number;
  userId: number;
  userFirstName: String;
  userLastName: String;
  showId: number;
  title: String;
  date: Date;

  constructor(purchase){
    this.id = purchase.id,
    this.repertoireId = purchase.repertoireId,
    this.userId = purchase.userId,
    this.userFirstName = purchase.userFirstName,
    this.userLastName = purchase.userLastName,
    this.showId = purchase.showId,
    this.title = purchase.title,
    this.date = purchase.date
  }
}
