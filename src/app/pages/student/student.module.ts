import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routedComponents, StudentRoutingModule } from './student-routing.module'
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule
} from '@nebular/theme'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxMaskModule } from 'ngx-mask'
import { StudentModalFormComponent } from './student-modal-form/student-modal-form'
import { StudentExerciseComponent } from './student-detail/student-exercise/student-exercise.component'
import { StudentMemberComponent } from './student-detail/student-member/student-member.component'
import { StudentMemberModalFormComponent } from './student-detail/student-member-modal-form/student-member-modal-form.component'
import { StudentMemberRoleModalComponent } from './student-detail/student-member-role-modal/student-member-role-modal.component'
import { StudentExerciseModalFormComponent } from './student-detail/student-exercise-modal-form/student-exercise-modal-form.component';
import { StudentConsultationComponent } from './student-detail/student-consultation/student-consultation.component'

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    NbCardModule,
    NbListModule,
    NbActionsModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NgxMaskModule.forRoot(),
    NbSpinnerModule,
    NbSelectModule,
    NbIconModule,
    NbPopoverModule,
    NbDatepickerModule,
    NbTabsetModule,
    NbCheckboxModule,
    NbRadioModule,
    NbFormFieldModule
  ],
  declarations: [
    ...routedComponents,
    StudentModalFormComponent,
    StudentExerciseComponent,
    StudentMemberComponent,
    StudentMemberModalFormComponent,
    StudentMemberRoleModalComponent,
    StudentExerciseModalFormComponent,
    StudentConsultationComponent
  ],
  entryComponents: [ StudentModalFormComponent ]
})
export class StudentModule {}
