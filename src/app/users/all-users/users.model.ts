// import { formatDate } from '@angular/common';
export class User {
  Id: number;
  // img: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  RoleId: number;
  RoleName: string;
  constructor(user) {
    {
      this.Id = user.Id;
      //this.Id = user.Id || this.getRandomID();
      // this.img = user.avatar || 'assets/images/user/user1.jpg';
      this.FirstName = user.FirstName || '';
      this.LastName = user.LastName || '';
      this.Email = user.Email || '';
      this.Password = user.Password || '';
      this.RoleId = user.RoleId || '';
      this.RoleName = user.RoleName || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
