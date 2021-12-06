import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts'

import { EchartsComponent } from './echarts.component';
import { EchartsLineComponent } from './echarts-line.component';
import { EchartsPieComponent } from './echarts-pie.component';
import { NbCardModule } from '@nebular/theme';

const components = [
  EchartsLineComponent,
  EchartsPieComponent,
  EchartsComponent,
]

@NgModule({
  imports: [
    NbCardModule,
    NgxEchartsModule,
  ],
  declarations: [ ...components ],
  exports: [ EchartsComponent ],
})
export class EchartsModule { }
