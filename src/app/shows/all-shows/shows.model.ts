export class Show {
  Id: number;
  Title: String;
  Category: String;
  Theatre: String;
  Scene: String;

  constructor(show){
    this.Id = show.Id;
    this.Title = show.Title || '';
    this.Category = show.Category || '';
    this.Theatre = show.Theatre || '';
  }
}
