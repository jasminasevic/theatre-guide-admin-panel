import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { RolesService } from '../all-roles/roles.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent {

  roleForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private roleService: RolesService,
    private notificationService: NotificationService) {
      this.roleForm = this.fb.group({
       id: 0,
       roleName: ['',
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-zA-Z]{2,}([\\sa-zA-Z-]{1,})*$')
        ]
      ]})
    }

  onSubmit(){
    this.roleService.addRole(this.roleForm.value)
      .subscribe(() => {
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Added Successfully!',
          'bottom',
          'center'
        );
        this.router.navigate(['/roles/all-roles']);
      })
  }

  resetForm(){
    this.roleForm.reset();
  }

  cancel(){
    this.router.navigate(['/roles/all-roles']);
  }

}
