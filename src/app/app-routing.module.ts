import { ExtraOptions, RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { AuthGuard } from './auth/guards/auth.guard'

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', redirectTo: '' },
]

const config: ExtraOptions = {
  useHash: false
}

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
