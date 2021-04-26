import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule, routedComponents } from './company-routing.module';
import { NbAccordionModule, NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbMenuModule, NbSelectModule, NbSpinnerModule, NbTabsetModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    FormsModule,
    NbMenuModule,
    NbCardModule,
    NbIconModule,
    NbTabsetModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAccordionModule,
    NbSpinnerModule,
    NbSelectModule,
    NbActionsModule, 
    NgxMaskModule.forRoot(), 
    CompanyRoutingModule,
  ]
})
export class CompanyModule { }
