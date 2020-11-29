export class Play {
  id: number;
  title: String;
  theatre: String;
  date: Date;

  constructor(play){
    this.id = play.id;
    this.title = play.title || '';
    this.theatre = play.theatre || '';
    this.date = play.date || '';
  }

}
