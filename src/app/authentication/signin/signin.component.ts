import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { JwtPayload } from 'jwt-decode';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;

  invalidLogin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.loginForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;

    const credentials = {
      'username' : this.f.username.value,
      'password' : this.f.password.value
    }

    this.authenticationService.loginUser(credentials)
      .subscribe(response => {
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);

        const decodedToken = jwtDecode<JwtPayload>(token);
        let roleId = decodedToken['RoleId'];

        if(roleId == 1){
          this.invalidLogin = false;
          this.router.navigate(['/dashboard/main']);
        }

        this.invalidLogin = true;
        return;
      }, err => {
        this.invalidLogin = true;
      });

    // stop here if form is invalid
    if (this.invalidLogin == true) {
      return;
    } 
  }
}
