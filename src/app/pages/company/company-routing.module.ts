import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyEditGuard } from './guards/company-edit.guard';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
  },
  {
    path: ':editar',
    canActivate: [CompanyEditGuard],
    component: CompanyComponent
  },
]


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CompanyRoutingModule { }

export const routedComponents = [CompanyComponent]