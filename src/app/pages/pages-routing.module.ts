import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { PagesComponent } from './pages.component'
import { CompanyComponent } from './company/company.component'

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'empresa',
        pathMatch: 'full'
      },
      {
        path: 'empresa',
        component: CompanyComponent
      },
      {
        path: 'membros',
        loadChildren: () => import('./member/member.module').then(m => m.MemberModule)
      },
      {
        path: 'aprendetes',
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
