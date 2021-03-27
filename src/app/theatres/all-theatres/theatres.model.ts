import { IImage } from "../../shared/interfaces/IImage";

export class Theatre {
  id: number;
  name: string;
  description: string;
  email: string;
  workingHours: string;
  telephone: string;
  location: string;
  isTheatreVisible: boolean;
  theatreImage: IImage[];

  constructor(theatre){
    this.id = theatre.id;
    this.name = theatre.name || '';
    this.description = theatre.description || '';
    this.workingHours = theatre.workingHours || '';
    this.telephone = theatre.telephone || '';
    this.location = theatre.location || '';
    this.isTheatreVisible = theatre.isTheatreVisible || ''; 
    this.theatreImage = theatre.theatreImage || '';
  }
}

