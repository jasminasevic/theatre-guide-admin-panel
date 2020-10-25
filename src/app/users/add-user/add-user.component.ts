import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from '../all-users/users.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})

export class AddUserComponent {
  userForm: FormGroup;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService) {
    this.userForm = this.fb.group({
      Id: 0,
      FirstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      LastName: [''],
      Email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      Password: ['', [Validators.required]],
      //ConfirmPassword: ['', [Validators.required]],
      RoleId: ['', Validators.required],
      // uploadImg: ['']
    });
  }

  resetForm(){
    this.userForm.reset();
  }

  cancel(){
    this.router.navigate(['/users/all-users']);
  }

  onSubmit() {
    this.userService.addUser(this.userForm.value)
    .subscribe(() => {
      this.notificationService.showNotification(
               'snackbar-success',
               'Record Added Successfully!',
               'bottom',
               'center'
             );
    this.router.navigateByUrl('/SampleComponent', { skipLocationChange: true });
    this.router.navigate(['/users/all-users']);
    });

  }


}

