import { Component, IterableDiffers } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../all-users/users.service';
import { NotificationService } from '../../shared/services/notification.service';
import { RolesService } from 'src/app/roles/all-roles/roles.service';
import { TheatreService } from 'src/app/theatres/all-theatres/theatres.service';
import { User } from '../all-users/users.model';
import { PendingUsersNumberService } from 'src/app/shared/services/pendingUsersNumber.service';
import { UserDetails } from '../all-users/userDetails.model';

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
  pendingUserRequests: number; 
  users: number;
  selectedRole: any;

  formdata: UserDetails = {
    id: 0,
    firstName: '',
    lastName: '',
    roleId: null,
    password: '',
    email: '',
    theatreId: null,
    status: 0,
    theatreName: ''
  };

  userData: UserDetails = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleId: 0,
    theatreId: null,
    theatreName: '',
    status: 0
  };
  
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
          this.initialStatus = user.status;
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

  //Getter methods to access formControls
  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
  get roleId() { return this.userForm.get('roleId'); }
  get theatreId() { return this.userForm.get('theatreId'); }
  get status() { return this.userForm.get('status'); }

  namePattern = "^[A-Z][a-zA-Z ]+$";

  createUserForm(): FormGroup {
    return this.fb.group({
      firstName: [this.formdata.firstName, [Validators.required, Validators.pattern(this.namePattern)]],
      lastName: [this.formdata.lastName, [Validators.required, Validators.pattern(this.namePattern)]],
      roleId: [this.formdata.roleId, Validators.required],
      password: [this.formdata.password, Validators.minLength(6)],
      theatreId: [this.formdata.theatreId],
      status: [this.formdata.status, Validators.required],
      email: [this.formdata.email, [Validators.required, Validators.email]]
    });
  }

  roleChanged(value){
    this.selectedRole = value;
  }

  onSubmit() {

    this.mapValuesToUserModel();
    console.log(this.userData);

    this.usersService.editUser(this.userDetail.id, this.userData)
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

  cancel(){
    this.router.navigate(['/users/all-users']);
  }

  mapValuesToUserModel(){
    this.userData.id = this.userDetail.id;
    this.userData.firstName = this.userForm.value.firstName;
    this.userData.lastName = this.userForm.value.lastName;
    this.userData.email = this.userForm.value.email;
    if(this.userForm.value.password != ''){
      this.userData.password = this.userForm.value.password;
    }
    this.userData.roleId = this.userForm.value.roleId;
    if(this.userData.roleId == 2){
      this.userData.theatreId = this.userForm.value.theatreId
    }
    this.userData.status = this.userForm.value.status;
  }

}

