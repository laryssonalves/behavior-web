import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { StudentListComponent } from './student-list/student-list.component'
import { StudentDetailComponent } from './student-detail/student-detail.component'
import { StudentDetailViewGuard } from './student-detail/student-detail-view.guard'

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent,
    pathMatch: 'full',
  },
  {
    path: 'detalhes/:id',
    component: StudentDetailComponent,
    canActivate: [StudentDetailViewGuard]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class StudentRoutingModule {
}

export const routedComponents = [ StudentListComponent, StudentDetailComponent ]
