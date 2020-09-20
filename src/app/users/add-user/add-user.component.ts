import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from '../all-users/users.service';
import { MatDatetimePickerInputEvent } from '@angular-material-components/datetime-picker';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})

export class AddUserComponent {
  // @Output() userAdded = new EventEmitter();
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) {
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

  resetForm(userForm?: NgForm){
      this.userForm.reset();
    }

  onSubmit() {
    this.userService.addUser(this.userForm.value)
    .subscribe(() => {
      this.showNotification(
               'snackbar-success',
               'Record Added Successfully!',
               'bottom',
               'center'
             );
    this.router.navigateByUrl('/SampleComponent', { skipLocationChange: true });
    this.router.navigate(['/users/all-users']);
    });

  }


  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }

}

