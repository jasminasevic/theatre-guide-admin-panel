export class Role {
  Id: Number;
  RoleName: String;

  constructor(role){
    this.Id = role.Id;
    this.RoleName = role.RoleName || '';
  }
}
