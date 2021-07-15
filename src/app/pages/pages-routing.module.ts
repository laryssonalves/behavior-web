import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { PagesComponent } from './pages.component'

import { CompanyViewGuard } from './company/guards/company-view.guard'
import { SecurityViewGuard } from './security/security-view.guard'
import { StudentViewGuard } from './student/student-view.guard'

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'aprendentes',
        pathMatch: 'full'
      },
      {
        path: 'empresa',
        canActivate: [CompanyViewGuard],
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
      },
      {
        path: 'membros',
        loadChildren: () => import('./member/member.module').then(m => m.MemberModule)
      },
      {
        path: 'seguranca',
        canActivate: [SecurityViewGuard],
        loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
      },
      {
        path: 'aprendentes',
        canActivate: [StudentViewGuard],
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}

export const routedComponents = [PagesComponent]
