export class Role {
  id: Number;
  roleName: String;

  constructor(role){
    this.id = role.id;
    this.roleName = role.roleName || '';
  }
}
