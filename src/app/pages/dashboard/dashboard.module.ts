import { NgModule } from '@angular/core'
import { NbCardModule } from '@nebular/theme'
import { ThemeModule } from '../../@theme/theme.module'
import { DashboardComponent } from './dashboard.component'
import { EchartsModule } from './echarts/echarts.module';
import { TriesComponent } from './tries/tries.component'

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    EchartsModule,
  ],
  declarations: [ DashboardComponent, TriesComponent ],
  exports: [ DashboardComponent ],
})
export class DashboardModule {
}
