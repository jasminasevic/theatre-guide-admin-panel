export class TheatreBasic{
  Id: number;
  TheatreName: String;

  constructor(theatre){
    this.Id = theatre.Id;
    this.TheatreName = theatre.Name || '';
  }
}
