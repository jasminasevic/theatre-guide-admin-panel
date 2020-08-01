import { formatDate } from '@angular/common';
export class User {
  Id: number;
  // img: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  RoleId: number;
  constructor(user) {
    {
      this.Id = 0;
      //this.Id = user.Id || this.getRandomID();
      // this.img = user.avatar || 'assets/images/user/user1.jpg';
      this.FirstName = user.FirstName || '';
      this.LastName = user.LastName || '';
      this.Email = user.Email || '';
      this.Password = user.Password || '';
      this.RoleId = user.RoleId || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
