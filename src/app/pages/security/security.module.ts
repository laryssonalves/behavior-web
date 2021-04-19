import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbListModule, NbPopoverModule, NbSelectModule, NbSpinnerModule, NbTabsetModule } from '@nebular/theme';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { routedComponents, SecurityRoutingModule } from './security-routing.module';
import { UserListComponent } from '../security/user/user-list/user-list.component';
import { GroupListComponent } from './group/group-list/group-list.component';

@NgModule({
  declarations: [...routedComponents, UserListComponent, GroupListComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbListModule,
    NbActionsModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
    NbSelectModule,
    NbIconModule,
    NbPopoverModule,
    NbTabsetModule,
    NzTreeModule,
    SecurityRoutingModule,
  ]
})
export class SecurityModule { }