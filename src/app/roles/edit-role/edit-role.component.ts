import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { RolesService } from '../all-roles/roles.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {

  roleForm: FormGroup;
  roleDetail: any;

  formData = {
    roleName: ''
  }

  constructor(private activatedRoute: ActivatedRoute,
    private roleService: RolesService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router) {
      this.roleForm = this.createRoleForm();
    }

  createRoleForm() : FormGroup {
    return this.fb.group({
      roleName: [
        this.formData.roleName,
          [
            Validators.required,
            Validators.pattern('^[A-Z][a-zA-Z0-9]{2,}([\\sa-zA-Z0-9-]{1,})*$')
          ]
      ],
    });
  }

  ngOnInit() {
    let roleId = this.activatedRoute.snapshot.params['id'];

    this.roleService.getRole(roleId)
      .subscribe(role => {
        this.roleDetail = role;
        this.roleForm.patchValue({
          roleName: this.roleDetail.roleName
        })
      });
  }

  onSubmit(){
    this.roleService.editRole(this.roleDetail.id, this.roleForm.value)
      .subscribe(() =>{
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Edited Successfully!',
          'bottom',
          'center'
        ),
        this.router.navigate(['/roles/all-roles']);
      })
  }

  cancel(){
    this.router.navigate(['roles/all-roles']);
  }
}
