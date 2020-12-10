export class DirectorBasic {
  id: number;
  directorFirstName: string;
  directorLastName: string;

  constructor(director){
    this.id = director.Id;
    this.directorFirstName = director.directorFirstName || '';
    this.directorLastName = director.directorLastName || '';
  }
}
