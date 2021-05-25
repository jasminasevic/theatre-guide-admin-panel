export class UserDetails {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: number;
    status: Status;
    theatreId?: number;
    theatreName: string;
  
    constructor(user) {
      {
        this.id = user.id;
        this.firstName = user.firstName || '';
        this.lastName = user.lastName || '';
        this.email = user.email || '';
        this.password = user.password || '';
        this.roleId = user.roleId || '';
        this.theatreId = user.theatreId || '';
        this.theatreName = user.theatreName || '';
      }
    }
  }
  
  enum Status {
    Approved,
    Pending,
    Rejected
  }