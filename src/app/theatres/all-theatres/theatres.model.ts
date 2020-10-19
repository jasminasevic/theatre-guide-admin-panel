import { IImage } from "../../shared/interfaces/IImage";

export class Theatre {
  Id: number;
  Name: string;
  Description: string;
  Email: string;
  WorkingHours: string;
  Telephone: string;
  Location: string;
  TheatreImage: IImage[];

  constructor(theatre){
    this.Id = theatre.Id;
    this.Name = theatre.Name || '';
    this.Description = theatre.Description || '';
    this.WorkingHours = theatre.WorkingHours || '';
    this.Telephone = theatre.Telephone || '';
    this.Location = theatre.Location || '';
    this.TheatreImage = theatre.TheatreImage || '';
  }
}
