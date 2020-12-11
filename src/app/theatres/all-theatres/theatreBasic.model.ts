export class TheatreBasic{
  id: number;
  theatreName: String;

  constructor(theatre){
    this.id = theatre.id;
    this.theatreName = theatre.name || '';
  }
}
