import { NgModule } from '@angular/core'
import {
  NbAccordionModule,
  NbActionsModule,
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
import { DashboardModule } from './dashboard/dashboard.module'
import { PagesRoutingModule, routedComponents } from './pages-routing.module'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
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
    NbAccordionModule,
    NbSpinnerModule,
    NbSelectModule,
    NbActionsModule,
    PagesRoutingModule,
  ],
  declarations: [...routedComponents]
})
export class PagesModule {}
