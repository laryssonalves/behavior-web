import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { AdminGuard } from '../auth/guards/admin.guard'

import { PagesComponent } from './pages.component'
import { CompanyComponent } from './company/company.component'

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
        canActivate: [AdminGuard],
        component: CompanyComponent
      },
      {
        path: 'membros',
        loadChildren: () => import('./member/member.module').then(m => m.MemberModule)
      },
      {
        path: 'aprendentes',
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
      },
      {
        path: 'usuarios',
        canActivate: [AdminGuard],
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
