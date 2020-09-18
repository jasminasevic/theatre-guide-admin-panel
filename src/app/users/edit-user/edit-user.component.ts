import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../all-users/users.model';
import { UserService } from '../all-users/users.service';
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
    private usersService: UserService) {
      this.userForm = this.createContactForm();
  }

  ngOnInit(){
       let userId = this.activatedRoute.snapshot.params.id;
       this.usersService.getOneUser(userId)
       .subscribe(user =>
        {
          this.userDetail = user;
          console.log(this.userDetail);
          this.userForm.patchValue({
            firstName: this.userDetail.firstName,
            lastName: this.userDetail.lastName,
            email: this.userDetail.email,
            roleId: this.userDetail.roleId,
            });
        });
  }

  onSubmit() {
    console.log('Form Value', this.userForm.value);
  }
  createContactForm(): FormGroup {
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
}

