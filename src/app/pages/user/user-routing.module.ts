import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { UserListComponent } from './user-list/user-list.component'
import { UserFormComponent } from './user-form/user-form.component'

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    pathMatch: 'full'
  },
  {
    path: 'formulario',
    component: UserFormComponent
  },
  {
    path: 'formulario/:id',
    component: UserFormComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}

export const routedComponents = [UserListComponent, UserFormComponent]
