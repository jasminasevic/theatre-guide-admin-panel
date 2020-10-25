import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../all-users/users.model';
import { UserService } from '../all-users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})

export class EditUserComponent {
  userForm: FormGroup;
  userDetail: any;

  formdata = {
    firstName: '',
    lastName: '',
    roleId: '',
    password: '',
    email: '',
  };

  constructor(private fb: FormBuilder, private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UserService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService) {
    this.userForm = this.createUserForm();
  }

  ngOnInit(){
       let userId = this.activatedRoute.snapshot.params.id;
       this.usersService.getOneUser(userId)
       .subscribe(user =>
        {
          this.userDetail = user;
          this.userForm.patchValue({
            firstName: this.userDetail.firstName,
            lastName: this.userDetail.lastName,
            email: this.userDetail.email,
            roleId: this.userDetail.roleId,
            password: this.userDetail.Password
            });
        });
  }

  onSubmit() {
    this.usersService.editUser(this.userDetail.id, this.userForm.value)
      .subscribe(() => {
         this.notificationService.showNotification(
                  'snackbar-success',
                  'Record Edited Successfully!',
                  'bottom',
                  'center'
                );
        this.router.navigate(['/users/all-users']);
        });
  }

  createUserForm(): FormGroup {
    return this.fb.group({
      firstName: [
        this.formdata.firstName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')]
      ],
      lastName: [this.formdata.lastName],
      roleId: [this.formdata.roleId, [Validators.required]],
      password: [this.formdata.password],
      email: [
        this.formdata.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ]
    });
  }

  cancel(){
    this.router.navigate(['/users/all-users']);
  }

}


