import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../all-roles/roles.model';
import { RolesService } from '../all-roles/roles.service';

@Component({
  selector: 'app-about-role',
  templateUrl: './about-role.component.html',
  styleUrls: ['./about-role.component.scss']
})
export class AboutRoleComponent implements OnInit {

  role: any;
  constructor(
    private roleService: RolesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    let roleId = this.activatedRoute.snapshot.params['id'];

    this.role = this.roleService.getRole(roleId)
      .subscribe(data => {
        this.role = data
      })
  }

}
