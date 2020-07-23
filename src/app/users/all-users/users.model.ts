import { formatDate } from '@angular/common';
export class User {
  id: number;
  img: string;
  name: string;
  email: string;
  date: string;
  address: string;
  mobile: string;
  designation: string;
  constructor(user) {
    {
      this.id = user.id || this.getRandomID();
      this.img = user.avatar || 'assets/images/user/user1.jpg';
      this.name = user.name || '';
      this.designation = user.designation || '';
      this.email = user.email || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.address = user.address || '';
      this.mobile = user.mobile || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
