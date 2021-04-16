import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupFormComponent } from './group/group-form/group-form.component';
import { SecurityComponent } from './security.component';
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
        component: UserFormComponent
      },
      {
        path: 'formulario/:id',
        component: UserFormComponent
      }
    ]
  },
  {
    path: 'grupos',
    children: [
      {
        path: 'formulario',
        component: GroupFormComponent
      },
      {
        path: 'formulario/:id',
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