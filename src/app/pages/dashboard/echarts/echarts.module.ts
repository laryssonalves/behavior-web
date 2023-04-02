import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts'

import { EchartsLineComponent } from './echarts-line.component';
import { EchartsPieComponent } from './echarts-pie.component';
import { NbCardModule } from '@nebular/theme';

const components = [
  EchartsLineComponent,
  EchartsPieComponent,
]

@NgModule({
  imports: [
    NbCardModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  declarations: [ ...components ],
  exports: [ EchartsLineComponent, EchartsPieComponent ],
})
export class EchartsModule { }
