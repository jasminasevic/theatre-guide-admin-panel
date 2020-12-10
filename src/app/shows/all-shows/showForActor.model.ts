export class ShowForActor {
  id: number;
  title: String;

  constructor(show){
    this.id = show.id;
    this.title = show.title || '';
  }
}
