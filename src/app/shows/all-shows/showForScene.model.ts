export class ShowForScene {
  id: number;
  title: String;
  categoryName: String;

  constructor(show){
    this.id = show.id;
    this.title = show.title || '';
    this.categoryName = show.categoryName || '';
  }
}
