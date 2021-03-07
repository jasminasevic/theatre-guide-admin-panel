import { Component, IterableDiffers } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../all-users/users.service';
import { NotificationService } from '../../shared/services/notification.service';
import { RolesService } from 'src/app/roles/all-roles/roles.service';
import { TheatreService } from 'src/app/theatres/all-theatres/theatres.service';
import { User } from '../all-users/users.model';
import { PendingUsersNumberService } from 'src/app/shared/services/pendingUsersNumber.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})

export class EditUserComponent {
  userForm: FormGroup;
  userDetail: User;
  roleListing: any = [];
  theatreListing: any = [];
  initialStatus: any;

  formdata = {
    firstName: '',
    lastName: '',
    roleId: '',
    password: '',
    email: '',
    theatreId: '',
    status: ''
  };
  pendingUserRequests: number; 
  constructor(private fb: FormBuilder, private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UserService,
    private notificationService: NotificationService,
    private roleService: RolesService,
    private theatreService: TheatreService,
    private userService: UserService,
    private pendingUsersNumberService: PendingUsersNumberService) {
    this.userForm = this.createUserForm();
    this.pendingUsersNumberService.currentPendingUserStatus$
      .subscribe(pendingRequests => {
        this.pendingUserRequests = pendingRequests
      })
  }

  ngOnInit(){
      this.roleService.getRoleList()
        .subscribe(data => {
          this.roleListing = data
        })

      this.theatreService.getAllTheatreList()
        .subscribe(data => {
          this.theatreListing = data
        })

       let userId = this.activatedRoute.snapshot.params.id;
       this.usersService.getOneUser(userId)
       .subscribe(user =>
        {
          this.userDetail = user;
          console.log(this.userDetail);
          this.initialStatus = user.status;
          console.log(this.initialStatus);
          this.userForm.patchValue({
            firstName: this.userDetail.firstName,
            lastName: this.userDetail.lastName,
            email: this.userDetail.email,
            roleId: this.userDetail.roleId,
            theatreId: this.userDetail.theatreId, 
            password: this.userDetail.password,
            status: this.userDetail.status
            });
        });
  }

  users: number;

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
      if(this.userForm.status != this.initialStatus)
      {
        this.userService.getUsersFilteredByStatus()
        .subscribe(data => {
          this.users = data,
          this.pendingUsersNumberService.changePendingStatus(this.users)
        });
      }
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
      theatreId: [this.formdata.theatreId],
      status: [this.formdata.status],
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

