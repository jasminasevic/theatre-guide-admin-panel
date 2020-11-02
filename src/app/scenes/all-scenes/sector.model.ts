export class Sector {
  Id: Number;
  SectorName: String;
  RowsTotalNumber: Number;
  SeatCapacity: Number;

  constructor(sector){
    this.Id = sector.Id;
    this.SectorName = sector.SectorName;
    this.RowsTotalNumber = sector.RowsTotalNumber;
    this.SeatCapacity = sector.SeatCapacity;
  }
}
