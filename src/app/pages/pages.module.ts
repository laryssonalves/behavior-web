import { NgModule } from '@angular/core'
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule
} from '@nebular/theme'

import { ThemeModule } from '../@theme/theme.module'
import { PagesComponent } from './pages.component'
import { DashboardModule } from './dashboard/dashboard.module'
import { PagesRoutingModule } from './pages-routing.module'
import { CompanyComponent } from './company/company.component'
import { FormsModule } from '@angular/forms'
import { NgxMaskModule } from 'ngx-mask'

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbCardModule,
    NbIconModule,
    NbTabsetModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NbAccordionModule,
    NbSpinnerModule,
    NbSelectModule
  ],
  declarations: [
    PagesComponent,
    CompanyComponent
  ]
})
export class PagesModule {
}
