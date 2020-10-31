import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRolesComponent } from '../roles/all-roles/all-roles.component';
import { AddRoleComponent } from '../roles/add-role/add-role.component';
import { EditRoleComponent } from '../roles/edit-role/edit-role.component';
import { AboutRoleComponent } from '../roles/about-role/about-role.component';

const routes: Routes = [
  {
    path: 'all-roles',
    component: AllRolesComponent
  },
  {
    path: 'add-role',
    component: AddRoleComponent
  },
  {
    path: 'edit-role/:id',
    component: EditRoleComponent
  },
  {
    path: 'adout-role/:id',
    component: AboutRoleComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }