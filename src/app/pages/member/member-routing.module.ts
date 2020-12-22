import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { MemberListComponent } from './member-list/member-list.component'
import { MemberFormComponent } from './member-form/member-form.component'

const routes: Routes = [
  {
    path: '',
    component: MemberListComponent,
    pathMatch: 'full'
  },
  {
    path: 'formulario',
    component: MemberFormComponent
  },
  {
    path: 'formulario/:id',
    component: MemberFormComponent
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MemberRoutingModule {
}

export const routedComponents = [ MemberListComponent, MemberFormComponent ]
