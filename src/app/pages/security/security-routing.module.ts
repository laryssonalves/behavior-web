import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupAddGuard } from './group/group-form/group-add.guard';
import { GroupEditGuard } from './group/group-form/group-edit.guard';

import { GroupFormComponent } from './group/group-form/group-form.component';
import { SecurityComponent } from './security.component';
import { UserAddGuard } from './user/user-form/user-add.guard';
import { UserEditGuard } from './user/user-form/user-edit.guard';
import { UserFormComponent } from './user/user-form/user-form.component'

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent
  },
  {
    path: 'usuarios',
    children: [
      {
        path: 'formulario',
        canActivate: [UserAddGuard],
        component: UserFormComponent
      },
      {
        path: 'formulario/:id',
        canActivate: [UserEditGuard],
        component: UserFormComponent
      }
    ]
  },
  {
    path: 'grupos',
    children: [
      {
        path: 'formulario',
        canActivate: [GroupAddGuard],
        component: GroupFormComponent
      },
      {
        path: 'formulario/:id',
        canActivate: [GroupEditGuard],
        component: GroupFormComponent
      }
    ]
  }
]


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SecurityRoutingModule { }

export const routedComponents = [SecurityComponent, UserFormComponent, GroupFormComponent]