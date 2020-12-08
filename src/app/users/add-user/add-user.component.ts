import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from '../all-users/users.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { RolesService } from 'src/app/roles/all-roles/roles.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})

export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  roleListing: any = [];

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private roleService: RolesService) {}

  ngOnInit(){
    this.roleService.getRoleList()
      .subscribe(data => {
        this.roleListing = data
      })

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

