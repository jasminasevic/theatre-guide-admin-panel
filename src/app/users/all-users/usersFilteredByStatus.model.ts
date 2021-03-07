export class UserFilteredByStatus {
    id: number;
    firstName: string;
    lastName: string;
    totalNumber: number;

    constructor(user) {
        {
          this.id = user.id;
          this.firstName = user.firstName || '';
          this.lastName = user.lastName || '';
          this.totalNumber = user.totalNumber || '';
        }
    }
}