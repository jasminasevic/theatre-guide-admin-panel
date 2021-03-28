import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from '../all-users/users.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { RolesService } from 'src/app/roles/all-roles/roles.service';
import { TheatreService } from 'src/app/theatres/all-theatres/theatres.service';
import { TheatreBasic } from 'src/app/theatres/all-theatres/theatreBasic.model';
import { PendingUsersNumberService } from 'src/app/shared/services/pendingUsersNumber.service';

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
      theatreId: ['', Validators.required],
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
    this.userService.addUser(this.userForm.value)
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

}

