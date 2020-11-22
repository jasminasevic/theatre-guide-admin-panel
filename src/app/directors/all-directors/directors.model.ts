export class Director {
  Id: number;
  DirectorFirstName: string;
  DirectorLastName: string;
  DirectorBiography: string;

  constructor(director){
    this.Id = director.Id;
    this.DirectorFirstName = director.DirectorFirstName || '';
    this.DirectorLastName = director.DirectorLastName || '';
    this.DirectorBiography = director.DirectorBiography || '';
  }
}

export class DirectorBasic {
  Id: number;
  DirectorFirstName: string;
  DirectorLastName: string;

  constructor(director){
    this.Id = director.Id;
    this.DirectorFirstName = director.DirectorFirstName || '';
    this.DirectorLastName = director.DirectorLastName || '';
  }
}
