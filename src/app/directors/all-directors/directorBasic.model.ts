export class DirectorBasic {
  id: number;
  firstName: string;
  lastName: string;

  constructor(director){
    this.id = director.Id;
    this.firstName = director.firstName || '';
    this.lastName = director.lastName || '';
  }
}
