export class Theatre {
  Id: number;
  Name: string;
  Description: string;
  Email: string;
  WorkingHours: string;
  Telephone: string;
  Location: string;

  constructor(theatre){
    this.Id = theatre.Id;
    this.Name = theatre.Name || '';
    this.Description = theatre.Description || '';
    this.WorkingHours = theatre.WorkingHours || '';
    this.Telephone = theatre.Telephone || '';
    this.Location = theatre.Location || '';
  }
}
