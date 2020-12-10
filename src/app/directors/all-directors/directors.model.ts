import { ShowForDirector } from '../../shows/all-shows/showForDirector.model';

export class Director {
  id: number;
  directorFirstName: string;
  directorLastName: string;
  directorBiography: string;
  showBaseInfoDtos: ShowForDirector[] | null;

  constructor(director){
    this.id = director.Id;
    this.directorFirstName = director.directorFirstName || '';
    this.directorLastName = director.directorLastName || '';
    this.directorBiography = director.directorBiography || '';
    this.showBaseInfoDtos = director.ShowForDirector || null;
  }
}
