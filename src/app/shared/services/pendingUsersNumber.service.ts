import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'src/app/users/all-users/users.service';

@Injectable({
  providedIn: 'root'
})
export class PendingUsersNumberService {

  pendingUsersNumber: number;

  pendingUsersNumberSource = new BehaviorSubject<number>(0);
  currentPendingUserStatus$ = this.pendingUsersNumberSource.asObservable();

  public changePendingStatus(pendingUsersNumber: number) : void {
    this.pendingUsersNumberSource.next(pendingUsersNumber);
  }

}
