import { PurchaseWithDetails } from 'src/app/purchases/all-purchases/purchaseWithDetails.model';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
  roleName: string;
  getDetailedPurchaseDtos: PurchaseWithDetails[] | null;
  showFollowing: number;

  constructor(user) {
    {
      this.id = user.id;
      this.firstName = user.firstName || '';
      this.lastName = user.lastName || '';
      this.email = user.email || '';
      this.password = user.password || '';
      this.roleId = user.roleId || '';
      this.roleName = user.roleName || '';
      this.getDetailedPurchaseDtos = user.purchaseWithDetails || '';
      this.showFollowing = user.showFollowing || '';
    }
  }

}
