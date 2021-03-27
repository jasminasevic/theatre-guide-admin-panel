import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UserService } from '../../users.service';
import { PendingUsersNumberService } from 'src/app/shared/services/pendingUsersNumber.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})

export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService
  ) { }

  users: number;

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete() {
    this.userService.deleteUser(this.data.id);
  }
}
