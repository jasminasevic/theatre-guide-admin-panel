import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from '../all-users/users.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { RolesService } from 'src/app/roles/all-roles/roles.service';
import { TheatreService } from 'src/app/theatres/all-theatres/theatres.service';
import { TheatreBasic } from 'src/app/theatres/all-theatres/theatreBasic.model';
import { PendingUsersNumberService } from 'src/app/shared/services/pendingUsersNumber.service';
import { UserDetails } from '../all-users/userDetails.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})

export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  roleListing: any = [];
  selectedRole: any;
  theatreListing: TheatreBasic[];
  pendingUserRequests: number; 
  users: number;
  userDetails: UserDetails = {
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

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private roleService: RolesService,
    private theatreService: TheatreService,
    private pendingUsersNumberService: PendingUsersNumberService) {
      this.pendingUsersNumberService.currentPendingUserStatus$
      .subscribe(pendingRequests => {
        this.pendingUserRequests = pendingRequests
      })
    }

  namePattern = "^[A-Z][a-zA-Z ]+$";

  ngOnInit(){
    this.roleService.getRoleList()
      .subscribe(data => {
        this.roleListing = data
      });

    this.theatreService.getTheatreList()
      .subscribe(theatres =>{
        this.theatreListing = theatres
      });


    this.userForm = this.fb.group({
      id: 0,
      firstName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      lastName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roleId: ['', Validators.required],
      theatreId: [''],
      status: ['', Validators.required]
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
  

  roleChanged(value){
    this.selectedRole = value;
  }

  resetForm(){
    this.userForm.reset();
  }

  cancel(){
    this.router.navigate(['/users/all-users']);
  }

  onSubmit() {

    this.mapValuesToUserModel();
    console.log('mapirane vrednosti su ', this.userDetails);

    this.userService.addUser(this.userDetails)
    .subscribe(() => {
      this.notificationService.showNotification(
               'snackbar-success',
               'Record Added Successfully!',
               'bottom',
               'center'
             ),
      this.userService.getUsersFilteredByStatus()
        .subscribe(data => {
          this.users = data,
          this.pendingUsersNumberService.changePendingStatus(this.users)
        });
      this.router.navigateByUrl('/SampleComponent', { skipLocationChange: true });
      this.router.navigate(['/users/all-users']);
    });
  }

  mapValuesToUserModel(){
    this.userDetails.firstName = this.userForm.value.firstName;
    this.userDetails.lastName = this.userForm.value.lastName;
    this.userDetails.email = this.userForm.value.email;
    this.userDetails.password = this.userForm.value.password;
    this.userDetails.roleId = this.userForm.value.roleId;
    if(this.userDetails.roleId == 2){
      this.userDetails.theatreId = this.userForm.value.theatreId
    }
    this.userDetails.status = this.userForm.value.status;
  }

}

