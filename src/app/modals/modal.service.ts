import { Injectable } from '@angular/core'
import { NbDialogService } from '@nebular/theme'
import { ErrorModalComponent } from './error-modal/error-modal'
import { HttpErrorResponse } from '@angular/common/http'
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component'
import { Consultation } from '../pages/student/student-detail/student-consultation/consultation.model'
import { StudentConsultationResumeComponent } from '../pages/student/student-detail/student-consultation-resume/student-consultation-resume.component'
import { WarningModal } from './warning-modal/warning-modal.interface'
import { WarningModalComponent } from './warning-modal/warning-modal.component'
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private nbDialogService: NbDialogService) { }

  showDialogInfo({ title, message }: WarningModal) {
    this.nbDialogService.open(
      WarningModalComponent,
      {
        context: { title, message },
        hasScroll: true,
        dialogClass: 'basic-modal'
      }
    )
  }

  showDialogError(err: HttpErrorResponse) {
    const { error } = err
    this.nbDialogService.open(
      ErrorModalComponent,
      {
        context: { error },
        hasScroll: true,
        dialogClass: 'basic-modal'
      }
    )
  }

  showDialogConfirmation(title: string, question: string, callback: () => void) {
    this.nbDialogService.open(
      ConfirmationModalComponent,
      {
        context: { title, question, callback },
        dialogClass: 'confirmation-modal'
      }
    )
  }

  openStudentConsultationResumeModal(consultation: Consultation) {
    this.nbDialogService.open(
      StudentConsultationResumeComponent,
      {
        context: { consultation },
        dialogClass: 'medium-modal'
      }
    )
  }
}
