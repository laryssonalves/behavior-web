import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbTabsetModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { CompanyComponent } from './company/company.component';
import { FormsModule } from '@angular/forms';

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
  ],
  declarations: [
    PagesComponent,
    CompanyComponent,
  ],
})
export class PagesModule {
}
