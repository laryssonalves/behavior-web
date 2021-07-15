import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { MemberListComponent } from './member-list/member-list.component'
import { MemberFormComponent } from './member-form/member-form.component'
import { MemberAddGuard } from './member-form/member-add.guard'
import { MemberEditGuard } from './member-form/member-edit.guard'

const routes: Routes = [
  {
    path: '',
    component: MemberListComponent,
    pathMatch: 'full'
  },
  {
    path: 'formulario',
    component: MemberFormComponent,
    canActivate: [MemberAddGuard]
  },
  {
    path: 'formulario/:id',
    component: MemberFormComponent,
    canActivate: [MemberEditGuard]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MemberRoutingModule {
}

export const routedComponents = [ MemberListComponent, MemberFormComponent ]
