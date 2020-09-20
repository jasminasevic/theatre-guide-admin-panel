import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UserService } from '../../users.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { User } from '../../users.model';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  userForm: FormGroup;
  user: User;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.user.name;
      this.user = data.staff;
    } else {
      this.dialogTitle = 'New User';
      this.user = new User({});
    }
    this.userForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.user.Id],
      // img: [this.user.img],
      name: [this.user.FirstName],
      email: [
        this.user.Email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      lastName: [this.user.LastName],
      pasword: [this.user.Password],
    });
  }
  submit() {
    // emppty user
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.userService.addUser(this.userForm.getRawValue());
  }
}
